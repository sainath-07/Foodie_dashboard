import React, { useState } from "react";
import { Api_url } from "../../utils/handleApis";
import toast from "react-hot-toast";

const VendorLogin = ({ handleAddFirm, handleAddProducts }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast('Please fill all fields to login successfully',
          {
            icon: '🙎🏼',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        
        return;
      }

      const response = await fetch(`${Api_url}/vendor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("firmId", data.vendor.firm);
        localStorage.setItem("vendorId", data.vendor._id);
        localStorage.setItem("loginToken", data.token);
        toast.success('Login successfull!')
        setEmail("");
        setPassword("");
        window.location.reload();
      } else if (data.error) {
        toast(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontStyle: "normal",
  };

  return (
    <div className="flex items-center justify-center w-full bg-gray-100 p-4 mt-24">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full sm:max-w-md  md:max-w-md lg:max-w-lg">
        <h2  style={poppins} className="text-2xl  font-bold mb-6 text-center text-gray-800">
          Vendor Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label  style={poppins} htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full text-sm p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="off"
              style={poppins}
              />
          </div>
          <div>
            <label  style={poppins} htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={poppins}
            />
          </div>
          <button
            type="submit"  style={poppins}
            className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorLogin;
