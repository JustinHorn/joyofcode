import React, { Component } from "react";





const List = ({ list = [], Component, Key }:ListProps) => {
  return (
    <>
      {list.map((item, index) => (
        <Component key={Key + index} {...item} />
      ))}
    </>
  );
};

export default List;
