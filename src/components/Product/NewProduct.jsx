import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductTable.css";
import axiosInstance from "../../utils/auth-interceptor";
import { jwtDecode } from "jwt-decode";

const NewProduct = () => {
  const [products, setProducts] = useState([]); 
  const [userRole, setUserRole] = useState("ROLE_USER"); // Initialize state for user role 
  const [newProduct, setNewProduct] = useState({
    brandName: "",
    price: "",
    description: "",
    hsnCode: "",
    taxRate: "",
    cessRate: "",   
    stock: "",
    unitOfMeasurement: "",
  });  

  useEffect(() => {
    fetchProducts();   
    // Retrieve user role from localStorage
    const jwtToken = localStorage.getItem('jwtToken');
    const role = jwtDecode(jwtToken).roles[0];
    setUserRole(role); 
  }, []);

  const fetchProducts = () => {
    axiosInstance
      .get("/user/products")
      // .get("http://localhost:8080/api/products")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // axios.post("http://localhost:8080/api/products", newProduct);
      axiosInstance.post("/user/products", newProduct);
      fetchProducts();
      setNewProduct({
        brandName: "",
        price: "",
        description: "",
        hsnCode: "",
        taxRate: "",
        cessRate: "",         
        stock: "",
        unitOfMeasurement: "",
      });      
    } catch (error) {
      console.error("There was an error adding the product!", error);
    }
  };

  const handleDelete = (variantId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axiosInstance
        // .delete(`http://localhost:8080/api/products/${variantId}`)
        .delete(`/user/products/${variantId}`)
        .then(() => {
          fetchProducts(); // Refresh the product list after deletion
        })
        .catch((error) => {
          console.error("There was an error deleting the product!", error);
        });
    }
  };

  return (
    <div className="product-table-container">
      {userRole === 'ROLE_ADMIN' &&  <h1>Add New Product</h1>}
      {userRole === 'ROLE_ADMIN' && <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="brandName"
          value={newProduct.brandName}
          onChange={handleChange}
          placeholder="Brand Name"
          required
        />
        <input
          type="number"
          name="price"
          step="0.01" // Allow up to 2 decimal places
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="hsnCode"
          value={newProduct.hsnCode}
          onChange={handleChange}
          placeholder="HSN Code"
          required
        />
        <input
          type="number"
          name="taxRate"
          value={newProduct.taxRate}
          onChange={handleChange}
          placeholder="Tax Rate"
          required
        />
        <input
          type="number"
          name="cessRate"
          value={newProduct.cessRate}
          onChange={handleChange}
          placeholder="Cess Rate"
          defaultValue={0}
          required
        />
        <input
          type="number"
          name="stock"
          step="0.01" // Allow up to 2 decimal places
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="unitOfMeasurement"
          placeholder="Unit"
          value={newProduct.unitOfMeasurement}
          onChange={handleChange}
          required
        />        
        <button type="submit">Add Product</button>
      </form>}
      <h2>Product List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Variant ID</th>
            <th>Brand Name</th>            
            <th>Description</th>
            <th>MRP</th>
            <th>HSN Code</th>
            <th>Tax Rate</th>
            <th>Cess Rate</th>
            <th>Stock</th>
            <th>Unit</th>
            {userRole === 'ROLE_ADMIN' && <th>Actions</th>} {/* Add Actions column */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.variantId}>
              <td>{product.variantId}</td>
              <td>{product.brandName}</td>
              <td>{product.description}</td>
              <td>&#8377;{product.price}</td>  
              <td>{product.hsnCode}</td>
              <td>{product.taxRate}</td> 
              <td>{product.cessRate}</td>                        
              <td>{product.stock}</td>
              <td>{product.unitOfMeasurement}</td>
              <td>
              {userRole === 'ROLE_ADMIN' && <button
                  className="delete-button"
                  onClick={() => handleDelete(product.variantId)}
                >
                  Delete
                </button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewProduct;
