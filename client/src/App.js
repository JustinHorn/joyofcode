import React, { useContext, useRef } from "react";
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
      <p>Send feedback to justinhorn0000@gmail.com - or message him directly</p>
      <Navbar></Navbar>
      {!user && <h1>login or register to share your project</h1>}

      {user && <h1>Hello {user.name}</h1>}
      {user && <CreateResource />}
      <Feed />
    </div>
  );
}

export default App;
