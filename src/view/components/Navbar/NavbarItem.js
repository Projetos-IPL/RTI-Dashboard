import React from "react";

function NavbarItem({ text, route, navigate }) {
  const navbarItemClickHandler = (e) => {
    navigate(route);
  };

  return (
    <li className="nav-item">
      <a className="nav-link" onClick={navbarItemClickHandler} href={""}>
        {text}
      </a>
    </li>
  );
}

export default NavbarItem;
