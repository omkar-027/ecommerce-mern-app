import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminDashboard from "./pages/AdminDashboard";
import EditProduct from "./pages/EditProduct";
import Checkout from "./pages/checkout";
import MyOrders from "./pages/MyOrder";
import AdminOrders from "./pages/AdminOrders";


function App() {
  return (
    <Router>

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>

    </Router>
  );
}

export default App;