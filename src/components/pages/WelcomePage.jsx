import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div>
    <div className="flex justify-between">
      <p className="text-xl text-slate-600 p-4 flex-initial">
        Welcome to expense tracker!!!
      </p>

      <div className="flex-initial ml-auto p-5 ">
        <label className="border bg-orange-100 p-1 rounded-md px-2">
          Your Profile is incomplete.<Link to="/user" className="text-blue-600">Complete Now</Link>
        </label>
      </div>
      </div>
      <hr className="border-gray-300 border-1"></hr>
    </div>
  );
};

export default WelcomePage;
