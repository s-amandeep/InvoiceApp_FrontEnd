import React, { useEffect, useState } from "react";
import { fetchCustomers } from "../../apis/api_customers";

const GetAllCustomers = () => {
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
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
