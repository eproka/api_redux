import React  from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NotFound() {

  const user = useSelector((state) => state.user.user);


  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Page not found</p>
      {user ? (
        <Link to="/home">Go Home</Link>
      ) : (
        <Link to="/login">Go to Login</Link>
      )}
    </div>
  );
}
