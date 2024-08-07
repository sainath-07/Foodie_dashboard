import React, { useState } from "react";
import { Api_url } from "../../utils/handleApis";

const AddProducts = () => {
  const [productName, setproductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [Image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = (e) => {
    const value = e.target.value === "true";
    setBestSeller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProducts = async (e) => {
    e.preventDefault();
    try {
      const firmId = localStorage.getItem("firmId");
      const loginToken = localStorage.getItem("loginToken");

      if (!firmId || !loginToken) {
        console.log("User is not authenticated");
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("bestSeller", bestSeller);
      formData.append("description", description);
      formData.append("image", Image);
      category.forEach((value) => {
        formData.append("category", value);
      });

      const response = await fetch(`${Api_url}/product/add-product/${firmId}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Product added successfully");
        setproductName("");
        setPrice("");
        setCategory([]);
        setBestSeller(false);
        setImage("");
        setDescription("");
      }
    } catch (error) {
      console.log(error.message);
      alert("failed to add product");
    }
  };

  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontStyle: "normal",
  };
  return (
    <div
      className="mt-4 mx-auto w-[600px] flex justify-center px-8 h-[600px] border-2 border-gray-300 rounded"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <form className="flex flex-col gap-2" onSubmit={handleAddProducts}>
        <h2 className="text-2xl font-bold text-center mt-2" style={poppins}>
          Add Product
        </h2>

        <label
          htmlFor="productName"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          ProductName
        </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setproductName(e.target.value)}
          className="border-2 border-gray-300  rounded text-lg pl-2 p-2 "
          autoComplete="off"
          id="productName"
          name="productName"
          placeholder="ProductName"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        />

        <label
          htmlFor="price"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          className="border-2 border-gray-300 w-[70%] rounded text-lg pl-2 p-2 "
          autoComplete="off"
          onChange={(e) => setPrice(e.target.value)}
          name="price"
          placeholder="Enter price"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        />

        <label
          htmlFor="category"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Category
        </label>
        <div className="flex gap-2 justify-center items-center">
          <div>
            <label htmlFor="veg">Veg</label>
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

        <label
          htmlFor="bestSeller"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          BestSeller
        </label>

        <div className="flex justify-center items-center ">
          <div>
            <label htmlFor="yes">Yes</label>
            <input
              type="radio"
              id="yes"
              name="BestSeller"
              value="true"
              checked={bestSeller === true}
              onChange={handleBestSeller}
              className="h-[25px] w-[25px] m-2"
            />
          </div>
          <div>
            <label htmlFor="no">No</label>
            <input
              type="radio"
              id="no"
              name="BestSeller"
              value="false"
              checked={bestSeller === false}
              onChange={handleBestSeller}
              className="h-[25px] w-[25px] m-2"
            />
          </div>
        </div>

        <label
          htmlFor="description"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          className="border-2 h-12 border-gray-300  rounded text-xl pl-2"
          placeholder="Delicous food and crispy chips"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="mt-3">
          <label
            htmlFor="ProductImage"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            ProductImage :
          </label>
          <input type="file" className="ml-2" onChange={handleImageUpload} />
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-green-500 p-2 px-3 rounded text-white"
            style={poppins}
          >
            save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
