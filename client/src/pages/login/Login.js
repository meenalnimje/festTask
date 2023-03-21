import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/avatar/Avatar";
import "./Login.scss";
function Login() {
  return (
    <div className="login ">
      <div className="container">
        <Avatar />
        <h2 className="heading">Login</h2>
        <form>
          <div className="form-items">
            <label htmlFor="email">Email: </label>
            <input type="text" className="email" id="email" />
          </div>
          <div className="form-items">
            <label htmlFor="password">Password: </label>
            <input type="text" className="password" id="password" />
          </div>
          <input type="submit" />
        </form>
        <p className="sub-heading">
          Do not have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
