import React from "react";
import Icon from "component/icon/Icon";

import List from "component/List";
import TechStackTag from "component/Tag/TechStackTag";

const TechStack = ({ icons = [] }) => {
  return (
    <ul className="flex-left" style={{ paddingLeft: "0px" }}>
      <List
        list={icons.map((icon) => ({ iconVal: icon }))}
        Key={"tst"}
        Component={TechStackTag}
      />
    </ul>
  );
};

export default TechStack;
