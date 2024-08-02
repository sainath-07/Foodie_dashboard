import React, { useEffect, useState } from "react";

const Navbar = ({
  handleVendorRegister,
  handleVendorLogin,
  showLogout,
  handleLogout,
}) => {
  const firmName = localStorage.getItem("vendorFirmName");

  return (
    <div className="bg-red-500 h-16 items-center  flex justify-between">
      <div className="ml-8 text-xl font-semibold text-white ">
        VendorDashboard
      </div>

      <div className=" text-xl font-semibold text-white">
        ResturantName :{" "}
        <span className="text-3xl  text-white font-bold "> {firmName} </span>
      </div>
      <div className="text-xl font-semibold mr-8">
        {showLogout ? (
          <span className="cursor-pointer" onClick={handleLogout}>
            Logout
          </span>
        ) : (
          <>
            <span onClick={handleVendorLogin} className="cursor-pointer">
              Login/
            </span>
            <span onClick={handleVendorRegister} className="cursor-pointer">
              Register
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
