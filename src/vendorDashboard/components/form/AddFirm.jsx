import React, { useState } from "react";
import { Api_url } from "../../utils/handleApis";

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
      
      if(firmName==false || firmName=="" ||
         area=="" || area==false ||
         offer=="" || offer==false ||
         category==[] || category=="" || 
         region==[] || region=="" || 
         Image==null || Image==false
        ){
          return alert('Please fill all required fields')
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
        alert("firm added successfully");
        setfirmName("");
        setarea("");
        setoffer("");
        setcategory([]);
        setregion([]);
        setimage(null);
      } else if (data.message == "vendor can have only one firm") {
        alert("vendor can Add only ONE firm (resturant)");
        setfirmName("");
        setarea("");
        setoffer("");
        setcategory([]);
        setregion([]);
        setimage(null);
      }
    } catch (error) {
      console.error(error, "failed to add firm");
    }
  };

  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontStyle: "normal",
  };

  return (
    <div
      className="mt-2 mx-auto w-[620px]  
      border-2 border-gray-300 rounded
      h-[600px] flex justify-center
      "
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <form className="flex flex-col gap-2" onSubmit={handleFirmSubmit}>
        <h2 className="text-2xl font-bold text-center mt-4" style={poppins}>
          Add Firm
        </h2>

        <label
          htmlFor="Firm Name"
          className="font-semibold text-xl"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Firm Name
        </label>
        <input
          type="text"
          value={firmName}
          autoComplete="off"
          onChange={(e) => setfirmName(e.target.value)}
          className="border-2 border-gray-300 p-2 w-[70%] rounded text-xl pl-2"
          id="Firm Name"
          name="firmName"
          placeholder="Firm Name"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        />

        <label
          htmlFor="Area"
          className="font-semibold text-xl"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Area
        </label>
        <input
          type="text"
          value={area}
          id="Area"
          autoComplete="off"
          onChange={(e) => setarea(e.target.value)}
          className="border-2 border-gray-300 p-2 w-[70%] rounded text-xl pl-2"
          name="area"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
          placeholder="Enter area"
        />

        <label
          htmlFor="category"
          className="font-semibold text-xl"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Category
        </label>
        <div className="flex justify-center gap-8">
          <div>
            <label htmlFor="veg" style={poppins}>
              veg
            </label>
            <input
              type="checkbox"
              id="veg"
              checked={category.includes("veg")}
              value="veg"
              onChange={handleCategoryChange}
              className="h-[25px] w-[25px] m-2"
            />
          </div>
          <div>
            <label htmlFor="Non-veg" style={poppins}>
              Non-veg
            </label>
            <input
              type="checkbox"
              id="Non-veg"
              checked={category.includes("Non-veg")}
              value="Non-veg"
              onChange={handleCategoryChange}
              className="h-[25px] w-[25px] m-2"
            />
          </div>
        </div>

        <label
          htmlFor="Region"
          className="font-semibold text-xl"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Region
        </label>

        <div className="flex justify-center gap-3">
          <div>
            <label htmlFor="South-Indian" style={poppins}>
              South-Indian
            </label>
            <input
              type="checkbox"
              id="South-Indian"
              value="South-Indian"
              checked={region.includes("South-Indian")}
              onChange={handleRegionChange}
              className="h-[25px] w-[25px] m-2"
            />
          </div>
          <div>
            <label htmlFor="North-Indian" style={poppins}>
              North-Indian
            </label>
            <input
              type="checkbox"
              id="North-Indian"
              value="North-Indian"
              checked={region.includes("North-Indian")}
              onChange={handleRegionChange}
              className="h-[25px] w-[25px] m-2"
            />
          </div>
          <div>
            <label htmlFor="chinese" style={poppins}>
              chinese
            </label>
            <input
              type="checkbox"
              id="chinese"
              value="chinese"
              checked={region.includes("chinese")}
              onChange={handleRegionChange}
              className="h-[25px] w-[25px] m-2"
            />
          </div>
          <div>
            <label htmlFor="bakery" style={poppins}>
              bakery
            </label>
            <input
              type="checkbox"
              id="bakery"
              value="bakery"
              checked={region.includes("bakery")}
              onChange={handleRegionChange}
              className="h-[25px] w-[25px] m-2"
            />
          </div>
        </div>

        <label
          htmlFor="offer"
          className="font-semibold text-xl mt-2"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Offer :
          <input
            type="text"
            id="offer"
            value={offer}
            onChange={(e) => setoffer(e.target.value)}
            name="offer"
            className="border-2 ml-4 border-gray-300 p-2 w-[70%] rounded text-xl pl-2
         "
            placeholder="15% offer "
            autoComplete="off"
          />
        </label>

        <div className="mt-3">
          <label
            htmlFor="firmimage"
            className="font-semibold text-xl mr-4"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            Image:
          </label>
          <input type="file" onChange={handleImageUpload} />
        </div>

        <div className="text-center mt-2">
          <button
            type="submit"
            className="bg-green-500 p-2 px-3 rounded text-white"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
