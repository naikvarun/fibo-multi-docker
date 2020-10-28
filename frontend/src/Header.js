import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">Fibo</NavLink>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <NavLink className="navbar-item" to="/other">
            Other
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Header;