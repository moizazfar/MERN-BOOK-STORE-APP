import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userVerify } from "../services/Apis";

const OtpEnter = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();

  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      alert("Enter Your OTP");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      alert("Enter Valid OTP");
    } else if (otp.length < 6) {
      alert("OTP length must be at least 6 digits");
    } else {
      const data = {
        otp,
        email: location.state,
      };

      try {
        const response = await userVerify(data);

        if (response.status === 200) {
          localStorage.setItem("userdbtoken", response.data.userToken);
          alert(response.data.message);
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 2000);
        } else {
          alert(response.response.data.error);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while verifying OTP");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Please Enter Your OTP Here</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    type="email"
                    name="otp"
                    id="otp"
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter Your OTP"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={loginUser}
                    className="bg-blue-500 text-white rounded-md px-6 py-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpEnter;
