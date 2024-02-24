import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { userVerify } from "../services/Apis";

const Otp = () => {
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
            navigate("/");
          }, 5000);
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
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Please Enter Your OTP Here</h1>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                name="otp"
                id=""
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Your OTP"
              />
            </div>
            <button className="btn" onClick={loginUser}>
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Otp;
