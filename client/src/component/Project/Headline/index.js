import React, { useContext } from "react";
import Url from "url-parse";

import styles from "./headline.module.css";

import { Link } from "react-router-dom";
import ProjectLayoutContext from "context/ProjectLayout";

const Headline = ({ id, href, title }) => {
  const hostname = new Url(href).hostname;

  const { small } = useContext(ProjectLayoutContext);

  return (
    <div className={small ? styles.small : styles.normal}>
      <h2>
        <Link to={"/project/" + id}>
          <span className={styles.headtext}> {title}</span>
        </Link>
      </h2>
      {!small && (
        <h4>
          <a href={href}> ({hostname})</a>{" "}
        </h4>
      )}
    </div>
  );
};

export default Headline;
