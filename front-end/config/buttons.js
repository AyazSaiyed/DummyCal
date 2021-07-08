// config/buttons.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faMapMarkerAlt,
  faUser,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";

const navButtons = [
  {
    label: "Products",
    path: "/products",
    icon: <FontAwesomeIcon icon={faCompass} />
  },
  {
    label: "Solutions",
    path: "/solutions",
    icon: <FontAwesomeIcon icon={faMapMarkerAlt} />
  },
  {
    label: "Customers",
    path: "/customers",
    icon: <FontAwesomeIcon icon={faShoppingCart} />
  },
  {
    label: "About",
    path: "/about",
    icon: <FontAwesomeIcon icon={faUser} />
  },
  {
    label: "Login",
    path: "/auth/login",
    icon: <FontAwesomeIcon icon={faUser} />
  }
];

export default navButtons;