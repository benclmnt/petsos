import * as React from "react";
import { Link as RouterLink, Route } from "react-router-dom";
import PetCategories from "./PetCategories";
import AdminHome from "./AdminHome";

const Link = ({ to, children }) => (
  <RouterLink to={`/admin/${to}`}>{children}</RouterLink>
);

export default function Admin() {
  return (
    <>
      <div className="h-16"></div>
      <ul>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="pet-categories">Pet Categories</Link>
        </li>
      </ul>
      <Route path="/admin/pet-categories" component={PetCategories} />
      <Route path="/admin/home" component={AdminHome} />
    </>
  );
}
