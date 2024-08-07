import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VendorRegister from "../components/form/VendorRegister";
import VendorLogin from "../components/form/VendorLogin";
import AddProducts from "../components/form/AddProducts";
import AddFirm from "../components/form/AddFirm";
import AllProducts from "../components/AllProducts";
import foodimage from "./foodimage.jpg";
import UserDetails from "../components/UserDetails";

const loginToken = localStorage.getItem("loginToken");
const firmId = localStorage.getItem("firmId");
// console.log(firmId,'firmId')

let initialvalue = {
  showVendorRegister: false,
  showVendorLogin: false,
  showAddFirm: false,
  showAddProducts: false,
  showAllProducts: false,
  showUserDetails: false,
};
const reducerfun = (state, action) => {
  switch (action.type) {
    case "VendorRegister":
      return {
        ...state,
        showAddFirm: false,
        showVendorLogin: false,
        showVendorRegister: true,
        showAddProducts: false,
        showAllProducts: false,
        showUserDetails: false,
      };
    case "VendorLogin":
      return {
        ...state,
        showAddFirm: false,
        showVendorLogin: true,
        showVendorRegister: false,
        showAddProducts: false,
        showAllProducts: false,
        showUserDetails: false,
      };
    case "AddProducts":
      if (loginToken || firmId) {
        return {
          ...state,
          showAddFirm: false,
          showVendorLogin: false,
          showVendorRegister: false,
          showAddProducts: true,
          showAllProducts: false,
          showUserDetails: false,
        };
      } else {
        return state;
      }
    case "AddFirm":
      if (loginToken) {
        return {
          ...state,
          showAddFirm: true,
          showVendorLogin: false,
          showVendorRegister: false,
          showAddProducts: false,
          showAllProducts: false,
          showUserDetails: false,
        };
      } else {
        return state;
      }

    case "AllProducts":
      if (loginToken) {
        return {
          ...state,
          showAddFirm: false,
          showVendorLogin: false,
          showVendorRegister: false,
          showAddProducts: false,
          showAllProducts: true,
          showUserDetails: false,
        };
      } else {
        return state;
      }
    case "userDetails":
      if (loginToken && firmId) {
        return {
          ...state,
          showAddFirm: false,
          showVendorLogin: false,
          showVendorRegister: false,
          showAddProducts: false,
          showAllProducts: false,
          showUserDetails: true,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
const Navigationpage = () => {
  const [currentstate, dispatchfun] = useReducer(reducerfun, initialvalue);
  const [showFirmTitle, setshowFirmTitle] = useState(true);

  useEffect(() => {
    const vendorFirmName = localStorage.getItem("vendorFirmName");
    if (vendorFirmName) {
      setshowFirmTitle(false);
    }
  }, []);

  const {
    showVendorRegister,
    showVendorLogin,
    showAddFirm,
    showAddProducts,
    showAllProducts,
    showUserDetails,
  } = currentstate;

  const handleLogout = () => {
    if (window.confirm("Are you sure do you want to logout..?")) {
      localStorage.clear();
      window.location.reload();
    }
  };
  // handlers...
  const handleVendorRegister = () => {
    dispatchfun({
      type: "VendorRegister",
    });
  };
  const handleVendorLogin = () => {
    dispatchfun({
      type: "VendorLogin",
    });
  };

  if (showVendorLogin || showVendorRegister) {
    localStorage.clear();
  }

  const handleAddFirm = () => {
    dispatchfun({
      type: "AddFirm",
    });
  };
  const handleAddProducts = () => {
    dispatchfun({
      type: "AddProducts",
    });
  };
  const handleAllProducts = () => {
    dispatchfun({
      type: "AllProducts",
    });
  };
  const handleUserDetails = () => {
    dispatchfun({
      type: "userDetails",
    });
  };

  let Poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontStyle: "normal",
  };

  return (
    <div>
      <Navbar
        handleVendorRegister={handleVendorRegister}
        handleVendorLogin={handleVendorLogin}
        handleLogout={handleLogout}
      />

      <div className="flex">
        <Sidebar
          handleAddFirm={handleAddFirm}
          handleAddProducts={handleAddProducts}
          handleAllProducts={handleAllProducts}
          handleUserDetails={handleUserDetails}
          showFirmTitle={showFirmTitle}
          showVendorRegister={showVendorRegister}
          showVendorLogin={showVendorLogin}
        />

        {showVendorRegister && (
          <VendorRegister handleVendorLogin={handleVendorLogin} />
        )}

        {showVendorLogin && (
          <VendorLogin
            handleAddFirm={handleAddFirm}
            handleAddProducts={handleAddProducts}
          />
        )}

        {showAddFirm && loginToken && <AddFirm />}
        {showAddProducts && loginToken && <AddProducts />}
        {showAllProducts && loginToken && <AllProducts />}
        {showUserDetails && loginToken && <UserDetails />}

        {showVendorLogin ||
        showVendorRegister ||
        showAddFirm ||
        showAddProducts ||
        showUserDetails ||
        showAllProducts ? (
          ""
        ) : (
          <>
            <div className="flex gap-3 justify-center ml-20 items-center mx-auto w-[75%]">
              <img src={foodimage} className="w-[50%] rounded" alt="" />
              <span className="text-xl" style={Poppins}>
                Welcome to vendor Dashboard
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigationpage;
