
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setPassword, loginUser } from "../redux/actions";

export default function Login() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);

  function handleLoginSubmit() {
    fetch("http://localhost:5001/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          const user = data.find(
            (user) => user.email === email && user.password === password
          );

          if (user) {
            dispatch(loginUser(user));
            navigate("/home");
          } else {
            setErrors({ email: "User not found or incorrect credentials" });
          }
        } else {
          setErrors({ email: "Invalid data format" });
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrors({ email: "An error occurred during login" });
      });
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="form-group">
        <input
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <input
          className="input-field"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <button className="login-button" onClick={handleLoginSubmit}>
        Login
      </button>
    </div>
  );
}