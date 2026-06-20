import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminAddProduct() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState("general");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/api/products/add",
        { name, price, image, description },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(" Product Added Successfully");
      navigate("/admin/dashboard");

    } catch (error) {
      setError("❌ Failed to add product. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h2 style={styles.title}>➕ Add New Product</h2>

        {error && (
          <div style={styles.errorBox}>{error}</div>
        )}

        <div style={styles.formGrid}>

          {/* Left - Form */}
          <form onSubmit={handleSubmit} style={styles.form}>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Product Name</label>
              <input
                type="text"
                placeholder="e.g. Nike Air Max"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Price (₹)</label>
              <input
                type="number"
                placeholder="e.g. 2999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setPreview(e.target.value);
                }}
                style={styles.input}
                required
              />
              <p style={styles.hint}>
                💡 Tip: Use images from unsplash.com or any direct image URL
              </p>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                placeholder="Describe your product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
              disabled={loading}
            >
              {loading ? "⏳ Adding Product..." : " Add Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              style={styles.cancelBtn}
            >
              ← Back to Dashboard
            </button>

          </form>

          {/* Right - Image Preview */}
          <div style={styles.previewBox}>

            <p style={styles.previewTitle}> Image Preview</p>

            {preview ? (
              <div style={styles.imageContainer}>
                <img
                  src={preview}
                  alt="Product Preview"
                  style={styles.previewImage}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=Invalid+Image+URL";
                  }}
                />
              </div>
            ) : (
              <div style={styles.noPreview}>
                <p style={{ fontSize: "48px" }}></p>
                <p style={{ color: "#888" }}>
                  Enter image URL to see preview
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {
  page: {
    background: "#f0f2f5",
    minHeight: "100vh",
    padding: "30px 20px"
  },
  card: {
    background: "white",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "900px",
    margin: "auto",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)"
  },
  title: {
    fontSize: "22px",
    color: "#0f1c2e",
    marginBottom: "25px",
    borderLeft: "4px solid #f3b562",
    paddingLeft: "12px"
  },
  errorBox: {
    background: "#ffebee",
    color: "#c62828",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px"
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  inputGroup: {
    marginBottom: "18px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "6px"
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box"
  },
  textarea: {
    width: "100%",
    padding: "11px 14px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
    fontFamily: "inherit"
  },
  hint: {
    fontSize: "12px",
    color: "#888",
    marginTop: "5px"
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    background: "#0f1c2e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  cancelBtn: {
    width: "100%",
    padding: "12px",
    background: "white",
    color: "#0f1c2e",
    border: "1px solid #0f1c2e",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer"
  },
  previewBox: {
    border: "2px dashed #ddd",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px"
  },
  previewTitle: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
    fontSize: "15px"
  },
  imageContainer: {
    width: "100%",
    height: "280px",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#f5f5f5"
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px"
  },
  noPreview: {
    textAlign: "center",
    color: "#aaa"
  }
};

export default AdminAddProduct;

