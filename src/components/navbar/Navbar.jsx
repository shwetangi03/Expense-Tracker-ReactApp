import React from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
const history = useHistory()

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("JWTTOKEN", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("Email", "");
    history.replace("./auth")
  };

  return (
    <div className="flex p-2 gap-4">
      <div className="px-2 p-1 bg-gray-400 text-white rounded-lg">Home</div>
      <div className="px-2 p-1 bg-gray-400 text-white rounded-lg">Product</div>
      <div className="px-2 p-1 bg-gray-400 text-white rounded-lg">About Us</div>
      <div className="px-2 p-1 bg-gray-400 text-white rounded-lg">
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <hr className="border-gray-300 border-1"></hr>
    </div>
  );
};

export default Navbar;
