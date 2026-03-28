import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  return (
    <div
      className="vh-100 d-flex position-relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#f6d365,#fda085)" }}
    >
      {/* FLOATING BALLS (same theme) */}
      <Ball size={140} color="#ff6b6b" top="8%" left="10%" />
      <Ball size={100} color="#ffd93d" top="75%" left="18%" />
      <Ball size={120} color="#6bcB77" top="55%" left="80%" />
      <Ball size={80} color="#4d96ff" top="18%" left="75%" />

      {/* SIDEBAR */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="p-4 text-white"
        style={{
          width: "250px",
          backdropFilter: "blur(15px)",
          background: "rgba(0,0,0,0.35)"
        }}
      >
        <h3 className="mb-4">📦 Stock</h3>

        <p className="sidebar-item">Dashboard</p>
        <p className="sidebar-item">Products</p>
        <p className="sidebar-item">Orders</p>
        <p className="sidebar-item">Users</p>

        <button className="btn btn-light mt-4 w-100 rounded-pill">
          Logout
        </button>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-4 shadow-lg"
          style={{
            width: "80%",
            borderRadius: "20px",
            backdropFilter: "blur(15px)",
            background: "rgba(255,255,255,0.85)"
          }}
        >
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold">Product List</h3>

            <button
              className="btn rounded-pill px-4"
              style={{ background: "#ff6b6b", color: "white" }}
            >
              + Add Product
            </button>
          </div>

          {/* TABLE */}
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Apple Watch</td>
                <td>₹25000</td>
                <td>20</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2 rounded-pill">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger rounded-pill">
                    Delete
                  </button>
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>Rolex</td>
                <td>₹85000</td>
                <td>10</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2 rounded-pill">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger rounded-pill">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

/* FLOATING BALL */
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

export default Dashboard;