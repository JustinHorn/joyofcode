import React from "react";



function Icon({ location, className, backgroundSize }:IconProps) {
  return (
    <div
      className={" icon " + className}
      style={{
        backgroundImage: "url(" + location + ")",
        backgroundSize: backgroundSize || "contain",
      }}
    ></div>
  );
}

export default Icon;
