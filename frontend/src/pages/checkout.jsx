import API from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handlePayment = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      if (cart.length === 0) {
        alert("Your cart is empty");
        return;
      }

      // Step 1 - Create Razorpay order
      const { data } = await API.post(
        "/api/orders/create-razorpay-order",
        { totalPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Step 2 - Open Razorpay popup
      const options = {
        key: "rzp_test_SUBKu8wuhlQAKN",
        amount: data.amount,
        currency: data.currency,
        name: "MyShop",
        description: "Order Payment",
        order_id: data.id,

        handler: async function (response) {

          // Step 3 - Payment success - save order
          await API.post(
            "/api/orders",
            {
              products: cart,
              totalPrice,
              paymentId: response.razorpay_payment_id
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          alert(" Payment Successful! Order Placed.");

          localStorage.removeItem("cart");
          setCart([]);

          navigate("/orders");

        },

        prefill: {
          name: "Customer",
          email: "customer@example.com"
        },

        theme: {
          color: "#0f1c2e"
        }

      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("❌ Payment Failed");
    }

  };

  if (cart.length === 0) {
    return (
      <h2 style={{ padding: "30px", textAlign: "center" }}>
        🛒 Your cart is empty
      </h2>
    );
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "50px auto",
      padding: "30px",
      background: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
    }}>

      <h1 style={{ textAlign: "center" }}>🧾 Checkout</h1>

      {cart.map((item) => (
        <div key={item._id} style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #ddd",
          padding: "10px 0"
        }}>
          <span>{item.name}</span>
          <span>Qty: {item.quantity || 1}</span>
          <span>₹{item.price * (item.quantity || 1)}</span>
        </div>
      ))}

      <h2 style={{ textAlign: "right", marginTop: "20px" }}>
        Total: ₹{totalPrice}
      </h2>

      <button
        onClick={handlePayment}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          background: "#0f1c2e",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        💳 Pay Now ₹{totalPrice}
      </button>

    </div>
  );
}

export default Checkout;

