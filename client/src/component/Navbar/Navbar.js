import React, { useState, useContext, useEffect } from "react";

import AuthenticationButtons from "component/Authentication";

import styles from "./navbar.module.css";
import UserContext from "context";

import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(UserContext);

  const location = useLocation();

  const isSelected = (path) => {
    return location.pathname === path ? "selected" : "";
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.pages}>
        <NavLink to="/">
          <button className={isSelected("/")}>Main </button>
        </NavLink>

        {user && (
          <NavLink to={"/user/" + user.id}>
            <button className={isSelected("/user/" + user.id)}> Me</button>
          </NavLink>
        )}
      </div>
      <div className={styles.actions}>
        {user && (
          <NavLink to="/post">
            <button className={isSelected("/post")}> Post</button>
          </NavLink>
        )}
        <AuthenticationButtons></AuthenticationButtons>
      </div>
    </nav>
  );
};

export default Navbar;
