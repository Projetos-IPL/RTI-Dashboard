import React from "react";
import { APP_ROUTES } from "../../../config.js";

function BrandLogoItem({ navigate }) {
  const brandLogoClickHandler = (e) => {
    navigate(APP_ROUTES.MAIN_SCREEN_ROUTE);
  };

  return (
    <a className="navbar-brand nav-item" onClick={brandLogoClickHandler}>
      <i className="fa-solid fa-building-shield me-1" />
      Sistema de Segurança
    </a>
  );
}

export default BrandLogoItem;
