import React, { useState } from 'react';
import bg from '../resources/wallpaper.jpg';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

function SignUpPage() {
  const authClient = useAuth();

  const [form, setForm] = useState({
    username: '',
    email: '',
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

    try {
      await authClient.register(form);
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
      <form
        className="bg-grey-lighter min-h-screen flex lg:flex-row-reverse"
        onSubmit={handleSubmit}
      >
        <div className="container max-w-sm lg:mr-24 mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-semibold">Sign up</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required="required"
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required="required"
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required="required"
            />

            <button
              className="w-full text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 border border-orange-700 rounded"
              type="submit"
            >
              Create Account
            </button>

            <p className="w-full text-center inline-block align-baseline font-bold text-sm text-orange-700 pt-4">
              {errorMsg}
            </p>
          </div>

          <div className="text-white mt-6">
            Already have an account?
            <Link to="/login" className="px-2 font-semibold focus:outline-none">
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
