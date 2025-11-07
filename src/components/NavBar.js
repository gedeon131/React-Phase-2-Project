import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const linkStyles = {
    color: "#00D4FF",
    padding: "10px 20px",
    marginRight: "20px",
    background: "#0D2E4E",
    textDecoration: "inherit", // no underline
    borderRadius: "10px"
  };

  const activeStyle = {
    border: "solid #00D4FF 2px",
    fontWeight: "bold"
  };

  return (
    <div id="nav-bar">
      <h1 className="site-title">LEARNING TRACKER</h1>

      <NavLink
        to="/"
        exact
        style={linkStyles}
        activeStyle={activeStyle}
      >
        Accueil
      </NavLink>

      <NavLink
        to="/topics"
        exact
        style={linkStyles}
        activeStyle={activeStyle}
      >
        Sujets
      </NavLink>

      <NavLink
        to="/completed"
        exact
        style={linkStyles}
        activeStyle={activeStyle}
      >
        Complétés
      </NavLink>
    </div>
  );
}

export default NavBar;
