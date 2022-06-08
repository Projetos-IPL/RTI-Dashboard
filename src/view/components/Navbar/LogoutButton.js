import React from "react";
import authUtils from "../../../utils/authUtils.js";

function LogoutButton() {
  const logoutButtonClickHandler = (e) => {
    authUtils.logout();
  };

  return (
    <li className="nav-item">
      <button
        className="btn btn-sm btn-outline-light"
        id="logout-button"
        onClick={logoutButtonClickHandler}
      >
        Sair
        <i className="fa-solid fa-arrow-right-from-bracket ms-2" />
      </button>
    </li>
  );
}

export default LogoutButton;
