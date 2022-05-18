import React from "react";
import "./Navbar.css";
import NavbarItem from "./NavbarItem.js";
import { APP_ROUTES } from "../../../config.js";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton.js";
import BrandLogoItem from "./BrandLogoItem.js";
import NavbarDropdownMenuButton from "./NavbarDropdownMenuButton.js";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <BrandLogoItem navigate={navigate} />
        <NavbarDropdownMenuButton />

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavbarItem
              text="Inicio"
              route={APP_ROUTES.MAIN_SCREEN_ROUTE}
              navigate={navigate}
            />
            <NavbarItem
              text="Pessoas"
              route={APP_ROUTES.MAIN_SCREEN_ROUTE}
              navigate={navigate}
            />
            <NavbarItem
              text="Permissões"
              route={APP_ROUTES.MAIN_SCREEN_ROUTE}
              navigate={navigate}
            />
            <NavbarItem
              text="Movimentos"
              route={APP_ROUTES.MAIN_SCREEN_ROUTE}
              navigate={navigate}
            />
            <NavbarItem
              text="Histórico Sensores"
              route={APP_ROUTES.MAIN_SCREEN_ROUTE}
              navigate={navigate}
            />
            <NavbarItem
              text="Histórico Atuadores"
              route={APP_ROUTES.MAIN_SCREEN_ROUTE}
              navigate={navigate}
            />
          </ul>
          <ul className="navbar-nav ms-auto">
            <LogoutButton />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
