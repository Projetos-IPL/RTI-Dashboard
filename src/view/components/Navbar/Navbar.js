import React from "react";
import "./Navbar.css";
import NavbarItem from "./NavbarItem.js";
import { APP_ROUTES } from "../../../config.js";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton.js";
import BrandLogoItem from "./BrandLogoItem.js";
import NavbarDropdownMenuButton from "./NavbarDropdownMenuButton.js";

import { NavDropdown } from "react-bootstrap";
import NavbarItemDropdown from "./NavbarItemDropdown.js";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <BrandLogoItem navigate={navigate} />
        <NavbarDropdownMenuButton />

        <div
          className="collapse navbar-collapse ms-3"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavbarItem
              text="Inicio"
              route={APP_ROUTES.MAIN_SCREEN_ROUTE}
              navigate={navigate}
            />
            <NavbarItem
              text="Pessoas"
              route={APP_ROUTES.PEOPLE_SCREEN_ROUTE}
              navigate={navigate}
            />
            <NavbarItem
              text="Permissões"
              route={APP_ROUTES.PERMISSIONS_SCREEN_ROUTE}
              navigate={navigate}
            />
            <NavbarItem
              text="Movimentos"
              route={APP_ROUTES.ENTRANCES_SCREEN_ROUTE}
              navigate={navigate}
            />

            <NavDropdown title="Histórico">
              <NavbarItemDropdown
                text="Sensores"
                route={APP_ROUTES.SENSOR_LOG_SCREEN_ROUTE}
                navigate={navigate}
              />
              <NavbarItemDropdown
                text="Atuadores"
                route={APP_ROUTES.ACTUATOR_LOG_SCREEN_ROUTE}
                navigate={navigate}
              />
            </NavDropdown>
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
