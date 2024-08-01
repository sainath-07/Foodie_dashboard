import React, { useReducer } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VendorRegister from "../components/form/VendorRegister";
import VendorLogin from "../components/form/VendorLogin";
import AddProducts from "../components/form/AddProducts";
import AddFirm from "../components/form/AddFirm";
import Welcompage from "../components/Welcompage";

let initialvalue = {
  showVendorRegister: false,
  showVendorLogin: false,
  showAddFirm: false,
  showAddProducts: false,
  showWelcomepage: false,
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
      };
    case "VendorLogin":
      return {
        ...state,
        showAddFirm: false,
        showVendorLogin: true,
        showVendorRegister: false,
        showAddProducts: false,
      };
    case "AddProducts":
      return {
        ...state,
        showAddFirm: false,
        showVendorLogin: false,
        showVendorRegister: false,
        showAddProducts: true,
      };
    case "AddFirm":
      return {
        ...state,
        showAddFirm: true,
        showVendorLogin: false,
        showVendorRegister: false,
        showAddProducts: false,
      };
    case 'WelcomePage':
      return {   ...state,
        showAddFirm: false,
        showVendorLogin: false,
        showVendorRegister: false,
        showAddProducts: false,
        showWelcomepage: true} ;
      default : return state
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

  const handleAddProducts=()=>{
    dispatchfun({
        type : "AddProducts"
    })

  }
  const handleAddFirm=()=>{
    dispatchfun({
        type : "AddFirm"
    })
  }
  const handleWelcomepage=()=>{
    dispatchfun({
      type : "WelcomePage"
    })
  }
  return (
    <div>
      <Navbar
        handleVendorRegister={handleVendorRegister}
        handleVendorLogin={handleVendorLogin}
      />

      <div className="flex">
        <Sidebar handleAddFirm={handleAddFirm} 
        handleAddProducts={handleAddProducts}
        />

        {currentstate.showVendorRegister && <VendorRegister handleVendorLogin={handleVendorLogin} />}
        {currentstate.showVendorLogin && <VendorLogin handleWelcomepage={handleWelcomepage} />}
        {currentstate.showAddProducts && <AddProducts />}
        {currentstate.showAddFirm && <AddFirm />}
        {currentstate.showWelcomepage && <Welcompage />}
     
      </div>
    </div>
  );
};

export default Navigationpage;
