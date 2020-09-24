import React, { useContext, useRef } from "react";
import "./App.css";
import Navbar from "component/Navbar";
import UserContext from "context";

import Mainpage from "pages/Mainpage";

import PrivateRoute from "component/PrivateRoute";

import Post from "pages/Post";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <div className="App">
        <p>
          Send feedback to justinhorn0000@gmail.com - or message him directly
        </p>
        <Navbar></Navbar>

        <Switch>
          <PrivateRoute path="/post">
            <Post />
          </PrivateRoute>
          <Route path="/">
            <Mainpage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
