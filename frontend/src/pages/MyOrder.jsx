import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page) => {
    try {

      const res = await axios.get(
        `http://localhost:5000/api/orders/my-orders?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setOrders(res.data.orders || []);
      setTotalPages(res.data.totalPages || 1);

    } catch (error) {
      console.error(error);
      setOrders([]);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>

      <h1>📦 My Orders</h1>

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

              <span style={{
                background: "#febd69",
                padding: "4px 12px",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "bold"
              }}>
                {order.status || "Pending"}
              </span>

            </div>

          </div>
        ))
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            background: currentPage === 1 ? "#ccc" : "#0f1c2e",
            color: "white",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Previous
        </button>

        <span style={{ padding: "8px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            background: currentPage === totalPages ? "#ccc" : "#0f1c2e",
            color: "white",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default MyOrders;
