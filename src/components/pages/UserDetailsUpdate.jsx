import React, { useRef } from "react";

const UserDetailsUpdate = () => {
  const nameRef = useRef();
  const urlRef = useRef();

  const updateHandler = async (event) => {
    event.preventDefault();
    console.log("Updating...");
    const enteredName = nameRef.current.value;
    const enteredUrl = urlRef.current.value;
    const token = localStorage.getItem("JWITOKEN");

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBFdlQTui429wZpw9CRTBvvYZAe66D9E7o",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: enteredName,
            photoUrl: enteredUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log("updated successfully ");
        nameRef.current.value = "";
        urlRef.current.value = "";
      } else {
        const data = await res.json();
        alert(data.error.message);
      }
    } catch (error) {
      console.log("during upating went wrong!!");
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl text-slate-600 p-4 flex-initial">
          Winners never quite, Quitters never win.
        </p>
      </div>
      <hr className="border-gray-300 border-1"></hr>

      <div className="flex justify-center p-10">
        <form>
          <div className="text-xl py-5">Contact Details</div>

          <div>
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" ref={nameRef} />

            <label htmlFor="url">Photo Profile URL:</label>
            <input type="text" id="url" ref={urlRef} />
          </div>

          <div className="py-4">
            <button
              onClick={updateHandler}
              className="bg-red-400 text-white px-2 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsUpdate;
