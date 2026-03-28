import React from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRegisterPostMutation } from "../api/Userapi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [registerUser] = useRegisterPostMutation();
      const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    },
    
    
    validate: (values) => {
      const errors = {};

      if (!values.username.trim()) {
        errors.username = "Username is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Invalid email";
      }

      if (!values.password) {
        errors.password = "Password required";
      } else if (values.password.length < 6) {
        errors.password = "Minimum 6 characters";
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log("111111111111",resetForm);
      console.log("222222222222",values);
      
      
      try {
        const formData = {
          username: values.username,
          email: values.email,
          mobile: values.mobile,
          password: values.password
        };
        
        console.log("Form Data being sent:", formData);
        
        const response = await registerUser(formData).unwrap();

    
        
        console.log("Registration response:", response);
        toast.success("Registration Successful 🎉");
        resetForm();
       localStorage.setItem("userEmail", formData.email);
       navigate("/otp");
        
      } catch (error) {
  console.log("FULL ERROR:", error);

  const message =
    error?.data?.message ||   // backend error
    error?.error ||           // network error
    "Registration failed";

  toast.error(message);
} finally {
        setSubmitting(false);
      }
    }
  });

  // Debug: Log when form values change
  console.log("Current form values:", formik.values);
  console.log("Form errors:", formik.errors);
  console.log("Form is valid:", formik.isValid);

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
            <h4 className="fw-bold mb-3">Create Account</h4>
            <p className="text-muted mb-4">Stock Management 📦</p>

            <form onSubmit={formik.handleSubmit}>
              {/* USERNAME */}
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control mb-1 rounded-pill ${
                  formik.touched.username && formik.errors.username ? "is-invalid" : ""
                }`}
                placeholder="Username"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-danger small">{formik.errors.username}</div>
              )}

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control mt-2 mb-1 rounded-pill ${
                  formik.touched.email && formik.errors.email ? "is-invalid" : ""
                }`}
                placeholder="Email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger small">{formik.errors.email}</div>
              )}

              {/* MOBILE */}
              <input
                type="tel"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control mt-2 mb-1 rounded-pill"
                placeholder="Mobile (Optional)"
              />

              {/* PASSWORD */}
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control mt-2 mb-1 rounded-pill ${
                  formik.touched.password && formik.errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger small">{formik.errors.password}</div>
              )}

              {/* CONFIRM PASSWORD */}
              <input
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control mt-2 mb-1 rounded-pill ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Confirm Password"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-danger small">{formik.errors.confirmPassword}</div>
              )}

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn rounded-pill px-4 mt-3"
                style={{
                  background: "#ff6b6b",
                  color: "white"
                }}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Registering..." : "Register"}
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

export default Register;