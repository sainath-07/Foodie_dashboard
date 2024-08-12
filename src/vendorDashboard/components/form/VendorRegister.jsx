import React, { useState } from "react";
import { Api_url } from "../../utils/handleApis";
import toast from "react-hot-toast";

const VendorRegister = ({ handleVendorLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username || !email || !password) {
        toast('Please fill all the fields to register successfully',
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
      const response = await fetch(`${Api_url}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Registered successfully")
        setUsername("");
        setEmail("");
        setPassword("");
        handleVendorLogin();
      } else if (data.message) {
        toast(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontStyle: "normal",
  };

  return (
    <div className="flex items-center justify-center p-4 w-full bg-gray-100 mt-24">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-sm lg:max-w-lg ">
        <h3 style={poppins} className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Vendor Register
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username" style={poppins}
              className="block text-sm md:text-base font-medium text-gray-700 mb-1"
            >
              Username <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username} style={poppins}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="email" style={poppins}
              className="block text-sm md:text-base font-medium text-gray-700 mb-1"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email} style={poppins}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="password" style={poppins}
              className="block text-sm md:text-base font-medium text-gray-700 mb-1"
            >
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password" style={poppins}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoComplete="off"
            />
          </div>
          <button
            type="submit" style={poppins}
            className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorRegister;
