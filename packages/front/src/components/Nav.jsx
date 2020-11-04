import React, { useState, useEffect } from 'react';
import '../css/nav.css';
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
    <div className={`nav ${show ? 'nav_bg' : 'nav'}`}>
      <Link to="/">
        <img src={logo} className="w-1/3 object-scale-down md:w-auto md:h-12" />
      </Link>
      <div>
        {user && (
          <>
            {!user.is_caretaker && (
              <>
                <Link to="/becomect">
                  <button className="focus:outline-none mx-4">
                    <h1 className="md:font-bold md:text-xl pt-1">
                      Become a Caretaker
                    </h1>
                  </button>
                </Link>
              </>
            )}
          </>
        )}
        {/* <Link to="/">
          <button className="focus:outline-none mx-4">
            <h1 className="md:font-bold md:text-xl pt-1">Home</h1>
          </button>
        </Link> */}
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
    </div>
  );
}

export default Nav;
