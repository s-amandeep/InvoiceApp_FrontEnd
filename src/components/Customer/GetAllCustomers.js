import React, { useEffect, useState } from "react";
import { fetchData } from "../../apis/api_data";

const GetAllCustomers = () => {
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchData(`customers`);
        setCustomerData(data);
      } catch (error) {
        console.error("Failed to load customers", error);
      }
    };

    loadCustomers();
  }, []);

  return customerData;
};

export default GetAllCustomers;
