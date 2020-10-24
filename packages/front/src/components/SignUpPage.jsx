import React from "react";
import bg from "../resources/wallpaper.jpg";
import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";

function SignUpPage() {
  let match = useRouteMatch();
  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center center",
      }}
    >
      <div class="bg-grey-lighter min-h-screen flex lg:flex-row-reverse">
        <div class="container max-w-sm lg:mr-24 mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center font-semibold">Sign up</h1>
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="firstname"
              placeholder="First Name"
            />

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="lastname"
              placeholder="Last Name"
            />

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
            />

            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />
            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirmPassword"
              placeholder="Confirm Password"
            />

            <button class="w-full text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 border border-orange-700 rounded">
              Create Account
            </button>
          </div>

          <div class="text-white mt-6">
            Already have an account?
            <Router>
              <a href="/login" class="px-2 font-semibold">
                Sign In
              </a>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
