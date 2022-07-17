import React from 'react';
import {Navigate} from 'react-router-dom';
// import { Route } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export function ProtectedRoute(props) {
  const { currentUser } = useAuth();
  const { children, path } = props;
  return currentUser ? children : <Navigate
  to ={{
    pathname: "/",
    state: { from: path}
  }}
   />
    // if (!currentUser) {
    //     return <Navigate to={'/'} />;
    // }
    // return children;

}