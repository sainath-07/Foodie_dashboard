import React, { useReducer } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VendorRegister from "../components/form/VendorRegister";
import VendorLogin from "../components/form/VendorLogin";
import AddProducts from "../components/form/AddProducts";
import AddFirm from "../components/form/AddFirm";

let initialvalue = {
  showVendorRegister: false,
  showVendorLogin: false,
  showAddFirm: false,
  showAddProducts: false,
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
  }
};
const Navigationpage = () => {
  const [currentstate, dispatchfun] = useReducer(reducerfun, initialvalue);

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

        {currentstate.showVendorRegister && <VendorRegister />}
        {currentstate.showVendorLogin && <VendorLogin />}
        {currentstate.showAddProducts && <AddProducts />}
        {currentstate.showAddFirm && <AddFirm />}
     
      </div>
    </div>
  );
};

export default Navigationpage;
