import React from "react";

const List = ({ list, Component, Key }) => {
  return list.map((item, index) => <Component key={Key + index} {...item} />);
};

export default List;
