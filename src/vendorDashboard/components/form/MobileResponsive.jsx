import React, { useContext, useState } from "react";
import {
  ChefHat,
  HandPlatter,
  House,
  MessageCircleCode,
  Phone,
  ShoppingBag,
  UserCheck,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { data } from "../../../App";

const MobileResponsive = ({
  handleAddProducts,
  handleAddFirm,
  handleAllProducts,
  showFirmTitle,
  handleUserDetails,
}) => {
  const { isSidemenuopen, setsidemenu } = useContext(data);

  let filterstyling = {
    borderRadius: "18px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    color: "gray",
    fontStyle: "normal",
    padding: "5px 4px",
    border: "1px solid rgba(2, 6, 12, 0.15)",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(100px)",
    WebkitBackdropFilter: "blur(10px)",
    // border: "2px solid",
  };
  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    fontStyle: "normal",
  };
  return (
    <div>
      <section
        className={clsx(
          "fixed top-0 left-0 h-screen w-[100vw]  -translate-x-full transition-all p-0 m-0",
          isSidemenuopen && "translate-x-0 duration-700 ease-in-out"
        )}
      >
        <div
          className="text-black
         bg-slate-50 flex flex-col absolute left-0 top-0 h-screen w-[13rem] z-50"
          style={{
            // backgroundColor: "rgba(0, 255, 255, 0.7)",
            // backgroundColor:"#fac301",
            backdropFilter: "blur(100px)",
          }}
        >
          {/* responsive top bar header */}
          <section className="flex mt-1 gap-2 border-b-2 py-2 px-4 justify-between items-end ">
            <p
              style={poppins}
              className="text-xl cursor-pointer"
              onClick={() => {
                window.location.reload();
              }}
            >
              Foodie Dashboard
            </p>
            <X
              onClick={() => setsidemenu(false)}
              className="cursor-pointer w-12 h-12"
              style={{
                borderRadius: "18px",
                padding: "5px",
              }}
            />
          </section>

          {/* responsive body section */}

          <section className="p-4 flex flex-col h-full">
            <p
              className="mb-4 flex gap-1 justify-center  cursor-pointer text-center"
              style={filterstyling}
              onClick={handleAddFirm}
            >
              <ChefHat /> Add Firm
            </p>
            <p
              className="mb-4 flex justify-center gap-1 cursor-pointer text-center"
              style={filterstyling}
              onClick={handleAddProducts}
            >
              <HandPlatter />
              Add Product
            </p>
            <p
              className="mb-4 cursor-pointer text-center flex justify-center gap-1 items-center"
              style={filterstyling}
              onClick={handleAllProducts}
            >
              <ShoppingBag /> All Products
            </p>

            <p
              className="mb-4  border-2  flex justify-center gap-1 items-center cursor-pointer text-center"
              style={filterstyling}
              onClick={handleUserDetails}
              data-action="share/whatsapp/share"
              target="_blank"
            >
              <UserCheck />
              Userdetails
            </p>
            <a
              className="mb-4  border-2  flex justify-center gap-1 items-center cursor-pointer text-center"
              style={filterstyling}
              data-action="share/whatsapp/share"
              target="_blank"
              href="https://wa.me/+919010995323/?text=Hello"
            >
              <MessageCircleCode />
              24*7 Support
            </a>
            <a
              className="mb-4  border-2  flex justify-center gap-1 items-center cursor-pointer text-center"
              style={filterstyling}
              href="tel:+919010995323"
            >
              <Phone />
              Contact
            </a>
            <p
              className="mb-4  border-2  flex justify-center gap-2 items-center cursor-pointer text-center"
              style={filterstyling}
              onClick={() => {
                window.location.reload();
              }}
            >
              <House />
              Home
            </p>
          </section>
        </div>
      </section>
    </div>
  );
};

export default MobileResponsive;
