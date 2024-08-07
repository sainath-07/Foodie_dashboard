import React, { useEffect, useState } from "react";
import { Api_url } from "../utils/handleApis";

const AllProducts = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    fetchApi(setproducts);
  }, []);

  // AllProducts logic
  const fetchApi = async (setproducts) => {
    const getfirmId = localStorage.getItem("firmId");
    // console.log(getfirmId, "getfirmId");

    try {
      const response = await fetch(`${Api_url}/product/${getfirmId}`);
      const responseData = await response.json();
      // console.log(response, "response ok");
      setproducts(responseData.products);
    } catch (error) {
      alert("failed to fetch products ");
      console.log(error, "error form All product component");
    }
  };

  // DeleteProducts logic
  const handleDeleteButton = async (productID, setproducts) => {
    try {
      console.log(productID, "productID");
      const response = await fetch(`${Api_url}/product/${productID}`, {
        method: "DELETE",
      });

      console.log(response.status, "Response Status");
      const data = await response.text();
      console.log(data, "Response Text");

      if (response.ok) {
        fetchApi(setproducts);
        alert("Product deleted successfully");
      } else {
        alert("product is not deleted successfully");
      }
    } catch (error) {
      console.log(error.message, "error message handleDeleteButton");
      alert("Something went wrong: " + error.message);
    }
  };

  let Poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
  };

  return (
    <>
      <div>
        {Array.isArray(products) && products.length > 0 ? (
          <>
            <table className="border-r-2 border-l-2 border-b-2 border-collapse border-slate-600 w-[70vw] mt-8 ml-24">
              <thead>
                <tr className="bg-black text-white text-xl">
                  <th style={Poppins} className="p-3">
                    Product Id
                  </th>
                  <th style={Poppins} className="p-3">
                    Product Name
                  </th>
                  <th style={Poppins} className="p-3">
                    Price
                  </th>
                  <th style={Poppins} className="p-3">
                    Image
                  </th>
                  <th style={Poppins} className="p-3">
                    Delete_Product
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((ele, index) => {
                  const {
                    _id,
                    productName,
                    category,
                    bestSeller,
                    description,
                    image,
                    price,
                  } = ele;
                  return (
                    <React.Fragment key={index}>
                      <tr className="w-28">
                        <td
                          className="border-2 font-semibold border-slate-600 text-center text-base"
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            fontStyle: "normal",
                          }}
                        >
                          {_id}
                        </td>
                        <td
                          className="border-2 font-bold text-xl text-orange-500 border-slate-600 text-center"
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            fontStyle: "normal",
                          }}
                        >
                          {productName}
                        </td>
                        <td
                          className="border-2 font-semibold border-slate-600 text-center text-xl"
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 500,
                            fontStyle: "normal",
                          }}
                        >
                          &#8377;{price}
                        </td>
                        <td className=" flex justify-center p-4">
                          {image && (
                            <img
                              src={`${Api_url}/uploads/${image}`}
                              alt={productName}
                              className="w-32"
                            />
                          )}
                        </td>
                        <td className="border-2 border-slate-600 text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteButton(_id, setproducts)}
                            className=" p-2 rounded m-2 text-xl bg-red-500 text-white border-gray-300"
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 400,
                              fontStyle: "normal",
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <div className="w-[80vw] h-[80vh] flex justify-center items-center text-2xl" style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
          }}>
            <p>No products,Please click on Add products </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
