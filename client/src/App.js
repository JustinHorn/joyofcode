import React, { useContext, useRef } from "react";
import "./App.css";
import Navbar from "component/Navbar";
import UserContext from "context";

import Mainpage from "pages/MainPage";

import ProjectPage from "pages/Project";

import PrivateRoute from "component/PrivateRoute";

import Post from "pages/Post";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import useFeed from "hooks/useFeed";

function App() {
  const { user } = useContext(UserContext);
  const { data, loading, error } = useFeed();

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route path="/project/:id">
            <ProjectPage />
          </Route>
          <PrivateRoute path="/post">
            <Post />
          </PrivateRoute>
          <Route path="/">
            <Mainpage />
          </Route>
        </Switch>
        <p style={{ textAlign: "right" }}>
          Send feedback to justinhorn0000@gmail.com - or message him directly
        </p>
      </div>
    </Router>
  );
}

export default App;
