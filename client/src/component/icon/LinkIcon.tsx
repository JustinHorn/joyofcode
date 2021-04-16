import React from "react";

type LinkIconProps = {
  src:string;
  href:string;
  className?:string;
}

const LinkIcon = ({ src, href, className }:LinkIconProps) => {
  return (
    <a href={href}>
      <div
        className={"icon " + className}
        style={{ backgroundImage: "url(" + src + ")" }}
      ></div>
    </a>
  );
};

export default LinkIcon;
