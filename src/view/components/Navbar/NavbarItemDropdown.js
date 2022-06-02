import React from "react";
import { NavDropdown } from "react-bootstrap";

function NavbarItemDropdown({ text, route, navigate }) {
  const navbarItemClickHandler = (e) => {
    navigate(route);
  };

  return (
    <NavDropdown.Item onClick={navbarItemClickHandler}>{text}</NavDropdown.Item>
  );
}

export default NavbarItemDropdown;
