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
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/profile">
                  Welcome Back - {this.props.user.email}
                </NavLink>
              ) : (
                <NavLink activeClassName="selected" to="/sign-up">
                  Sign up
                </NavLink>
              )}
            </li>
            <li>
              {this.props.user ? (
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/logout"
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
