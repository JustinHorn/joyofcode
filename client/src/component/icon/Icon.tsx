import React from "react";

type IconProps = {
  location?: string;
  className?: string;
  backgroundSize?: string;
};

function Icon({ location, className, backgroundSize }: IconProps) {
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
