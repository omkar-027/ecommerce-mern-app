import API from "../services/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await API.post(
        "/api/users/register",
        { name, email, password }
      );

      alert("Account created successfully!");
      navigate("/login");

    } catch (error) {
      setError("Registration failed. Email may already exist.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <div style={styles.logoBox}>
          <span style={styles.logo}>🛍️ ShopZone</span>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join millions of happy shoppers</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleRegister}>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

        </form>

        <div style={styles.footer}>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login Here
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
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px"
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
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box"
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
    cursor: "pointer",
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

export default Register;

