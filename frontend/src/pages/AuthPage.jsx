import { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "customer",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleRole = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isRegister && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
  
    try {
      const currentTime = new Date().toISOString();
      const endpoint = isRegister
        ? "http://localhost:8080/auth/register"
        : "http://localhost:8080/auth/login";
  
      const payload = isRegister
        ? {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            password: formData.password,
            createdAt: currentTime,
            updatedAt: currentTime,
          }
        : {
            email: formData.email,
            password: formData.password,
          };
  
      const res = await axios.post(endpoint, payload);
      const data = res.data;
  
      setMessage(data.message);
  
      if (isRegister) {
        setIsRegister(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          role: "customer",
          password: "",
          confirmPassword: "",
        });
      } else {
        // 🧠 หลังจาก login สำเร็จ
        const userRole = data.user?.role || "customer"; // สมมุติว่า backend ส่ง user.role กลับมา
  
        // 🔀 เปลี่ยนหน้า
        if (userRole === "customer") {
          navigate("/customerPage");
        } else if (userRole === "merchant") {
          navigate("/merchantPage");
        } else {
          setMessage("Unknown role. Cannot redirect.");
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Welcome Section */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold">Welcome to ReserveGo!</h1>
          <p className="mt-4 text-lg opacity-90">Reserve your table in seconds and enjoy exclusive deals.</p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10 shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {isRegister ? "Create an Account" : "Login to Your Account"}
        </h2>

        <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={handleChange}
            required
            value={formData.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={handleChange}
            required
            value={formData.password}
          />

          {isRegister && (
            <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={handleChange}
              required
            />

             {/* Role Toggle Button */}
           <div className="flex justify-center gap-4">
           <button
             type="button"
             className={`px-5 py-2 rounded-full text-white font-semibold transition cursor-pointer ${
               formData.role === "customer" ? "bg-orange-500" : "bg-gray-300"
             }`}
             onClick={() => toggleRole("customer")}
           >
             ลูกค้า
           </button>
           <button
             type="button"
             className={`px-5 py-2 rounded-full text-white font-semibold transition cursor-pointer ${
               formData.role === "merchant" ? "bg-orange-500" : "bg-gray-300"
             }`}
             onClick={() => toggleRole("merchant")}
           >
             ร้านค้า
           </button>
         </div>
         </>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition cursor-pointer"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-red-500 text-center">{message}</p>}

        <p className="mt-4 text-sm text-center">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)} className="text-orange-500 font-semibold cursor-pointer">
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
