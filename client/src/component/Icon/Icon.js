import React from "react";

import styles from "./icon.module.css";

const LinkIcon = ({ src, href, className }) => {
  return (
    <a href={href}>
      <div
        className={styles.backgroundCenter + " " + className}
        style={{ backgroundImage: "url(" + src + ")" }}
      ></div>
    </a>
  );
};

export { LinkIcon };

export default function PublicIcon(props) {
  return <Icon {...props} location={"/img/icons/" + props.fileName} />;
}

function Icon({ location, name }) {
  return (
    <div className={styles.iconLayout}>
      <div className={styles.iconWrapper}>
        <div
          className={styles.icon + " "}
          style={{ backgroundImage: "url(" + location + ")" }}
        ></div>
      </div>
      <span>{name}</span>
    </div>
  );
}
