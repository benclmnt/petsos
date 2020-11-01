import React from 'react';
import LoginPage from './components/LoginPage';
import Logout from './components/Logout';
import SignUpPage from './components/SignUpPage';
import Nav from './components/Nav';
import Landing from './components/landing/Landing';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import SearchCaretakers from './components/searchcaretakers/SearchCaretakers';
import CaretakerReviews from './components/searchcaretakers/CaretakersProfile';

export default function Unauthenticatedapp() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/signup">
            <SignUpPage />
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/logout">
            <Logout />
          </Route>

          <Route path="/search">
            <SearchCaretakers />
          </Route>

          <Route path="/ct/:ctuname">
            <CaretakerReviews />
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
