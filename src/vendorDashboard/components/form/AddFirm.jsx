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
    } 
    else {
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

 

  const handleImageUpload =(event)=>{
    const selectedImage = event.target.files[0];
    // console.log( event.target.files[0].name , 'image event')
    // console.log( event.target.files , 'image event with out 0')
    setimage(selectedImage)
}

// console.log(Image.name,'Image')


  const handleFirmSubmit = async (e) => {
    e.preventDefault();

    try {
      const getToken = localStorage.getItem("loginToken");
      if (!getToken) {
        console.log("Token not found");
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
          'token': `${getToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data,'data');
        alert("firm added successfully");
        setfirmName("");
        setarea("");
        setoffer("");
        setcategory([]);
        setregion([]);
        setimage(null);
        const firmId=data.firmId
        localStorage.setItem('firmId',firmId)
      }
      else if(data.message=="vendor can have only one firm"){
          alert('firm exists , One vendor can add only one firm')
      }
      else{
        alert('something wentWrong , could not add firm try again...')
      }
    } catch (error) {
      console.error(error, "failed to add firm");
    }
  };

  return (
    <div
      className="mt-8 mx-auto w-[550px] px-8 h-[550px]"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <form className="flex flex-col gap-2" onSubmit={handleFirmSubmit}>
        <h2 className="text-2xl font-bold text-center">Add Firm</h2>

        <label htmlFor="Firm Name" className="font-semibold">
          Firm Name
        </label>
        <input
          type="text"
          value={firmName}
          onChange={(e) => setfirmName(e.target.value)}
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
          value={area}
          id="Area"
          onChange={(e) => setarea(e.target.value)}
          className="border-2 border-gray-300 w-[70%] rounded text-xl pl-2"
          name="area"
          placeholder="Enter area"
        />

        <label htmlFor="category" className="font-semibold">
          category
        </label>
        <div className="flex gap-2 justify-center items-center">
          <div>
            <label htmlFor="veg">veg</label>
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
            <label htmlFor="Non-veg">Non-veg</label>
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

        <label htmlFor="Region" className="font-semibold">
          Region
        </label>

        <div className="flex justify-center items-center ">
          <div>
            <label htmlFor="South-Indian">South-Indian</label>
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
            <label htmlFor="North-Indian">North-Indian</label>
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
            <label htmlFor="chinese">chinese</label>
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
            <label htmlFor="bakery">bakery</label>
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

        <label htmlFor="offer">Offer</label>
        <input
          type="text"
          id="offer"
          value={offer}
          onChange={(e) => setoffer(e.target.value)}
          name="offer"
          className="border-2 border-gray-300 w-[70%] rounded text-xl pl-2"
        />

        <div className="mt-3">
          <label htmlFor="firmimage" className="font-semibold mr-4">
            FirmImage:
          </label>
          <input type="file" onChange={handleImageUpload} />
        </div>

        <div className="text-center mt-2">
          <button
            type="submit"
            className="bg-black p-2 px-3 rounded text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
