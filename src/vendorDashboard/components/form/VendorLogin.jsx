import React, { useState } from "react";
import { Api_url } from "../../utils/handleApis";

const VendorLogin = ({ handleWelcomepage }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (
        email == "" ||
        email == false ||
        password == false ||
        password == ""
      ) {
        alert("Please fill all fields to login successfully");
        return;
      }

      const response = await fetch(`${Api_url}/vendor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data, "data");
        alert("login is successfull");
        localStorage.setItem("loginToken", data.token);
        setemail("");
        setpassword("");
        handleWelcomepage();
      } else {
        alert("some thing went wrong....");
      }
      const vendorId = data.vendorId;
      const vendorResponse = await fetch(
        `${Api_url}/vendor/singleVendorbyid/${vendorId}`
      );
      const vendorData = await vendorResponse.json();
      console.log(vendorData, "vendorData");
      if (vendorResponse.ok) {
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        const vendorFirmId = vendorData.vendorFirmId;
        localStorage.setItem("vendorFirmName", vendorFirmName);
        localStorage.setItem("firmId", vendorFirmId);
        window.location.reload();
      }
    } catch (error) {
      console.log(error, "error message");
    }
  };

  let Poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontStyle: "normal",
  };
  return (
    <div
      className="rounded  w-[500px]  mx-auto h-[350px] mt-[65px] border-2 border-gray-300"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <form
        className="flex justify-center items-center flex-col h-full gap-4"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl" style={Poppins}>
          Vendor Login
        </h2>
        <label
          htmlFor="email"
          className="w-[350px] text-xl"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
          }}
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          className=" border-2 border-gray-300  w-[70%] rounded text-xl p-2 pl-3"
          value={email}
          name="email"
          placeholder="Enter you email"
          onChange={(e) => setemail(e.target.value)}
          style={Poppins}
        />
        <label
          htmlFor="password"
          className="w-[350px] text-xl"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
          }}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className=" border-2 border-gray-300  w-[70%] rounded text-xl p-2 pl-3"
          name="password"
          placeholder="Enter you password"
          style={Poppins}
        />
        <button
          type="submit"
          className="bg-green-500 text-white text-base  p-2 px-4 rounded"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default VendorLogin;
