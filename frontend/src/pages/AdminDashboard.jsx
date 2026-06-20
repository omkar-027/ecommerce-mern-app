import API from "../services/api";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const deleteProduct = async (id) => {
    console.log("Button clicked! ID is:", id);
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert( "Deleted! ");
      fetchProducts(); // Refresh list without moving page
    } catch (error) {
      alert("Error deleting product");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Admin Product Dashboard</h2>
        <button 
          onClick={() => navigate("/admin/add-product")} // Using navigate for Add button
          style={styles.addBtn}
        >
          + Add New Product
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr style={styles.theadRow}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} style={styles.tr}>
              <td style={styles.td}>{p.name}</td>
              <td style={styles.td}>₹{p.price}</td>
              <td style={styles.td}>
                <button 
                  onClick={() => navigate(`/admin/edit-product/${p._id}`)} // Fixed navigation
                  style={styles.editBtn}
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteProduct(p._id)} 
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//  Clean UI Styles
const styles = {
  table: {
    width: "100%",        // Makes the table take full width
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  theadRow: {
    background: "#f4f4f4",
    textAlign: "left"
  },
  th: {
    padding: "15px",
    borderBottom: "2px solid #ddd",
    textAlign: "left"     // Ensures header text aligns with cell text
  },
  td: {
    padding: "15px",
    borderBottom: "1px solid #eee"
  },
  tr: {
    transition: "background 0.3s"
  },
  addBtn: {
    background: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  editBtn: {
    background: "#007bff",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "4px",
    marginRight: "10px",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "#dc3545",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default AdminDashboard;

