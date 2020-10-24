import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Nav from "./components/Nav";
import Landing from "./components/landing/Landing";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MyPets from "./components/MyPets";
import EditProfile from "./components/editprofile/EditProfile";
import Dashboard from "./components/dashboard/Dashboard";
import SearchSitters from "./components/SearchSitters";

function App() {
  const [foo, setFoo] = useState("N/A");
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>

          <Route exact path="/login">
            <LoginPage />
          </Route>

          <Route path="/myPets/:name/:pouname">
            <MyPets />
          </Route>

          <Route path="/profile/edit" component={EditProfile} />

          <Route exact path="/searchsitters">
            <SearchSitters />
          </Route>

          <Route exact path="/">
            <Landing />
          </Route>

          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
