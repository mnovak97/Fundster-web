import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from '../Components/Header/Header';

const RequireAuth = () => {
    const location = useLocation();
    const [cookies] = useCookies(["userToken"]);
    const isUserLoggedIn = cookies["userToken"];

    return (
      <>
        {isUserLoggedIn && <Header />}
        {isUserLoggedIn ? (
          <Outlet />
        ) : (
          <Navigate to="/login" state={{ from: location }} replace />
        )}
      </>
    );
}

export default RequireAuth