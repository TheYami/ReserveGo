import { useState } from "react";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side - Welcome Message */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-orange-400 to-red-500 text-white p-10">
        <h1 className="text-4xl font-bold">Welcome to ReserveGo!</h1>
        <p className="mt-4 text-lg">Reserve your table in seconds and enjoy exclusive deals.</p>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10 shadow-md">
        <h2 className="text-3xl font-semibold mb-6">
          {isRegister ? "Create an Account" : "Login to Your Account"}
        </h2>

        <form className="w-full max-w-sm">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <p className="mt-4 text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)} className="text-orange-500 font-semibold">
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
