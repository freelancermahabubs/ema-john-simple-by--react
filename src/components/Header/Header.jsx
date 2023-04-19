import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then((result) => {})
      .catch((error) => console.log(error));
  };

  return (
    <nav className="header">
      <img src={logo} alt="logo" />
      <div className="">
        <Link to="/">Shop</Link>
        <Link to="/order">Order</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/singup">Sing Up</Link>
        {user && (
          <span className="text-white pl-2">
            {user.email}{" "}
            <button
              className="bg-red-600 rounded p-2 ml-2"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Header;
