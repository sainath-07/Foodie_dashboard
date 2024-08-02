import React, { useReducer } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VendorRegister from "../components/form/VendorRegister";
import VendorLogin from "../components/form/VendorLogin";
import AddProducts from "../components/form/AddProducts";
import AddFirm from "../components/form/AddFirm";
import Welcompage from "../components/Welcompage";
import AllProducts from "../components/AllProducts";

let initialvalue = {
  showVendorRegister: false,
  showVendorLogin: false,
  showAddFirm: false,
  showAddProducts: false,
  showWelcomepage: false,
  showAllProducts: false,
};
const reducerfun = (state, action) => {
  switch (action.type) {
    case "VendorRegister":
      return {
        ...state,
        showAddFirm: false,
        showVendorLogin: false,
        showWelcomepage: false,
        showVendorRegister: true,
        showAddProducts: false,
        showAllProducts: false,
      };
    case "VendorLogin":
      return {
        ...state,
        showAddFirm: false,
        showVendorLogin: true,
        showWelcomepage: false,
        showVendorRegister: false,
        showAddProducts: false,
        showAllProducts: false,
      };
    case "AddProducts":
      return {
        ...state,
        showAddFirm: false,
        showVendorLogin: false,
        showVendorRegister: false,
        showWelcomepage: false,
        showAddProducts: true,
        showAllProducts: false,
      };
    case "AddFirm":
      return {
        ...state,
        showAddFirm: true,
        showVendorLogin: false,
        showVendorRegister: false,
        showAddProducts: false,
        showWelcomepage: false,
        showAllProducts: false,
      };
    case "WelcomePage":
      return {
        ...state,
        showAddFirm: false,
        showVendorLogin: false,
        showVendorRegister: false,
        showAddProducts: false,
        showAllProducts: false,
        showWelcomepage: true,
      };
    case "AllProducts":
      return {
        ...state,
        showAddFirm: false,
        showVendorLogin: false,
        showVendorRegister: false,
        showAddProducts: false,
        showWelcomepage: false,
        showAllProducts: true,
      };
    default:
      return state;
  }
};
const Navigationpage = () => {
  const [currentstate, dispatchfun] = useReducer(reducerfun, initialvalue);

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

  const handleAddProducts = () => {
    dispatchfun({
      type: "AddProducts",
    });
  };
  const handleAddFirm = () => {
    dispatchfun({
      type: "AddFirm",
    });
  };
  const handleWelcomepage = () => {
    dispatchfun({
      type: "WelcomePage",
    });
  };
  const handleAllProducts = () => {
    dispatchfun({
      type: "AllProducts",
    });
  };
  return (
    <div>
      <Navbar
        handleVendorRegister={handleVendorRegister}
        handleVendorLogin={handleVendorLogin}
      />

      <div className="flex">
        <Sidebar
          handleAddFirm={handleAddFirm}
          handleAddProducts={handleAddProducts}
          handleAllProducts={handleAllProducts}
        />

        {currentstate.showVendorRegister && (
          <VendorRegister handleVendorLogin={handleVendorLogin} />
        )}
        {currentstate.showVendorLogin && (
          <VendorLogin handleWelcomepage={handleWelcomepage} />
        )}
        {currentstate.showAddProducts && <AddProducts />}
        {currentstate.showAddFirm && <AddFirm />}
        {currentstate.showWelcomepage && <Welcompage />}
        {currentstate.showAllProducts && <AllProducts />}
      </div>
    </div>
  );
};

export default Navigationpage;
