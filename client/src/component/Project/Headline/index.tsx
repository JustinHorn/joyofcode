import React, { useContext } from "react";
import Url from "url-parse";

import styles from "./headline.module.css";

import { Link, useLocation } from "react-router-dom";
import ProjectLayoutContext from "context/ProjectLayout";





const Headline = ({ id, href, title }:HeadlineProps) => {
  const hostname = new Url(href).hostname;

  const { lined } = useContext<ProjectLayoutTypes>(ProjectLayoutContext);


  const location = useLocation();

  if (!location.pathname.includes("/project/")) {
    title =  maxChar(title) ;
  }

  return (
    <div className={styles.normal}>
      <h2>{(!lined && title) || <Link to={"/project/" + id}>{title}</Link>}</h2>

      <h4>
        {(!lined && <a href={href}> ({hostname})</a>) || (
          <a>{`(${hostname})`} </a>
        )}
      </h4>
    </div>
  );
};

function maxChar(str:string):string {
  let maxChar = 27;

  if (str.length > maxChar) {
    return str.slice(0, maxChar) + "...";
  }
  return str;
}

export default Headline;
