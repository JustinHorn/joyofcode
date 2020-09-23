import React, { useState, useContext, useEffect } from "react";

import AuthenticationButtons from "component/Authentication";

import styles from "./navbar.module.css";
import UserContext from "context";

import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(UserContext);

  const location = useLocation();

  const isSelected = (path) => {
    return location.pathname === path ? styles.selected : "";
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navigation}>
          <NavLink to="/">
            <button className={isSelected("/")}>Main </button>
          </NavLink>
          {user && (
            <NavLink to="/post">
              <button className={isSelected("/post")}> Post</button>
            </NavLink>
          )}
        </div>

        <AuthenticationButtons></AuthenticationButtons>
      </nav>
    </>
  );
};

export default Navbar;
