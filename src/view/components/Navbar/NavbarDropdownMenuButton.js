import React from "react";

function NavbarDropdownMenuButton() {
  return (
    <button
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      className="navbar-toggler"
      data-bs-target="#navbarSupportedContent"
      data-bs-toggle="collapse"
      type="button"
    >
      <span className="navbar-toggler-icon" />
    </button>
  );
}

export default NavbarDropdownMenuButton;
