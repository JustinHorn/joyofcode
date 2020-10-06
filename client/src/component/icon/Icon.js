import React from "react";

function Icon({ location, className, backgroundSize }) {
  return (
    <div
      title={location}
      className={" icon " + className}
      style={{
        backgroundImage: "url(" + location + ")",
        backgroundSize: backgroundSize || "contain",
      }}
    ></div>
  );
}

export default Icon;
