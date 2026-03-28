import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Signup";
import OtpVerify from "../pages/Otp";
import Dashboard from "../section/Dashboard";

const Userroute = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/otp" element={<OtpVerify/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
};

export default Userroute;