import React, { useContext, useEffect, useState } from "react";
import { Api_url } from "../utils/handleApis";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import clsx from "clsx";
import { data } from "../../App";
import toast from "react-hot-toast";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { isSidemenuopen, setsidemenu } = useContext(data);

  useEffect(() => {
    getSingleVendor();
  }, []);

  const vendorId = localStorage.getItem("vendorId");

  const getSingleVendor = async () => {
    try {
      const response = await axios.get(
        `${Api_url}/vendor/singleVendorbyid/${vendorId}`
      );
      if (response.status >= 200 && response.status <= 299) {
        setUserDetails(response.data.vendor);
      } else {
        toast.error("Try again. No response from server.");
      }
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      toast.error("Add Firm to view User details...!");
    } finally {
      setLoading(false);
    }
  };

  const { email, username, firm, _id } = userDetails;
  const { firmName, area, offer, region = [], category = [] } = firm || {};
  localStorage.setItem("firmName", firmName);
  return (
    <>
      <div
        className={clsx(
          "text-center ml-4 w-[75%] flex flex-col items-center ",
          isSidemenuopen && "relative -z-10"
        )}
      >
        {loading ? (
          <>
            <p className="flex justify-center ">
              <SyncLoader color="#36d7b7" />
            </p>
          </>
        ) : (
          <>
            <div className="flex w-full">
              <p
                className="text-2xl m-6"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontStyle: "normal",
                }}
              >
                User details :
              </p>
            </div>

            <div className="overflow-auto w-full">
              <table className="mt-4 w-full ">
                <thead>
                  <tr>
                    <th className="text-white bg-black text-xl p-2">
                      Email Id
                    </th>
                    <th className="text-white bg-black text-xl p-2">
                      Username
                    </th>
                    <th className="text-white bg-black text-xl p-2">UserId</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="text-lg p-4 bg-gray-200"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 300,
                        fontStyle: "normal",
                      }}
                    >
                      {email}
                    </td>
                    <td
                      className="text-lg p-4 bg-gray-200"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 300,
                        fontStyle: "normal",
                      }}
                    >
                      {username}
                    </td>
                    <td
                      className="text-lg p-4 bg-gray-200"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 300,
                        fontStyle: "normal",
                      }}
                    >
                      {_id}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex w-full">
              <p
                className="text-2xl m-6"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontStyle: "normal",
                }}
              >
                Firm details :
              </p>
            </div>
            {firm && (
              <div className="overflow-auto w-full">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-white bg-black text-xl p-2 w-[20%]">
                        Firm Name
                      </th>
                      <th className="text-white bg-black text-xl p-2">Area</th>
                      <th className="text-white bg-black text-xl p-2">Offer</th>
                      <th className="text-white bg-black text-xl p-2">
                        Category
                      </th>
                      <th className="text-white bg-black text-xl p-2">
                        Region
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        className="text-xl p-4 bg-gray-200"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 300,
                          fontStyle: "normal",
                        }}
                      >
                        {firmName}
                      </td>
                      <td
                        className="text-xl p-4 bg-gray-200"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 300,
                          fontStyle: "normal",
                        }}
                      >
                        {area}
                      </td>
                      <td
                        className="text-xl p-4 w-[20%]  bg-gray-200"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 300,
                          fontStyle: "normal",
                        }}
                      >
                        {offer}
                      </td>
                      <td
                        className="text-lg p-4 bg-gray-200 w-[20%]"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 300,
                          fontStyle: "normal",
                        }}
                      >
                        {category.map((value, index) => (
                          <p key={index}>{value}</p>
                        ))}
                      </td>
                      <td
                        className="text-lg p-4 bg-gray-200 w-[80%]"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 300,
                          fontStyle: "normal",
                        }}
                      >
                        {region.map((value, index) => (
                          <p key={index}>{value}</p>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserDetails;
