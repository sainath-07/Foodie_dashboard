import React, { useEffect, useState } from "react";

const Navbar = ({
  handleVendorRegister,
  handleVendorLogin,
  showLogout,
  handleLogout,
}) => {
  const firmName = localStorage.getItem("vendorFirmName");


  let poppins={
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
  }

  return (
    <div className="bg-orange-500 h-16 items-center  flex justify-between">
      <div className="ml-8 text-2xl text-white " style={poppins}>
        VendorDashboard
      </div>

      <div className=" text-xl  text-white" style={poppins}>
        ResturantName :{" "}
        <span className="text-3xl  text-wh ite font-bold "> {firmName} </span>
      </div>
      <div className="text-xl font-semibold mr-8 flex gap-4">
        {!showLogout ? (
          <>
            <span onClick={handleVendorLogin} className="cursor-pointer border-2 p-3 text-white" style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontStyle: "normal",
          }}>
              Login
            </span>
            <span onClick={handleVendorRegister} className="cursor-pointer border-2 p-3 text-white" style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontStyle: "normal",
          }}>
              Register
            </span>
          </>
        ) : (
          <span className="cursor-pointer" onClick={handleLogout}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
