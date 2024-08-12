import React, { useContext, useState } from "react";
import { SkipForward } from "lucide-react";
import { data } from "../../App";
import MobileResponsive from "./form/MobileResponsive";

const Navbar = ({ handleVendorRegister, handleVendorLogin, handleLogout }) => {
  const { isSidemenuopen, setsidemenu } = useContext(data);

  const loginToken = localStorage.getItem("loginToken");

  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontStyle: "normal",
  };
  let filterstyling = {
    borderRadius: "15px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    color: "gray",
    fontStyle: "normal",
    padding: "5px 8px",
    border: "1px solid rgba(2, 6, 12, 0.15)",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  };

  return (
    <>
      <div
        // style={filterstyling}
        className=" w-full flex h-[10vh]  fixed top-0 right-0 gap-1 justify-between items-center m-0 sm:px-8 "
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {/* logo */}
        <div className="flex items-center sm:gap-4">
          <SkipForward
            onClick={() => setsidemenu(true)}
            className="cursor-pointer"
          />
          <p style={poppins} className="text-sm sm:text-xl cursor-pointer">
            <a href="#">FoodieDashboard</a>
          </p>
        </div>

        {/* Mobile responsive code */}
        <MobileResponsive />
        {/* login , logout,register button */}
        <div className="flex gap-1 mr-2">
          {loginToken ? (
            <>
              <button style={filterstyling} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button style={filterstyling} onClick={handleVendorLogin}>
                Login
              </button>
              <button
                className=""
                style={filterstyling}
                onClick={handleVendorRegister}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
