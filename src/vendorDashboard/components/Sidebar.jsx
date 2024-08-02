import React from "react";

const Sidebar = ({
  handleAddProducts,
  handleAddFirm,
  handleAllProducts,
  showFirmTitle,
}) => {
  return (
    <div className="w-[15%] bg-gray-300 max-h-[631px] h-screen flex justify-center">
      <ul className="flex flex-col gap-8 font-semibold text-lg mt-8">
        {showFirmTitle ? (
          <li onClick={handleAddFirm} className="cursor-pointer ">
            Add Firm
          </li>
        ) : (
          ""
        )}
        <li onClick={handleAddProducts} className="cursor-pointer">
          Add Product
        </li>
        <li onClick={handleAllProducts} className="cursor-pointer">
          All Products
        </li>
        <li>User details</li>
      </ul>
    </div>
  );
};

export default Sidebar;
