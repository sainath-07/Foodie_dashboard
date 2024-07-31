import React from "react";

const AddFirm = () => {
  return (
    <div className="mt-8 mx-auto w-[550px] px-8 h-[550px]" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
      <form className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-center">Add Firm</h2>

        <label htmlFor="Firm Name" className="font-semibold">
          Firm Name
        </label>
        <input
          type="text"
          className="border-2 border-gray-300 w-[70%] rounded text-xl pl-2"
          id="Firm Name"
          name="firmName"
          placeholder="Firm Name"
        />

        <label htmlFor="Area" className="font-semibold">
          Area
        </label>
        <input
          type="text"
          id="Area"
          className="border-2 border-gray-300 w-[70%] rounded text-xl pl-2"
          name="area"
          placeholder="Enter area"
        />

        <label htmlFor="category" className="font-semibold">
          category
        </label>
        <div className="flex gap-2 justify-center items-center">
          <div>
            <label htmlFor="Veg">Veg</label>
            <input
              type="checkbox"
              id="veg"
              name="veg"
              className="h-[25px] w-[25px] m-2"
            />
          </div>
          <div>
            <label htmlFor="Non-veg">Non-veg</label>
            <input
              type="checkbox"
              id="Non-veg"
              name="Non-veg"
              className="h-[25px] w-[25px] m-2"
            />
          </div>
        </div>

        <label htmlFor="Region" className="font-semibold">
          Region
        </label>

        <div className="flex justify-center items-center ">
          <div>
            <label htmlFor="South-Indian" >South-Indian</label>
            <input type="checkbox" id="South-Indian" name="South-Indian" className="h-[25px] w-[25px] m-2"/>
          </div>
          <div>
            <label htmlFor="North-Indian">North-Indian</label>
            <input type="checkbox" id="North-Indian" name="North-Indian" className="h-[25px] w-[25px] m-2" />
          </div>
          <div>
            <label htmlFor="chinese">chinese</label>
            <input type="checkbox" id="chinese" name="chinese" className="h-[25px] w-[25px] m-2"/>
          </div>
          <div>
            <label htmlFor="bakery">bakery</label>
            <input type="checkbox" id="bakery" name="bakery" className="h-[25px] w-[25px] m-2"/>
          </div>
        </div>

        <label htmlFor="offer">Offer</label>
        <input type="text" id="offer" className="border-2 border-gray-300 w-[70%] rounded text-xl pl-2"
        />

        <div className="mt-3">
          <label htmlFor="firmimage" className="font-semibold">
            FirmImage
          </label>
          <input type="file" />
        </div>
 
        <div className="text-center mt-2">
          <button type="submit" className="bg-black p-2 px-3 rounded text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
 