import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    let error = "";

    if (name === "email") {
      if (!value) error = "Email is required";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length === 0) {
      alert("Login Successful ✅");
      console.log(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f6d365, #fda085)"
      }}
    >
      {/* FLOATING BALLS */}
      <Ball size={140} color="#ff6b6b" top="8%" left="10%" />
      <Ball size={100} color="#ffd93d" top="75%" left="18%" />
      <Ball size={120} color="#6bcB77" top="55%" left="80%" />
      <Ball size={80} color="#4d96ff" top="18%" left="75%" />
      <Ball size={60} color="#ff9f1c" top="85%" left="60%" />

      {/* CARD */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="p-4 shadow-lg"
        style={{
          width: "850px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.75)"
        }}
      >
        <div className="row">
          {/* FORM */}
          <div className="col-md-7 p-4">
            <h4 className="fw-bold mb-3">Welcome Back</h4>
            <p className="text-muted mb-4">Login to your account 🔐</p>

            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control mb-1 rounded-pill ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="Email"
              />
              <div className="text-danger small">{errors.email}</div>

              {/* PASSWORD */}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control mt-2 mb-1 rounded-pill ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
              />
              <div className="text-danger small">{errors.password}</div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="btn rounded-pill px-4 mt-3"
                style={{
                  background: "#ff6b6b",
                  color: "white"
                }}
              >
                Login
              </motion.button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-5 d-flex align-items-center justify-content-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              style={{
                width: "100%",
                height: "260px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #f6d365, #fda085)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "600"
              }}
            >
              Stock System 📊
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* FLOATING BALL COMPONENT */
const Ball = ({ size, color, top, left }) => (
  <motion.div
    animate={{ y: [0, -25, 0] }}
    transition={{ repeat: Infinity, duration: 5 }}
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      top: top,
      left: left,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    }}
  />
);

export default Login;