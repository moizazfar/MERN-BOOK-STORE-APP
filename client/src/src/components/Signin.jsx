import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { loginfunction } from "../services/Apis";
import googleLogo from "../assets/google-logo.svg";
import { Spinner } from "flowbite-react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spiner, setSpiner] = useState(false);

  const navigate = useNavigate();

  // sendotp
  //
  // const sendOtp = async (e) => {
  //   e.preventDefault();

  //   if (email === "") {
  //     alert("Enter Your Email!");
  //   } else if (!email.includes("@")) {
  //     alert("Enter Valid Email!");
  //   } else {
  //     setSpiner(true);

  //     const data = {
  //       email: email,
  //     };

  //     try {
  //       const response = await sentOtpFunction(data);

  //       if (response.status === 200) {
  //         setSpiner(false);
  //         navigate("/otp", { state: email });
  //       } else {
  //         alert(response.response.data.error);
  //         setSpiner(false);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert("An error occurred while sending OTP");
  //       setSpiner(false);
  //     }
  //   }
  // };

  const loginUser = async (e) => {
    e.preventDefault();

    if (email === "") {
      alert("Enter Your Email!");
    } else if (!email.includes("@")) {
      alert("Enter Valid Email!");
    } else {
      setSpiner(true);

      const data = {
        email: email,
        password: password,
      };

      try {
        console.log(data);
        const response = await loginfunction(data);

        if (response.data.status === true) {
          setSpiner(false);

          if (response.data.data.userType == "admin") {
            alert("Admin Logged-In Successfully!");
            navigate("/admin/dashboard");
          } else if (response.data.data.userType == "user") {
            alert("User Logged-In Successfully!");
            navigate("/user/dashboard");
          } else {
            alert(response.data.message);
            navigate("/");
          }
        } else if (response.data.status === false) {
          setSpiner(false);
          alert(response.data.message);

          //navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending OTP");
        setSpiner(false);
      }
    }
  };

  // signup with google
  const handleRegister = () => {};

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Sign In Form</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email Address"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  />
                </div>

                <p>
                  Don't have an account{" "}
                  <Link to="/sign-up" className="text-blue-600">
                    Sign up
                  </Link>
                </p>
                <div className="relative">
                  <button
                    onClick={loginUser}
                    className="bg-blue-500 text-white rounded-md px-6 py-2"
                  >
                    Sign In
                    {spiner ? (
                      <span>
                        <Spinner animation="border" />
                      </span>
                    ) : (
                      ""
                    )}
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex w-full items-center flex-col mt-5 gap-3">
              <button onClick={handleRegister} className="block">
                <img
                  src={googleLogo}
                  alt=""
                  className="w-12 h-12 inline-block"
                />
                Login With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
