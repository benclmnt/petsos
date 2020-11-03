import React, { useState } from 'react';
import bg from '../resources/wallpaper.jpg';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

function LoginPage() {
  const authClient = useAuth();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      await authClient.login(form);
    } catch (err) {
      setErrorMsg(err.error);
    }
  };

  return (
    <div
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="bg-grey-lighter min-h-screen flex lg:flex-row-reverse">
        <div className="container max-w-sm lg:mr-24 mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-semibold">Log In</h1>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <button
              className="w-full text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 border border-orange-700 rounded"
              onClick={handleSubmit}
            >
              Sign In
            </button>

            <p className="w-full text-center inline-block align-baseline font-bold text-sm text-orange-700 pt-4">
              {errorMsg}
            </p>
          </div>

          <div className="text-white mt-6">
            Don't have an account?
            <Link to="/signup" className="font-semibold mx-2">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
