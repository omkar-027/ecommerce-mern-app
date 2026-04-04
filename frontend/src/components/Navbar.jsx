import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (error) {
      console.log(error);
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(count);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setUser(null);
    setCartCount(0);
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav style={styles.nav}>

      {/* Top Bar */}
      <div style={styles.topBar}>

        {/* Logo */}
        <Link to="/" style={styles.logo}>
          🛍️ ShopZone
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search products, brands and more..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>
            🔍
          </button>
        </form>

        {/* Right Side */}
        <div style={styles.rightSection}>

          {user ? (
            <div style={styles.userSection}>
              <span style={styles.greeting}>
                Hello, {user.name?.split(" ")[0]}
              </span>

              <Link to="/orders" style={styles.navLink}>
                📦 Orders
              </Link>

              {user.role === "admin" && (
                <Link to="/admin/dashboard" style={styles.adminLink}>
                  ⚙️ Admin
                </Link>
              )}

              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div style={styles.authSection}>
              <Link to="/login" style={styles.loginBtn}>
                Login
              </Link>
              <Link to="/register" style={styles.registerBtn}>
                Sign Up
              </Link>
            </div>
          )}

          <Link to="/cart" style={styles.cartBtn}>
            🛒
            {cartCount > 0 && (
              <span style={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>

        </div>

      </div>

      {/* Bottom Nav */}
      <div style={styles.bottomNav}>
        <Link to="/" style={styles.bottomLink}>🏠 Home</Link>
        <Link to="/?search=shoes" style={styles.bottomLink}>👟 Shoes</Link>
        <Link to="/?search=phone" style={styles.bottomLink}>📱 Phones</Link>
        <Link to="/?search=watch" style={styles.bottomLink}>⌚ Watches</Link>
        <Link to="/?search=laptop" style={styles.bottomLink}>💻 Laptops</Link>
         <Link to="/?search=Furnichar" style={styles.bottomLink}>🪑 Furniture</Link>
        <Link to="/checkout" style={styles.bottomLink}>🧾 Checkout</Link>
      </div>

    </nav>
  );
}

const styles = {
  nav: {
    background: "#0f1c2e",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 30px",
    gap: "20px"
  },
  logo: {
    color: "#f3b562",
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    whiteSpace: "nowrap"
  },
  searchForm: {
    display: "flex",
    flex: 1,
    maxWidth: "500px"
  },
  searchInput: {
    flex: 1,
    padding: "10px 15px",
    fontSize: "14px",
    border: "none",
    borderRadius: "4px 0 0 4px",
    outline: "none"
  },
  searchBtn: {
    padding: "10px 15px",
    background: "#f3b562",
    border: "none",
    borderRadius: "0 4px 4px 0",
    cursor: "pointer",
    fontSize: "16px"
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  greeting: {
    color: "white",
    fontSize: "14px",
    fontWeight: "bold"
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px"
  },
  adminLink: {
    color: "#f3b562",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "bold"
  },
  logoutBtn: {
    padding: "6px 12px",
    background: "#e53935",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px"
  },
  authSection: {
    display: "flex",
    gap: "10px"
  },
  loginBtn: {
    padding: "7px 16px",
    color: "white",
    textDecoration: "none",
    border: "1px solid white",
    borderRadius: "4px",
    fontSize: "14px"
  },
  registerBtn: {
    padding: "7px 16px",
    background: "#f3b562",
    color: "#0f1c2e",
    textDecoration: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold"
  },
  cartBtn: {
    position: "relative",
    fontSize: "24px",
    textDecoration: "none",
    cursor: "pointer"
  },
  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "#e53935",
    color: "white",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    fontSize: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },
  bottomNav: {
    display: "flex",
    gap: "5px",
    padding: "8px 30px",
    background: "#1a2d42",
    overflowX: "auto"
  },
  bottomLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "13px",
    padding: "4px 12px",
    borderRadius: "3px",
    whiteSpace: "nowrap",
    transition: "background 0.2s"
  }
};

export default Navbar;