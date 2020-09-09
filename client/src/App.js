import React, { useState } from "react";
import "./App.css";
import Feed from "component/Feed";
import CreateResource from "component/CreateResource";

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
