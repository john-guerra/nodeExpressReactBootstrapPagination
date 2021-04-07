import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage.js";
import AboutPage from "./Pages/AboutPage.js";
import NavigationComponent from "./Components/NavigationComponent.js";
import LoginFormComponent from "./Components/LoginFormComponent.js";

function App() {
  return (
    <Router>
      <NavigationComponent></NavigationComponent>

      <LoginFormComponent></LoginFormComponent>

      <Switch>
        <Route path="/about">
          <AboutPage></AboutPage>
        </Route>

        <Route path="/">
          <HomePage></HomePage>
        </Route>
      </Switch>

      <footer>Made by John ❤️</footer>
    </Router>
  );
}

export default App;
