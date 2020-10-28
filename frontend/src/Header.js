import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink activeClassName="active" className="navbar-brand" to="/">Fibo</NavLink>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/other">Other <span
            className="sr-only">(current)</span></NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Header;
