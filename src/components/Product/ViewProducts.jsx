import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../apis/api_products";
import './ProductTable.css';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="product-table-container">
            <h1>Product List</h1>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Brand Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        {/* <th>Variant ID</th> */}
                        
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.variantId}>
                            <td>{product.brandName}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            {/* <td>{product.variantId}</td> */}
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
};

export default ViewProducts;
