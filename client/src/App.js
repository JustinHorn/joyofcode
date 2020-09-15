import React, { useContext, useEffect, useState, useRef } from "react";
import "./App.css";
import Feed from "component/Feed";
import { CreateResource } from "component/Resource";
import Navbar from "component/Navbar";
import UserContext from "context";

function App() {
  const { user } = useContext(UserContext);

  const ref = useRef();

  return (
    <div ref={ref} className="App">
      <Navbar></Navbar>
      <h1>Hello {user?.name}</h1>
      <CreateResource />
      <Feed />
    </div>
  );
}

export default App;
