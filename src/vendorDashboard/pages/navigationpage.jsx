import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VendorRegister from "../components/form/VendorRegister";
import VendorLogin from "../components/form/VendorLogin";
import AddProducts from "../components/form/AddProducts";
import AddFirm from "../components/form/AddFirm";
import AllProducts from "../components/AllProducts";
import foodimage from "./foodimage.jpg";
import toast from "react-hot-toast";
import UserDetails from "../components/UserDetails";
import MobileResponsive from "../components/form/MobileResponsive";
// import LoginForm from "../components/form/LoginForm";

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
        toast(" Please log in to account to get access", {
          icon: "🙎🏼",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
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
        toast(" Please log in to account to get access", {
          icon: "🙎🏼",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
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
        toast(" Please log in to account to get access", {
          icon: "🙎🏼",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
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
        toast(" Please log in to account to get access", {
          icon: "🙎🏼",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        return state;
      }
    default:
      return state;
  }
};

const docFile = "/doc.pdf"; // relative path for assets in the public folder

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
      toast.success("Logout successfully!");
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

  let filterstyling = {
    borderRadius: "15px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    // color: "gray",
    fontStyle: "normal",
    padding: "8px",
    // border: "1px solid rgba(2, 6, 12, 0.15)",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  };

  const handleDownload = (url) => {
    const anchorTag = document.createElement("a");
    anchorTag.href = url;
    anchorTag.download = "FoodieDashboard.pdf"; // Provide a filename for the download
    document.body.appendChild(anchorTag);
    anchorTag.click();
    document.body.removeChild(anchorTag);
  };

  let Poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontStyle: "normal",
  };

  return (
    <>
      <div>
        <Navbar
          handleVendorRegister={handleVendorRegister}
          handleVendorLogin={handleVendorLogin}
          handleLogout={handleLogout}
        />

        <div className="flex">
          <MobileResponsive
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
              <div
                className="text-lg text-center w-full flex flex-col gap-4 mt-20"
                style={Poppins}
              >
                <p>Welcome to vendor Dashboard</p>
                <img
                  // src={foodimage}
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  
                  className="w-[90vw] md:w-[70vw] lg:w-[50vw] rounded mx-auto"
                  alt=""
                />
                <ul
                  className="w-[90%] mx-auto text-sm space-y-4 p-4 rounded-md mb-4 list-inside list-decimal"
                  style={{
                    boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                >
                  <p className="font-bold text-xl">### Getting Started</p>
                  <li>
                    {" "}
                    <span className="font-bold">**Register**:</span> Create an account with your basic details
                    and secure login credentials.
                  </li>
                  <li>
                    {" "}
                   <span className="font-bold"> **Add Your Restaurant**:</span> Enter your restaurant
                    information, upload images, and set your location. Note :
                    Each user can add only one firm (resturant){" "}
                  </li>
                  <li>
                   <span className="font-bold"> **Add Products**:</span> List your menu items, categorize them,
                    set prices, and upload product images.
                  </li>
                  <button
                    className=" bg-red-500 text-white"
                    style={filterstyling}
                    //  style={{borderRadius:'25px',}}
                    onClick={() => handleDownload(docFile)}
                  >
                    Download Pdf
                  </button>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* <Navbar/>
    <AddProducts/> */}
    </>
  );
};

export default Navigationpage;
