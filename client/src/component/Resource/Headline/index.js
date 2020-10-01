import React from "react";
import Url from "url-parse";

import styles from "./headline.module.css";

import { Link } from "react-router-dom";

const Headline = ({ id, href, title }) => {
  const hostname = new Url(href).hostname;

  return (
    <div>
      <h2>
        <Link to={"/project/" + id}>
          <span className={styles.headtext}> {title}</span>
        </Link>
      </h2>
      <h4>
        <a href={href}> ({hostname})</a>{" "}
      </h4>
    </div>
  );
};

export default Headline;
