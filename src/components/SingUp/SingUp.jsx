import React, { useState } from "react";
import "./SingUp.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const SingUp = () => {
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);

  const handleSingUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(email, password, confirm);

    setError("");
    if (password !== confirm) {
      setError("Your Password Did Not Match");
      return;
    } else if (password.length < 6) {
      setError("Password Must be 6 Characters Or longer");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <div className="form-container">
      <h2 className="form-title">Sing Up</h2>
      <form onSubmit={handleSingUp}>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            placeholder="Enter password"
            required
          />
        </div>
        <input className="btn-submit" type="submit" value="Sing Up" />
      </form>
      <p className="text-center mt-3">
        <small className="text-xl">
          Already Have an Account?
          <span className="text-orange-700 text-xs pl-1">
            <Link to="/login">Login</Link>
          </span>
        </small>
      </p>
      <p className="pt-2 text-red-500">
        <small>{error}</small>
      </p>
    </div>
  );
};

export default SingUp;
