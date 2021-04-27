import React, { useContext } from "react";
import "./App.css";
import Navbar from "component/Navbar";
import UserContext from "context";

import MainPage from "pages/MainPage";

import ProjectPage from "pages/ProjectPage";

import PrivateRoute from "component/PrivateRoute";

import Post from "pages/PostingPage";

import ScrollToTop from "component/ScrollToTop";

import AuthenticationPage from "pages/AuthenticationPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import useFeed from "hooks/useFeed";

import UserPage from "pages/UserPage";

function App() {
  const { user } = useContext(UserContext);
  const { data, loading, error } = useFeed();

  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <div className="Layout">
        <main>
          {user && !user.verified && <h1>Not verified!</h1>}
          <Switch>
            <Route path="/user/:id">
              <UserPage />
            </Route>
            <Route path="/project/:id">
              <ProjectPage />
            </Route>
            <PrivateRoute path="/post">
              <Post />
            </PrivateRoute>
            <Route path="/authenticate">
              <AuthenticationPage />
            </Route>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="*">
              <Redirect to={"/"}></Redirect>
            </Route>
          </Switch>
          <p style={{ textAlign: "right" }}>
            Send feedback to justinhorn0000@gmail.com
          </p>
        </main>
      </div>
    </Router>
  );
}

export default App;
