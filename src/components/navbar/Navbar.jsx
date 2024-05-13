import React, { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../reduxStore/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("JWTTOKEN", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("Email", "");
    dispatch(authActions.logout());
    history.replace("./auth");
  };

  return (
    <div className="flex p-2 gap-4">
      <NavLink
        to="/welcome"
        className="px-2 p-1 bg-gray-400 text-white rounded-lg"
      >
        Home
      </NavLink>

      <NavLink
        to="/expenses"
        className="px-2 p-1 bg-gray-400 text-white rounded-lg"
      >
        Products
      </NavLink>

      <NavLink to="/" className="px-2 p-1 bg-gray-400 text-white rounded-lg">
        About Us
      </NavLink>

      <div className="px-2 p-1 bg-gray-400 text-white rounded-lg">
        <button onClick={logoutHandler}>Logout</button>
      </div>

      <hr className="border-gray-300 border-1"></hr>
    </div>
  );
};

export default Navbar;
