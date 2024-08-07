import React, { useState } from "react";
import { Api_url } from "../../utils/handleApis";

const VendorRegister = ({ handleVendorLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        username == "" ||
        username == false ||
        email == "" ||
        email == false ||
        password == "" ||
        password == false
      ) {
        alert("Please fill all the fields to register successfully");
        return;
      }
      const response = await fetch(`${Api_url}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      // localStorage.setItem("username", username);

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("registered successfully ");
        setUsername("");
        setEmail("");
        setPassword("");
        handleVendorLogin();
      } else if (data.message) {
        alert(data.message);
      }
    } catch (error) {
      console.error(error, "registration failed");
    }
  };

  let Poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontStyle: "normal",
  };

  return (
    <div
      className=" rounded w-[50%] ml-52 h-[500px] mt-16 border-2 border-gray-300 "
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <form
        className=" flex h-full flex-col items-center w-full justify-center mt-2"
        onSubmit={handleSubmit}
      >
        <h3 className="mb-3 text-2xl font-semibold" style={Poppins}>
          Vendor Register
        </h3>
        <label
          htmlFor="Username"
          className="w-[340px] font-semibold  text-lg "
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
          }}
        >
          Username <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          size={35}
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter you Username"
          className="ml-2 text-lg pl-2 p-2 border-2 border-gray-300 rounded"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 300,
            fontStyle: "normal",
          }}
          autoComplete="off"
        />
        <br />
        <label
          htmlFor="Username"
          className="w-[340px] font-semibold text-lg"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
          }}
        >
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          size={35}
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter you email"
          className="ml-2 text-lg pl-2 p-2 border-2 border-gray-300 rounded"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 300,
            fontStyle: "normal",
          }}
          autoComplete="off"
        />

        <br />
        <label
          htmlFor="password"
          className=" w-[340px]  font-semibold text-lg"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
          }}
        >
          Password <span className="text-red-600">*</span>
        </label>
        <input
          type="password"
          size={35}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter you password"
          className="ml-2 text-lg pl-2 p-2 border-2 border-gray-300 rounded"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 300,
            fontStyle: "normal",
          }}
          autoComplete="off"
        />

        <button
          type="submit"
          className="bg-green-500 text-white m-6 px-3 py-2 rounded"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default VendorRegister;
