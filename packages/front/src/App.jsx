import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import SearchSittersBoarding from "./components/SearchSittersBoarding";
import SearchSittersHouseSitting from "./components/SearchSittersHouseSitting";
import SearchSittersDrop from "./components/SearchSittersDrop";
import SearchSittersDayCare from "./components/SearchSittersDayCare";
import SearchSittersWalk from "./components/SearchSittersWalk";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [foo, setFoo] = useState("N/A");
  useEffect(() => {
    fetch("/api/foo")
      .then((res) => res.json())
      .then((data) => setFoo(data.foo))
      .catch((err) => setFoo(err.message));
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>

          <Route exact path="/login">
            <LoginPage />
          </Route>

          <Route exact path="/searchsitters/boarding">
            <SearchSittersBoarding />
          </Route>

          <Route exact path="/searchsitters/housesitting">
            <SearchSittersHouseSitting />
          </Route>

          <Route exact path="/searchsitters/dropin">
            <SearchSittersDrop />
          </Route>

          <Route exact path="/searchsitters/daycare">
            <SearchSittersDayCare />
          </Route>

          <Route exact path="/searchsitters/dogwalk">
            <SearchSittersWalk />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
