import React from "react";
import LoginPage from "./components/LoginPage";
import Logout from "./components/Logout";
import SignUpPage from "./components/SignUpPage";
import Nav from "./components/Nav";
import Landing from "./components/landing/Landing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MyPets from "./components/MyPets/MyPets";
import EditProfile from "./components/editprofile/EditProfile";
import Dashboard from "./components/dashboard/Dashboard";
import Admin from "./components/admin/Admin";
import SearchCaretakers from "./components/searchcaretakers/SearchCaretakers";
import BecomeCaretaker from "./components/becomecaretaker/BecomeCaretaker";
import CaretakersCard from "./components/searchcaretakers/CaretakersCard";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/ctcard">
            <CaretakersCard />
          </Route>

          <Route exact path="/signup">
            <SignUpPage />
          </Route>

          <Route exact path="/login">
            <LoginPage />
          </Route>

          <Route exact path="/myPets/:name/">
            <MyPets />
          </Route>

          <Route path="/profile/edit">
            <EditProfile />
          </Route>

          <Route exact path="/searchct">
            <SearchCaretakers />
          </Route>

          <Route exact path="/becomect">
            <BecomeCaretaker />
          </Route>

          <Route exact path="/ctcard">
            <CaretakersCard />
          </Route>

          <Route exact path="/">
            <Landing />
          </Route>

          <Route exact path="/dashboard">
            <Dashboard />
          </Route>

          <Route exact path="/admin">
            <Admin />
          </Route>

          <Route exact path="/logout">
            <Logout />
          </Route>

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
