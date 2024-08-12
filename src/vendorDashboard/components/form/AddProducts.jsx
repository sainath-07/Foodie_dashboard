import React, { useState } from "react";
import { Api_url } from "../../utils/handleApis";
import toast from "react-hot-toast";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [Image, setImage] = useState(null);
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

      if (
        !firmId ||
        !loginToken ||
        !productName ||
        !price ||
        !category ||
        !bestSeller ||
        !Image ||
        !description
      ) {
        toast("Please fill all the fields to register successfully", {
          icon: "🙎🏼",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        return;
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
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Product added successfully");
        setProductName("");
        setPrice("");
        setCategory([]);
        setBestSeller(false);
        setImage(null);
        setDescription("");
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Failed to add product. Try again");
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-lg bg-white  w-[95%] mt-24 rounded-lg shadow-lg">
      <form className="flex flex-col gap-4 p-4" onSubmit={handleAddProducts}>
        <h2 className="text-2xl font-bold text-center">Add Product</h2>

        <label htmlFor="productName" className="font-semibold text-lg">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border-2 border-gray-300 rounded-lg text-lg p-2 w-full"
          placeholder="Product Name"
        />

        <label htmlFor="price" className="font-semibold text-lg">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border-2 border-gray-300 rounded-lg text-lg p-2 w-full"
          placeholder="Enter price"
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

        <label htmlFor="bestSeller" className="font-semibold text-lg">
          Best Seller
        </label>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="yes"
              name="bestSeller"
              value="true"
              checked={bestSeller === true}
              onChange={handleBestSeller}
              className="mr-2"
            />
            <label htmlFor="yes">Yes</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="no"
              name="bestSeller"
              value="false"
              checked={bestSeller === false}
              onChange={handleBestSeller}
              className="mr-2"
            />
            <label htmlFor="no">No</label>
          </div>
        </div>

        <label htmlFor="description" className="font-semibold text-lg">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 border-gray-300 rounded-lg text-lg p-2 w-full"
          placeholder="Delicious food and crispy chips"
        />

        <div className="mt-4">
          <label htmlFor="image" className="font-semibold text-lg">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            className="w-full mt-2"
          />
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-green-500 text-white p-2 px-4 rounded-lg hover:bg-green-600"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
