import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../reduxStore/auth";
import { darkModeActions } from "../../reduxStore/darkMode";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const ispremium = useSelector((state) => state.premium.preminumValue);

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("JWTTOKEN", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("Email", "");

    dispatch(authActions.logout());
    history.replace("./auth");
  };
  console.log(ispremium);

  const checkBoxHandler = (event) => {
    event.preventDefault();
    dispatch(darkModeActions.darkModeToggle());
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

      {ispremium && (
        <div  className="px-2 p-1 bg-gray-400 text-white rounded-lg">
          <button onClick={checkBoxHandler}>Toggle</button>
        </div>
      )}

      <div className="px-2 p-1 bg-gray-400 text-white rounded-lg">
        <button onClick={logoutHandler}>{isLogin ? "Logout" : "Login"}</button>
      </div>

      <hr className="border-gray-300 border-1"></hr>
    </div>
  );
};

export default Navbar;
