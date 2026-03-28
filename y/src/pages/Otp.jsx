import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useResendOtpMutation, useVerifyOtpMutation } from "../api/Userapi";
import { toast } from "react-toastify";

const OtpVerify = () => {

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate()
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation()
  
  // ⏱ TIMER LOGIC (60 → 0)
  useEffect(() => {
    if (timer === 0) {
      setExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    try {
      if (expired) {
        alert("OTP expired. Please resend.");
        return;
      }

      if (otp.length !== 4) {
        alert("Enter valid OTP");
        return;
      }

      const email = localStorage.getItem("userEmail");

      const res = await verifyOtp({ email, otp }).unwrap();

       toast.success(res.message);

      // 🚀 GO TO DASHBOARD
      navigate("/dashboard");

    } catch (err) {
      toast.error(err?.data?.message || "Verification failed");
    }
  };

   
  const handleResend = async () => {
  try {
    const email = localStorage.getItem("userEmail");

    const res = await resendOtp({ email }).unwrap();

     toast.success(res.message);

    // restart timer
    setTimer(60);
    setExpired(false);

  } catch (err) {
     toast.error(err?.data?.message || "Failed to resend OTP");
  }
};

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center position-relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#f6d365,#fda085)" }}
    >

      {/* FLOATING BALLS */}
      <Ball size={140} color="#ff6b6b" top="8%" left="10%" />
      <Ball size={100} color="#ffd93d" top="75%" left="18%" />
      <Ball size={120} color="#6bcB77" top="55%" left="80%" />
      <Ball size={80} color="#4d96ff" top="18%" left="75%" />
      <Ball size={60} color="#ff9f1c" top="85%" left="60%" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="p-5 shadow-lg text-center"
        style={{
          width: "420px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.8)"
        }}
      >
        <h3 className="fw-bold mb-3">Verify OTP 🔐</h3>
        <p className="text-muted">Enter the OTP sent to your email</p>

        {/* OTP INPUT */}
        <input
          type="text"
          maxLength="4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="form-control text-center fs-3 mt-3 rounded-pill"
          placeholder="----"
        />

        {/* TIMER */}
        <p className="mt-3">
          {expired ? (
            <span className="text-danger fw-bold">OTP Expired</span>
          ) : (
            <span className="fw-bold">Time Left: 00:{timer}</span>
          )}
        </p>

        {/* VERIFY BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleVerify}
          className="btn mt-2 rounded-pill px-4"
          style={{ background: "#ff6b6b", color: "white" }}
        >
          Verify OTP
        </motion.button>

        {/* RESEND */}
        <p className="mt-3">
  Didn't receive OTP?{" "}
  <button
    onClick={handleResend}
    disabled={!expired}
    style={{
      background: "none",
      border: "none",
      color: expired ? "#ff6b6b" : "gray",
      fontWeight: "600",
      cursor: expired ? "pointer" : "not-allowed",
      textDecoration: "underline"
    }}
  >
    {expired ? "Resend OTP" : `Resend in 00:${timer}`}
  </button>
</p>
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

export default OtpVerify;