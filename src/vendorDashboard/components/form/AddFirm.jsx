import React, { useState } from "react";
import { Api_url } from "../../utils/handleApis";
import toast from "react-hot-toast";

const AddFirm = () => {
  const [firmName, setfirmName] = useState("");
  const [area, setarea] = useState("");
  const [category, setcategory] = useState([]);
  const [region, setregion] = useState([]);
  const [offer, setoffer] = useState("");
  const [Image, setimage] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setcategory(category.filter((item) => item !== value));
    } else {
      setcategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setregion(region.filter((item) => item !== value));
    } else {
      setregion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setimage(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();

    try {
      const getToken = localStorage.getItem("loginToken");

      if (
        !firmName ||
        !area ||
        !offer ||
        !category.length ||
        !region.length ||
        !Image
      ) {
        return toast("Please fill all the fields to register successfully", {
          icon: "🙎🏼",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", Image);

      category.forEach((value) => {
        formData.append("category", value);
      });
      region.forEach((value) => {
        formData.append("region", value);
      });

      const response = await fetch(`${Api_url}/firm/add-firm`, {
        method: "POST",
        headers: {
          token: `${getToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data, "data");
        localStorage.setItem("firmId", data.firm._id);
        toast.success("Firm added successfully");
        setfirmName("");
        setarea("");
        setoffer("");
        setcategory([]);
        setregion([]);
        setimage(null);
      } else if (data.message === "vendor can have only one firm") {
        toast.error("Vendor can add only one firm (restaurant)");

        setfirmName("");
        setarea("");
        setoffer("");
        setcategory([]);
        setregion([]);
        setimage(null);
      }
    } catch (error) {
      console.error("Failed to add firm:", error);
    }
  };

  return (
    <div className="mt-24 w-[95%] mx-auto p-4 sm:p-6 md:p-8 lg:p-12  max-w-lg bg-white rounded-lg shadow-lg">
      <form className="flex flex-col gap-4" onSubmit={handleFirmSubmit}>
        <h2 className="text-2xl font-bold text-center">Add Firm</h2>

        <label htmlFor="firmName" className="font-semibold text-lg">
          Firm Name
        </label>
        <input
          type="text"
          id="firmName"
          value={firmName}
          autoComplete="off"
          onChange={(e) => setfirmName(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-lg w-full text-lg"
          placeholder="Firm Name"
        />

        <label htmlFor="area" className="font-semibold text-lg">
          Area
        </label>
        <input
          type="text"
          id="area"
          value={area}
          autoComplete="off"
          onChange={(e) => setarea(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-lg w-full text-lg"
          placeholder="Enter area"
        />

        <label htmlFor="category" className="font-semibold text-lg">
          Category
        </label>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="veg"
              value="veg"
              checked={category.includes("veg")}
              onChange={handleCategoryChange}
              className="mr-2"
            />
            <label htmlFor="veg">Veg</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="Non-veg"
              value="Non-veg"
              checked={category.includes("Non-veg")}
              onChange={handleCategoryChange}
              className="mr-2"
            />
            <label htmlFor="Non-veg">Non-veg</label>
          </div>
        </div>

        <label htmlFor="region" className="font-semibold text-lg">
          Region
        </label>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="South-Indian"
              value="South-Indian"
              checked={region.includes("South-Indian")}
              onChange={handleRegionChange}
              className="mr-2"
            />
            <label htmlFor="South-Indian">South-Indian</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="North-Indian"
              value="North-Indian"
              checked={region.includes("North-Indian")}
              onChange={handleRegionChange}
              className="mr-2"
            />
            <label htmlFor="North-Indian">North-Indian</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="chinese"
              value="chinese"
              checked={region.includes("chinese")}
              onChange={handleRegionChange}
              className="mr-2"
            />
            <label htmlFor="chinese">Chinese</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="bakery"
              value="bakery"
              checked={region.includes("bakery")}
              onChange={handleRegionChange}
              className="mr-2"
            />
            <label htmlFor="bakery">Bakery</label>
          </div>
        </div>

        <label htmlFor="offer" className="font-semibold text-lg">
          Offer
        </label>
        <input
          type="text"
          id="offer"
          value={offer}
          onChange={(e) => setoffer(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-lg w-full text-lg"
          placeholder="15% offer"
        />

        <label htmlFor="image" className="font-semibold text-lg">
          Image
        </label>
        <input
          type="file"
          id="image"
          onChange={handleImageUpload}
          className="w-full"
        />

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-lg w-full mt-4 hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFirm;
