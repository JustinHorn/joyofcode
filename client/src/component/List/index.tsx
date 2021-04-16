import React, { Component } from "react";

type ListProps = {
  list: any[];
  Component: (props: any) => React.ReactElement;
  Key: string;
};

const List = ({ list = [], Component, Key }: ListProps) => {
  return (
    <>
      {list.map((item, index) => (
        <Component key={Key + index} {...item} />
      ))}
    </>
  );
};

export default List;
