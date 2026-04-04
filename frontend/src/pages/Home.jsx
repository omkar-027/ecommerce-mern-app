import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setCart([]);
      localStorage.removeItem("cart");
      return;
    }
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/products?search=${search}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [search]);

  //  Show toast notification
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 2500);
  };

  const addToCart = (product) => {
    const user = localStorage.getItem("user");

    if (!user) {
      showToast("⚠️ Please login to add items to cart");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const existing = cart.find((item) => item._id === product._id);
    let updated;

    if (existing) {
      updated = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      showToast` ${product.name} quantity updated!`;
    } else {
      updated = [...cart, { ...product, quantity: 1 }];
      showToast(`🛒 ${product.name} added to cart!`);
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>

      {/*  Toast Notification */}
      {toast.show && (
        <div style={styles.toast}>
          {toast.message}
        </div>
      )}

      {/* Hero Banner */}
      {!search && (
        <div style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Big Deals. Every Day.
            </h1>
            <p style={styles.heroSubtitle}>
              Shop the latest products at unbeatable prices
            </p>
            <button
              onClick={() =>{
                console.log  ("Button was actually clicked! ");
               navigate("/", { replace: true });
               window.location.reload();
            }}
              style={styles.heroBtn}
            >
              Shop Now →
            </button>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div style={styles.container}>

        <h2 style={styles.sectionTitle}>
          {search ? `Results for "${search}"` : "🔥 Featured Products"}
        </h2>

        {loading ? (
          <div style={styles.loadingBox}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={{ fontSize: "48px" }}>😕</p>
            <p>No products found for "{search}"</p>
            <button
              onClick={() => navigate("/")}
              style={styles.heroBtn}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {products.map((product) => (
              <div key={product._id} style={styles.card}>

                {/* Product Image */}
                <div
                  style={styles.imageBox}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    style={styles.image}
                  />
                </div>

                {/* Product Info */}
                <div style={styles.cardBody}>

                  <h3
                    style={styles.productName}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {product.name}
                  </h3>

                  <p style={styles.description}>
                    {product.description?.substring(0, 60)}...
                  </p>

                  <div style={styles.priceRow}>
                    <span style={styles.price}>₹{product.price}</span>
                    <span style={styles.freeShipping}>FREE Delivery</span>
                  </div>

                  <div style={styles.stars}>
                    ⭐⭐⭐⭐⭐
                    <span style={styles.reviewCount}>(24)</span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    style={styles.addBtn}
                  >
                    🛒 Add to Cart
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

const styles = {

  //  Toast styles
  toast: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "#0f1c2e",
    color: "white",
    padding: "14px 24px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "bold",
    zIndex: 9999,
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    animation: "slideIn 0.3s ease",
    borderLeft: "4px solid #f3b562"
  },

  hero: {
    background: "linear-gradient(135deg, #0f1c2e 0%, #1a3a5c 100%)",
    padding: "60px 40px",
    textAlign: "center"
  },
  heroContent: {
    maxWidth: "600px",
    margin: "auto"
  },
  heroTitle: {
    color: "white",
    fontSize: "42px",
    fontWeight: "bold",
    margin: "0 0 15px 0"
  },
  heroSubtitle: {
    color: "#ccc",
    fontSize: "18px",
    margin: "0 0 25px 0"
  },
  heroBtn: {
    padding: "12px 30px",
    background: "#f3b562",
    color: "#0f1c2e",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    position: "relative", 
    zIndex: 10
  },
  container: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "30px 20px"
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#0f1c2e",
    marginBottom: "20px",
    borderLeft: "4px solid #f3b562",
    paddingLeft: "12px"
  },
  loadingBox: {
    textAlign: "center",
    padding: "60px"
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #0f1c2e",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 15px auto"
  },
  loadingText: {
    fontSize: "18px",
    color: "#888"
  },
  emptyBox: {
    textAlign: "center",
    padding: "60px",
    color: "#555"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s"
  },
  imageBox: {
    overflow: "hidden",
    height: "200px",
    background: "#f5f5f5",
    cursor: "pointer"
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    transition: "transform 0.3s"
  },
  cardBody: {
    padding: "15px"
  },
  productName: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#0f1c2e",
    marginBottom: "6px",
    cursor: "pointer"
  },
  description: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "10px"
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px"
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#e53935"
  },
  freeShipping: {
    fontSize: "11px",
    color: "#2e7d32",
    fontWeight: "bold"
  },
  stars: {
    fontSize: "12px",
    marginBottom: "10px",
    color: "#f3b562"
  },
  reviewCount: {
    color: "#888",
    marginLeft: "4px"
  },
  addBtn: {
    width: "100%",
    padding: "9px",
    background: "#0f1c2e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background 0.2s"
  }
};

//  Add spinner and toast animation
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(100px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;
document.head.appendChild(styleTag);

export default Home;
