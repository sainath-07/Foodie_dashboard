import React, { useEffect, useState } from "react";
import { Api_url } from "../utils/handleApis";

const AllProducts = () => {
  const [products, setproducts] = useState([]);

  const fetchApi = async () => {
    const getfirmId = localStorage.getItem("firmId");

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

  useEffect(() => {
    fetchApi();
  }, []);

  const handleDeleteButton = async (productID, productName) => {

    const confirmDelete = window.confirm(`Are you sure you want to delete ${productName}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${Api_url}/product/${productID}`, {
        method: "DELETE",
      });
      console.log(response, "response");
      console.log('after response')
      if (response.ok) {
        const filteredProducts = products.filter((product) => product._id !== productID);
        alert(`${productName} deleted successfully`);
        setproducts(filteredProducts);
      } else {
        const errorData = await response.json();
        console.error("Failed to delete product", errorData);
        alert("Something went wrong, product is not deleted");
      }
    } catch (error) {
      console.error("Failed to delete product");
      alert("some thing went wrong product is not deleted");
    }
  };

  return (
    <>
      <div>
        {products.length==""? (
          <div>No products in the cart</div>
        ) : (
          <>
            <table className=" border-2 border-collapse border-slate-600 w-[70vw] mt-8 ml-24">
              <thead>
                <tr>
                  <th className="border-2 border-slate-600">Product Id</th>
                  <th className="border-2 border-slate-600">Product Name</th>
                  <th className="border-2 border-slate-600">Price</th>
                  <th className="border-2 border-slate-600">Image</th>
                  <th className="border-2 border-slate-600">Delete</th>
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
                        <td className="border-2 font-semibold border-slate-600 text-center">
                          {_id}
                        </td>
                        <td className="border-2 font-bold text-xl text-red-600 border-slate-600 text-center">
                          {productName}
                        </td>
                        <td className="border-2 font-semibold border-slate-600 text-center">
                        &#8377;{price}
                        </td>
                        <td className=" flex justify-center">
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
                            onClick={() =>
                              handleDeleteButton(ele._id, productName)
                            }
                            className="bg-black p-1 rounded m-2 text-white "
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
        )}
      </div>
    </>
  );
};

export default AllProducts;
