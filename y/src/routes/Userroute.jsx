import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Signup";
import OtpVerify from "../pages/Otp";

const Userroute = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/otp" element={<OtpVerify/>}/>
    </Routes>
  );
};

export default Userroute;