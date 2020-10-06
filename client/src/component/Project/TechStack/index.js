import React from "react";
import Icon from "component/icon/Icon";

import iconList from "data";

const TechStack = ({ iconList = [] }) => {
  return (
    <div className="flex-left">
      {iconList.map((item) => (
        <Icon {...item} />
      ))}
    </div>
  );
};

export default TechStack;
