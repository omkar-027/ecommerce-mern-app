import API from "../services/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct(){

const { id } = useParams();
const navigate = useNavigate();

const [name,setName] = useState("");
const [price,setPrice] = useState("");
const [description,setDescription] = useState("");

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/api/products/${id}`);
      setName(res.data.name);
      setPrice(res.data.price);
      setDescription(res.data.description);
    } catch (error) {
      console.error("Fetch Error:", error.response?.status);
      alert("Product not found or invalid ID");
    }
  };
  fetchProduct();
}, [id]);

const updateProduct = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  try {
    await API.put(
      `/api/products/${id}`,
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

