import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerfunction } from "../services/Apis";
import googleLogo from "../assets/google-logo.svg";
import { register } from "../api/auth";

const Signup = () => {
  const [inputdata, setInputdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const { name, email, password } = inputdata;

  //   if (name === "" && email === "" && password === "") {
  //     alert("Enter all required details..");
  //   } else if (name === "") {
  //     alert("Enter Your Name");
  //   } else if (email === "") {
  //     alert("Enter Your Email");
  //   } else if (!email.includes("@")) {
  //     alert("Enter Valid Email");
  //   } else if (password === "") {
  //     alert("Enter Your Password");
  //   } else if (password.length < 6) {
  //     alert("Password length must be at least 6 characters");
  //   } else {
  //     try {
  //       const response = await registerfunction(inputdata);

  //       if (response.status === 200) {
  //         setInputdata({ ...inputdata, name: "", email: "", password: "" });
  //         navigate("/sign-in");
  //       } else {
  //         alert(response.response.data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert("An error occurred during registration");
  //     }
  //   }
  // };

  // signup with google

  const handleRegister = async () => {
    if (!inputdata.email || !inputdata.password || !inputdata.name) {
      alert("Please fill all fields");
    }

    const payload = {
      fullName: inputdata.name,
      email: inputdata.email,
      password: inputdata.password,
    };

    try {
      const response = await register(payload);
      if (response.success) {
        alert(response.message || "Signup in Successful");
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Sign Up Form</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    placeholder="Enter Your Email Address"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  />
                </div>
                <div className="relative">
                  <input
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                  />
                </div>
                <p>
                  If you have an account . Please{" "}
                  <Link to="/sign-in" className="text-blue-600">
                    Login
                  </Link>{" "}
                  Here
                </p>
                <div className="relative">
                  <button
                    onClick={handleRegister}
                    className="bg-blue-500 text-white rounded-md px-6 py-2"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>

            <hr />
            <div className="flex w-full items-center flex-col mt-5 gap-3">
              {/* <button onClick={handleRegister} className="block">
                <img
                  src={googleLogo}
                  alt=""
                  className="w-12 h-12 inline-block"
                />
                Login With Google
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
