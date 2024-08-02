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

  return (
    <div
      className="mt-8 mx-auto w-[550px] px-8 h-[550px]"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <form className="flex flex-col gap-2" onSubmit={handleAddProducts}>
        <h2 className="text-2xl font-bold text-center">Add Product</h2>

        <label htmlFor="productName" className="font-semibold">
          ProductName
        </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setproductName(e.target.value)}
          className="border-2 border-gray-300 w-[70%] rounded text-xl pl-2"
          id="productName"
          name="productName"
          placeholder="ProductName"
        />

        <label htmlFor="price" className="font-semibold">
          Price
        </label>
        <input
          type="text"
          id="price"
          value={price}
          className="border-2 border-gray-300 w-[70%] rounded text-xl pl-2"
          onChange={(e) => setPrice(e.target.value)}
          name="price"
          placeholder="Enter price"
        />

        <label htmlFor="category" className="font-semibold">
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

        <label htmlFor="bestSeller" className="font-semibold">
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

        <label htmlFor="description" className="font-semibold">
          Description
        </label>
        <input
          type="text"
          id="description"
          className="border-2 h-12 border-gray-300 w-[90%] rounded text-xl pl-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="mt-3">
          <label htmlFor="ProductImage" className="font-semibold">
            ProductImage
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

export default AddProducts;
