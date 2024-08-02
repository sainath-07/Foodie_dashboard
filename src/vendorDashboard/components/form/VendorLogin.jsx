import React, { useEffect, useState } from "react";
import { Api_url } from "../../utils/handleApis";

const VendorLogin = ({ handleWelcomepage }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
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
      } 
      else {
        alert("some thing went wrong....");
      }
      const vendorId=data.vendorId
      const vendorResponse = await fetch(`${Api_url}/vendor/singleVendorbyid/${vendorId}`)
      const vendorData= await vendorResponse.json()
      console.log(vendorData,'vendorData')
      if(vendorResponse.ok){
        const vendorFirmName= vendorData.vendor.firm[0].firmName
        const vendorFirmId= vendorData.vendorFirmId
        localStorage.setItem('vendorFirmName',vendorFirmName)
        localStorage.setItem('firmId',vendorFirmId)
        window.location.reload()
      }


    } catch (error) {
      console.log(error, "error message");
    }

   
  };
  return (
    <div
      className="rounded  w-[500px]  mx-auto h-[300px] mt-[65px]"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <form
        className="flex flex-col justify-start items-center h-full gap-4"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mt-4">Vendor Login</h2>
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="border-2 border-gray-700 w-[70%] rounded text-lg"
          value={email}
          name="email"
          placeholder="Enter you email"
          onChange={(e) => setemail(e.target.value)}
        />
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="border-2 border-gray-700 w-[70%] rounded text-lg"
          name="password"
          placeholder="Enter you password"
        />
        <button type="submit" className="bg-black text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VendorLogin;
