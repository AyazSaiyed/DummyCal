// components/Header.js
import Link from "next/link";

import "./Header.scss";

import NavBar from "./NavBar";
import navButtons from "../config/buttons";

const Header = props => (
  <div className="Header">
    <Link href="/">
    <div className="Header">{props.appTitle}</div>
  </Link>
    <NavBar navButtons={navButtons} />
  </div>
);

export default Header;