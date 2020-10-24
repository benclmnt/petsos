import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

export default function Logout() {
  const authContext = useAuth();
  React.useEffect(() => {
    authContext.logout();
  }, []);

  // return to homepage
  return <Redirect to="/" />;
}
