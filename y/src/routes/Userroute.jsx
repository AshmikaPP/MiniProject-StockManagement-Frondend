import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Signup";

const Userroute = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
    </Routes>
  );
};

export default Userroute;