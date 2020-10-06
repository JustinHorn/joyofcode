import React from "react";
import Icon from "component/icon/Icon";

import List from "component/List";
import TechStackTag from "component/Tag/TechStackTag";

const TechStack = ({ icons = [] }) => {
  return (
    <div className="flex-left">
      <List
        list={icons.map((icon) => ({ iconVal: icon }))}
        Key={"tst"}
        Component={TechStackTag}
      />
    </div>
  );
};

export default TechStack;
