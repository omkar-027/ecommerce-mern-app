import API from "../services/api";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const res = await API.get(
        "/api/orders/all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setOrders(res.data || []);

    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {

      await API.put(
        `/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Status updated");
      fetchOrders();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>📦 All Orders (Admin)</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "15px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>

            <p style={{ color: "#888", fontSize: "13px" }}>
              Order ID: {order._id}
            </p>

            <p style={{ color: "#888", fontSize: "13px" }}>
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <hr />

            {order.products.map((p, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0"
              }}>
                <span>{p.name}</span>
                <span>Qty: {p.quantity || 1}</span>
                <span>₹{p.price * (p.quantity || 1)}</span>
              </div>
            ))}

            <hr />

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px"
            }}>

              <h3 style={{ color: "green", margin: 0 }}>
                Total: ₹{order.totalPrice}
              </h3>

              {/* Status Dropdown */}
              <select
                value={order.status || "Pending"}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  cursor: "pointer"
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default AdminOrders;

