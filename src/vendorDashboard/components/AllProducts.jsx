import React, { useContext, useEffect, useState } from "react";
import { Api_url } from "../utils/handleApis";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";
import clsx from "clsx";
import { data } from "../../App";


const AllProducts = () => {
  const [products, setproducts] = useState([]);
  const {  isSidemenuopen,
    setsidemenu,}=useContext(data)

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
      toast.error("failed to fetch products ");
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
        toast.success("Product deleted successfully");
      } else {
        toast.error("product is not deleted successfully");
      }
    } catch (error) {
      console.log(error.message, "error message handleDeleteButton");
      toast.error("Something went wrong: " + error.message);
    }
  };

  let Poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
  };

  let filterstyling = {
    borderRadius: "15px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    color: "gray",
    fontStyle: "normal",
    padding: "5px 8px",
    border: "1px solid rgba(2, 6, 12, 0.15)",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  };

  return (
    <>
      <div className="overflow-auto md:w-full px-2 flex md:justify-center mx-auto mt-24">
        {Array.isArray(products) && products.length > 0 ? (
          <>
            <table className="border-r-2 border-l-2 border-b-2 border-collapse border-slate-600  mt-8">
              <thead>
                <tr className="bg-black text-white text-sm">
                  <th style={Poppins} className="p-3 md:text-lg">
                    Product Id
                  </th>
                  <th style={Poppins} className="p-2 md:text-lg lg:text-xl">
                    Product Name
                  </th>
                  <th style={Poppins} className="p-3 md:text-lg lg:text-xl">
                    Price
                  </th>
                  <th style={Poppins} className="p-3 md:text-lg lg:text-xl">
                    Image
                  </th>
                  <th style={Poppins} className="p-3 md:text-lg lg:text-xl">
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
                          className="border-2 font-semibold border-slate-600 text-center text-base md:text-lg md:px-2 lg:text-xl "
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 400,
                            fontStyle: "normal",
                          }}
                        >
                          {_id}
                        </td>
                        <td
                          className="border-2 md:text-lg md:px-2 lg:text-xl  font-bold text-lg text-orange-500 border-slate-600 text-center"
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 400,
                            fontStyle: "normal",
                          }}
                        >
                          {productName}
                        </td>
                        <td
                          className="border-2 md:text-lg md:px-2 lg:text-xl  font-semibold border-slate-600 text-center text-xl"
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 500,
                            fontStyle: "normal",
                          }}
                        >
                          &#8377;{price}
                        </td>
                        <td className=" flex  md:text-lg md:px-2 lg:text-xl  w-32 justify-center">
                          {image && (
                            <img
                              src={`${Api_url}/uploads/${image}`}
                              alt={productName}
                              className="w-full object-cover"
                            />
                          )}
                        </td>
                        <td className="border-2 md:text-lg md:px-2 lg:text-xl  border-slate-600 text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteButton(_id, setproducts)}
                            className=""
                            style={filterstyling}
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
          <div

          className={clsx("w-[80vw] h-[80vh] flex justify-center flex-col items-center text-2xl",
            isSidemenuopen && 'relative -z-10'
          )

          }
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontStyle: "normal",
            }}
          >
            <SyncLoader color="#3ad717" />
            <p>No products,Please click on Add products </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
