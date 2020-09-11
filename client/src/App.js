import React, { useContext, useState } from "react";
import "./App.css";
import Feed from "component/Feed";
import { CreateResource } from "component/Resource";
import Navbar from "component/Navbar";
import UserContext from "context";

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <Navbar></Navbar>
      <h1>Hello {user?.name}</h1>
      <CreateResource />
      <Feed />
    </div>
  );
}

export default App;
