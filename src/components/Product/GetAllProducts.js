import React, { useEffect, useState } from "react";
import { fetchData } from "../../apis/api_data";

const GetAllProducts = () => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchData(`products`);
        setProductData(data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };

    loadProducts();
  }, []);

  return productData;
};

export default GetAllProducts;
