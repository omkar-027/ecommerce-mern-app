import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct(){

const { id } = useParams();
const navigate = useNavigate();

const [name,setName] = useState("");
const [price,setPrice] = useState("");
const [description,setDescription] = useState("");

useEffect(()=>{

fetchProduct();

},[]);

const fetchProduct = async () => {
  try {
    // 1. Double check this URL. Does it match your Backend route?
    const res = await axios.get(`http://localhost:5000/api/products/${id}`); 
    
    setName(res.data.name);
    setPrice(res.data.price);
    setDescription(res.data.description);
  } catch (error) {
    console.error("Fetch Error:", error.response?.status); // Should show 404
    alert("Product not found or invalid ID");
  }
};
const updateProduct = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  try {
    await axios.put(
      `http://localhost:5000/api/products/${id}`,
      {
        name,
        price,
        description,
      },
      {
        headers: { 
          // FIX: Added 'Bearer ' prefix 👇
          Authorization: `Bearer ${token}` 
        },
      }
    );

    alert("Product Updated Successfully ");
    navigate("/admin"); // Redirect back to admin dashboard
    
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
    alert("Update failed: " + (error.response?.data?.message || "Unauthorized"));
  }
};

return(

<div style={{padding:"40px"}}>

<h2>Edit Product</h2>

<form onSubmit={updateProduct}>

<input
type="text"
placeholder="Product Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
type="number"
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<br/><br/>

<textarea
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<br/><br/>

<button type="submit">Update Product</button>

</form>

</div>

);

}

export default EditProduct;