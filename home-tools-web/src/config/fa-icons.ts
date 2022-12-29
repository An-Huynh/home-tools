import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHouseChimney,
  faHouse,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faHouseChimney, faBars, faUser, faHouse);

const FONT_AWESOME_COMPONENT_NAME = "font-awesome-icon";

export { FontAwesomeIcon, FONT_AWESOME_COMPONENT_NAME };
