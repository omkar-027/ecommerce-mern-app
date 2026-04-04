import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();   // get id from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {

    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>

      <h1>{product.name}</h1>

      <img
  src={product.image || "https://via.placeholder.com/400"}
  alt={product.name}
  style={{
    width: "100%",
    maxWidth: "400px",
    height: "350px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  }}
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/400x350?text=No+Image";
  }}
/>

      <h2 style={{ color: "green" }}>₹{product.price}</h2>

      <p>{product.description}</p>

    </div>
  );
}

export default ProductDetails;