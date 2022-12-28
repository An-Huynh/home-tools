import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHouseChimney, faBars } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faHouseChimney, faBars);

const FONT_AWESOME_COMPONENT_NAME = "font-awesome-icon";

export { FontAwesomeIcon, FONT_AWESOME_COMPONENT_NAME };
