import React, { useState } from "react";
import "./App.css";
import { data } from "mockData";
import Feed from "component/Feed";
import CreateResource from "component/CreateResource";
import { useResources } from "helper";

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <CreateResource />
      <Feed />
    </div>
  );
}

export default App;
