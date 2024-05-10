import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const history = useHistory();

  const resetHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;

    setIsLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBFdlQTui429wZpw9CRTBvvYZAe66D9E7o",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        alert(`Link successfully send to ${enteredEmail}`);
        history.replace("/auth");
      } else {
        const data = await res.json();
        alert(data.error.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Something went wrong");
      console.log(error);
      setIsLoading(false);
    }
  };

  const gotoHandler = (event) => {
    event.preventDefault();
    history.replace("/auth");
  };

  return (
    <div className="flex justify-center p-20">
      <form className="h-96 w-96 bg-slate-400 ">
        <h1 className="flex justify-center p-5 text-2xl text-white">
          Reset Password
        </h1>
        <div>Enter the email with you have registered.</div>
        <span className=" flex justify-center">
          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            ref={emailRef}
          />
        </span>
        <div className="p-2 flex justify-center">
          <button
            onClick={resetHandler}
            className="border-2 bg-gray-700 p-1 px-2 rounded-md"
          >
            {isLoading ? "Loading..." : "Send Link"}
          </button>
        </div>
        <label>
          Know your password?{" "}
          <button
            onClick={gotoHandler}
            className="border-2 bg-gray-700 p-1 px-2 rounded-md"
          >
            Login
          </button>
        </label>
      </form>
    </div>
  );
};

export default ResetPassword;
