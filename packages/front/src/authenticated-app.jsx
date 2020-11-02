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
import Admin from "./components/admin";
import SearchCaretakers from "./components/searchcaretakers/SearchCaretakers";
import BecomeCaretaker from "./components/becomecaretaker/BecomeCaretaker";
import CaretakerReviews from "./components/searchcaretakers/CaretakersProfile";
import CaretakerProfile from "./components/caretakerProfile/CaretakerProfile";
import Orders from "./components/pastOrders/Orders";
import SuccessPage from "./components/SuccessPage";

function Authenticatedapp() {
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

          <Route exact path="/search">
            <SearchCaretakers />
          </Route>

          <Route path="/logout">
            <Logout />
          </Route>

          <Route path="/ct/:ctuname">
            <CaretakerReviews />
          </Route>

          <Route path="/myPets/:name/">
            <MyPets />
          </Route>

          <Route path="/profile/edit">
            <EditProfile />
          </Route>

          <Route path="/ctprofile/edit">
            <CaretakerProfile />
          </Route>

          <Route exact path="/profile/orders">
            <Orders />
          </Route>

          <Route path="/becomect">
            <BecomeCaretaker />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/admin">
            <Admin />
          </Route>

          <Route path="/success">
            <SuccessPage />
          </Route>

          <Route exact path="/">
            <Landing />
          </Route>

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Authenticatedapp;
