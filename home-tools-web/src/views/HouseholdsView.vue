<template>
  <div class="households">
    <div class="households__header">
      <h1 class="households__title">
        <font-awesome-icon icon="fa-solid fa-house" fixed-width />
        Households
      </h1>
      <span v-if="$store.state.home.selectedHome !== null"
        >Selected household (reflected on other pages):
        {{ $store.state.home.selectedHome.name }}</span
      >
      <span v-else>Select a household.</span>
      <loading-indicator v-if="loadingHomes"></loading-indicator>
    </div>
    <ul class="households__list" v-if="!loadingHomes">
      <li
        @click.stop="onSelectHome(home)"
        class="households__item"
        v-for="home in homes"
        :key="home.id"
      >
        <span class="households__item-name">{{ home.name }}</span>
        <font-awesome-icon
          @click.stop="onEdit(home)"
          icon="fa-solid fa-pencil"
          class="households__btn"
          fixed-width
        /><font-awesome-icon
          @click.stop="onDelete(home)"
          icon="fa-solid fa-trash"
          class="households__btn"
          fixed-width
        />
      </li>
      <li class="households__item households__item--center" @click.stop="onNew">
        <font-awesome-icon
          class="households__plus"
          icon="fa-solid fa-plus"
          fixed-width
        />
      </li>
    </ul>
  </div>
  <home-dialog
    v-if="showEditDialog || showNewDialog"
    @save="updateOrDeleteAction"
    :home="dialogFocusedHome"
    @cancel="onCancel"
    :busy="busy"
  ></home-dialog>
  <confirmation-dialog
    @confirm="onDeleteConfirmed"
    :message="deleteMessage"
    v-if="showDeleteDialog"
    title="Confirmation"
    @cancel="onCancel"
    :busy="busy"
  ></confirmation-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

import confirmationDialog from "@/components/ConfirmationDialog.vue";
import homeDialog from "@/components/HomeDialog.vue";
import loadingIndicator from "@/components/LoadingIndicator.vue";
import { Home } from "@/models/home";
import homeService from "@/services/home-service";

// Component data.
const dialogFocusedHome = ref<Home | null>(null);
const showDeleteDialog = ref<boolean>(false);
const showEditDialog = ref<boolean>(false);
const showNewDialog = ref<boolean>(false);
const loadingHomes = ref<boolean>(false);
const busy = ref<boolean>(false);
const homes = ref<Home[]>([]);

// Component computed data.
const deleteMessage = computed(() => {
  return `Are you sure you want to delete the home '${dialogFocusedHome.value?.name}'`;
});
const updateOrDeleteAction = computed(() => {
  return showEditDialog.value ? onEditConfirmed : onNewConfirmed;
});

// Component store.
const store = useStore();

// Component methods.
function onSelectHome(home: Home) {
  store.commit("home/setHome", home);
}

function onDelete(home: Home) {
  dialogFocusedHome.value = home;
  showDeleteDialog.value = true;
}

async function onDeleteConfirmed() {
  try {
    busy.value = true;
    if (dialogFocusedHome.value) {
      const homeId = dialogFocusedHome.value.id;
      await homeService.deleteHome(homeId);
      homes.value = homes.value.filter((h) => h.id !== homeId);
      if (store.state.home.selectedHome?.id === homeId) {
        store.commit("home/setHome", null);
      }
    }
    dialogFocusedHome.value = null;
  } catch (err) {
    // TODO: popup a toast with a good error message to the user
    // and not close the dialog.
    console.log(err);
  }
  showDeleteDialog.value = false;
  busy.value = false;
}

function onNew() {
  showNewDialog.value = true;
}

async function onNewConfirmed(home: Home) {
  try {
    busy.value = true;
    const response = await homeService.createHome({
      ...home,
      ownerId: store.state.auth.user.id,
    });
    homes.value.push(response.data);
  } catch (err) {
    console.log(err);
  }
  showNewDialog.value = false;
  busy.value = false;
}

function onEdit(home: Home) {
  dialogFocusedHome.value = home;
  showEditDialog.value = true;
}

async function onEditConfirmed(home: Home) {
  try {
    busy.value = true;
    const response = await homeService.updateHome(home);
    const idx = homes.value.findIndex((h) => h.id === response.data.id);
    homes.value[idx] = response.data;

    if (store.state.home.selectedHome?.id === homes.value[idx].id) {
      store.commit("home/setHome", homes.value[idx]);
    }
  } catch (err) {
    console.log(err);
  }
  showEditDialog.value = false;
  busy.value = false;
}

function onCancel() {
  dialogFocusedHome.value = null;

  showDeleteDialog.value = false;
  showEditDialog.value = false;
  showNewDialog.value = false;
}

// Component lifecycle hooks.
onMounted(async () => {
  try {
    loadingHomes.value = true;
    // TODO: Update API to allow just getting all results.
    const response = await homeService.getHomes(
      store.state.auth.user.id,
      1,
      100
    );
    homes.value = response.data.homes;
  } catch (err) {
    console.log(err);
  }
  loadingHomes.value = false;
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.households {
  margin-top: 1rem;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    justify-content: space-between;

    @media (min-width: $small-device-width) {
      flex-direction: row;
    }
  }

  &__title {
    display: flex;
    gap: 0.5rem;
    white-space: nowrap;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: $small-device-width) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: $medium-device-width) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: $large-device-width) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  &__item {
    display: flex;
    gap: 0.5rem;
    border-radius: 1rem;
    padding: 1rem;
    background: $secondary-color;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--center {
      justify-content: center;
      align-content: center;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__item-name {
    margin-right: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__btn {
    border-radius: 0.5rem;
    padding: 0.2rem;
    cursor: pointer;

    &:hover {
      background: $primary-color;
    }
  }

  &__plus {
    padding: 0.2rem;
  }
}
</style>
