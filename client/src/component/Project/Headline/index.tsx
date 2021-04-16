import React, { useContext } from "react";
import Url from "url-parse";

import styles from "./headline.module.css";

import { Link, useLocation } from "react-router-dom";
import ProjectLayoutContext from "context/ProjectLayout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HeadlineProps = {
  id: number;
  href: string;
  title: string;
  github?: string;
};

const Headline = ({ id, href, title, github }: HeadlineProps) => {
  const hostname = new Url(href).hostname;

  const { lined } = useContext(ProjectLayoutContext);

  const location = useLocation();

  if (!location.pathname.includes("/project/")) {
    title = maxChar(title);
  }

  return (
    <div className={styles.normal}>
      <h2>{(!lined && title) || <Link to={"/project/" + id}>{title}</Link>}</h2>

      <h4>
        <a
          title="go to Website"
          target="_blank"
          rel="noopener noreferrer"
          href={href}
        >
          <button>
            <FontAwesomeIcon icon={["fas", "eye"]}></FontAwesomeIcon>{" "}
          </button>
        </a>
        {github && (
          <a
            title="go to code"
            target="_blank"
            rel="noopener noreferrer"
            href={github}
          >
            <button>
              <FontAwesomeIcon icon={["fas", "code"]}></FontAwesomeIcon>{" "}
            </button>
          </a>
        )}
      </h4>
    </div>
  );
};

function maxChar(str: string): string {
  let maxChar = 27;

  if (str.length > maxChar) {
    return str.slice(0, maxChar) + "...";
  }
  return str;
}

export default Headline;
