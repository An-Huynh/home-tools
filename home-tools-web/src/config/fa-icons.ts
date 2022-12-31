import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faBasketShopping,
  faBell,
  faCreditCard,
  faHouse,
  faHouseChimney,
  faPencil,
  faPlus,
  faTrash,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faHouseChimney,
  faBars,
  faUser,
  faHouse,
  faBell,
  faBasketShopping,
  faCreditCard,
  faPlus,
  faPencil,
  faTrash,
  faX
);

const FONT_AWESOME_COMPONENT_NAME = "font-awesome-icon";

export { FONT_AWESOME_COMPONENT_NAME, FontAwesomeIcon };
