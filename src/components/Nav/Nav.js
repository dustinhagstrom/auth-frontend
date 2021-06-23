import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";

export class Nav extends Component {
  render() {
    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            <Link to="/">Movie with friends!</Link>
            {/* Link tag on react(react-router-dom) === 'a' tag on css file */}
          </h1>
        </div>
        <div className="right-side-nav">
          <ul>
            <li>
              <NavLink activeClassName="selected" to="/sign-up">
                {/* NavLink allows us to put prop 'activeClassName' to give css style to underscore what link the user is on. */}
                Sign up
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={{ borderBottom: "1px solid white" }}
                to="/login"
              >
                {/* activeStyle is an inline style that achieves same as above */}
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
