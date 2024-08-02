import React, { useState } from "react";
import { Api_url } from "../../utils/handleApis";

const VendorRegister = ({handleVendorLogin}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, seterrormessage] = useState(false);
  const [emptyfields, setemptyfields] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Api_url}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),

      });
      localStorage.setItem('username',username)


      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("registered successfully ");
        setUsername("");
        setEmail("");
        setPassword("");
        seterrormessage(false);
        setemptyfields(false);
        handleVendorLogin()
      } else if (
        username.length === 0 ||
        email.length === 0 ||
        password.length === 0
      ) {
        setemptyfields(true);
      } else {
        seterrormessage(true);
      }
    } catch (error) {
      console.error(error, "registration failed");
    }
  };

  return (
    <div
      className=" rounded w-[50%] ml-52 h-[380px] mt-16"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <form
        className=" flex h-full flex-col items-center w-full justify-center mt-2"
        onSubmit={handleSubmit}
      >
        <h3 className="mb-3 text-2xl font-semibold">Vendor Register</h3>
        <label htmlFor="Username" className=" w-72 font-semibold  text-lg">
          Username
        </label>
        <input
          type="text"
          size={30}
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="enter you Username"
          className="ml-2 text-lg pl-2 border-2 border-stone-800 rounded"
        />
        <br />
        <label htmlFor="Username" className="w-72 font-semibold text-lg">
          Email
        </label>
        <input
          type="text"
          size={30}
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter you email"
          className="ml-2 text-lg pl-2 border-2 border-stone-800 rounded"
        />
        {errormessage && (
          <p className="text-red-600 font-semibold">
            An account already exists with this email address in the database{" "}
          </p>
        )}
        <br />
        <label htmlFor="password" className=" w-72  font-semibold text-lg">
          Password
        </label>
        <input
          type="password"
          size={30}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter you password"
          className="ml-2 text-lg pl-2 border-2 border-stone-800 rounded"
        />
        {emptyfields && (
          <p className="text-red-600 font-semibold">
            Fields must not be emptyfields
          </p>
        )}

        <button
          type="submit"
          className="bg-black text-white m-6 px-3 py-1 rounded"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default VendorRegister;
