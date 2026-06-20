import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

<Link to="/checkout">
<button>Proceed to Checkout</button>
</Link>

function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart
  useEffect(() => {

    const user = localStorage.getItem("user");

  // if not logged in, show empty cart
  if (!user) {
    setCart([]);
    return;
  }
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Update quantity
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                padding: "15px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div>
                <button onClick={() => decreaseQty(item._id)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button onClick={() => increaseQty(item._id)}>+</button>
              </div>

              <div>
                <p>₹{item.price * item.quantity}</p>
                <button
                  onClick={() => removeItem(item._id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 style={{ marginTop: "20px" }}>
            Total: ₹{total}
          </h2>
        </>
      )}
    </div>
  );
}

export default Cart;

