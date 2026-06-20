import API from "../services/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post(
        "/api/users/login",
        { email, password }
      );

      //  Check if backend returned error message
      if (res.data.message === "User not found") {
        setError("❌ No account found with this email");
        setLoading(false);
        return;
      }

      if (res.data.message === "Invalid password") {
        setError("❌ Wrong password. Please try again");
        setLoading(false);
        return;
      }

      //  Check if token exists
      if (!res.data.token) {
        setError("❌ Login failed. Please try again");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      navigate("/");
      window.location.reload();

    } catch (error) {
      setError("❌ Something went wrong. Please try again");
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        {/* Logo */}
        <div style={styles.logoBox}>
          <span style={styles.logo}>🛍️ ShopZone</span>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Login to your account</p>
        </div>

        {/*  Error Message Box */}
        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              style={styles.closeError}
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // clear error when typing
              }}
              style={{
                ...styles.input,
                border: error ? "1px solid #e53935" : "1px solid #ddd"
              }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // clear error when typing
              }}
              style={{
                ...styles.input,
                border: error ? "1px solid #e53935" : "1px solid #ddd"
              }}
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
            {loading ? "⏳ Logging in..." : "Login →"}
          </button>

        </form>

        <div style={styles.footer}>
          <p>
            Don't have an account?{" "}
            <Link to="/register" style={styles.link}>
              Sign Up Free
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f1c2e 0%, #1a3a5c 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px"
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
  },
  logoBox: {
    textAlign: "center",
    marginBottom: "30px"
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#0f1c2e"
  },
  title: {
    fontSize: "24px",
    color: "#0f1c2e",
    margin: "10px 0 5px 0"
  },
  subtitle: {
    color: "#888",
    fontSize: "14px",
    margin: 0
  },
  errorBox: {
    background: "#ffebee",
    color: "#c62828",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ef9a9a"
  },
  errorIcon: {
    marginRight: "8px",
    fontSize: "16px"
  },
  closeError: {
    background: "none",
    border: "none",
    color: "#c62828",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "0 4px"
  },
  inputGroup: {
    marginBottom: "20px"
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
    padding: "12px 15px",
    fontSize: "15px",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.2s"
  },
  submitBtn: {
    width: "100%",
    padding: "13px",
    background: "#0f1c2e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "5px"
  },
  footer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#666"
  },
  link: {
    color: "#f3b562",
    fontWeight: "bold",
    textDecoration: "none"
  }
};

export default Login;

