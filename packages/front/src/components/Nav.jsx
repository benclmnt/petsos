import React, { useState, useEffect } from 'react';
import logo from '../resources/petsoslogo.png';
import { Link } from 'react-router-dom';
import { useUser } from '../context/auth-context';

function Nav() {
  const [show, handleShow] = useState(false);
  const user = useUser();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', useEffect);
    };
  }, []);

  return (
    <nav
      className="fixed inline-flex justify-between w-screen px-4 md:px-16 py-2 z-50 text-white"
      style={{
        backgroundColor: show ? '#271105' : 'transparent',
      }}
    >
      <Link to="/">
        <img
          src={logo}
          className="w-1/2 h-auto md:w-auto object-scale-down md:h-12"
        />
      </Link>

      <div>
        {!user ? (
          <Link to="/login">
            <button className="focus:outline-none mx-4">
              <h1 className="md:font-bold md:text-xl pt-1">Login</h1>
            </button>
          </Link>
        ) : user?.is_admin ? (
          <Link to="/admin">
            <button className="focus:outline-none mx-4">
              <h1 className="md:font-bold md:text-xl pt-1">Admin</h1>
            </button>
          </Link>
        ) : (
          !user?.is_caretaker && (
            <Link to="/becomect">
              <button className="focus:outline-none mx-4">
                <h1 className="md:font-bold md:text-xl pt-1">
                  Become a Caretaker
                </h1>
              </button>
            </Link>
          )
        )}
        <Link to="/search">
          <button className="focus:outline-none mx-4">
            <h1 className="md:font-bold md:text-xl pt-1">Search</h1>
          </button>
        </Link>
        {user && (
          <>
            <Link to="/dashboard">
              <button className="focus:outline-none mx-4">
                <h1 className="md:font-bold md:text-xl pt-1">Dashboard</h1>
              </button>
            </Link>
            <Link to="/logout">
              <button className="focus:outline-none mx-4">
                <h1 className="md:font-bold md:text-xl pt-1">Logout</h1>
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
