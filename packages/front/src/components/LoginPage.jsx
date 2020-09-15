import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    useRouteMatch
  } from "react-router-dom";

function LoginPage() {
    let match = useRouteMatch();
    return (
        <div class="bg-orange-100">
            <div class="bg-grey-lighter min-h-screen flex flex-col">
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 class="mb-8 text-3xl text-center">Log In</h1>
                    
                        <input 
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />
    
                        <input 
                            type="password"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />
    
                        <button class="w-full text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 border border-orange-700 rounded">
                            Sign In
                        </button>

                        <a class="w-full text-center inline-block align-baseline font-bold text-sm text-orange-500 py-4 hover:text-orange-800" href="#">
                            Forgot Password?
                        </a>
                    </div>

                    <div class="text-black mt-6">
                                Don't have a Petsos account? 
                                <Router>
                                    <a href="/" class="no-underline border-b px-2 border-blue text-blue">
                                        Sign up now.
                                    </a>
                                </Router>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
