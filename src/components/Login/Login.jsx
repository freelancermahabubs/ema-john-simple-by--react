import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const { sinIn } = useContext(AuthContext);
  const navigate = useNavigate("");
  let location = useLocation();
  console.log(location);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    sinIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            id="email"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            id="password"
            required
          />
          <p onClick={() => setShow(!show)}>
            <small>
              {show ? <span>Hide Password</span> : <span>Show Password</span>}
            </small>
          </p>
        </div>
        <input className="btn-submit" type="submit" value="Login" />
      </form>
      <p className="text-center mt-3">
        <small className="text-xl">
          New to Ema-John?
          <span className="text-orange-700 text-xs pl-1">
            <Link to="/singup">Create New Account</Link>
          </span>
        </small>
      </p>
    </div>
  );
};

export default Login;
