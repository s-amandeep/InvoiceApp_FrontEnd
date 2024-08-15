import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Invoice.css";
import ProductModal from "./ProductModal";
("./ProductModal");

const Invoice = () => {
  const [customers, setCustomers] = useState([]);
  const [invoice, setInvoice] = useState({
    customerId: "",
    invoiceDate: "",
    items: [],
    totalValue: 0,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch customers from backend
    fetchCustomers();
  }, []);

  //   useEffect(() => {
  //     console.log("Invoice state updated:", invoice);
  //   }, [invoice]);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:8080/api/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const handleInputChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotalInvoiceValue = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      return 0;
    }

    const total = items
      .reduce((total, item) => {
        const quantity = parseFloat(item.quantity) || 0;
        const sellingPrice = parseFloat(item.sellingPrice) || 0;
        const itemTotal = quantity * sellingPrice;
        return total + itemTotal;
      }, 0)
      .toFixed(2);

    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(invoice);
    // Submit the invoice data to the backend
    axios
      .post("http://localhost:8080/api/invoices", invoice)
      .then((response) => {
        console.log("Invoice created:", response.data);
        // Reset the form after submission
        setInvoice({
          customerId: "",
          invoiceDate: "",
          items: [],
          totalValue: 0,
        });
      })
      .catch((error) => console.error("Error creating invoice:", error));
  };

  const handleAddItem = (item) => {
    setInvoice((prevInvoice) => {
      const updatedItems = [...prevInvoice.items, item];
      console.log(updatedItems);
      const totalValue = calculateTotalInvoiceValue(updatedItems);
      return {
        ...prevInvoice,
        items: updatedItems,
        totalValue: totalValue, // Assuming totalValue is part of invoice state
      };
    });
    setShowModal(false);
  };

  return (
    <div className="invoice-container">
      <h1>Create Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer</label>
          <select
            name="customerId"
            value={invoice.customerId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Invoice Date</label>
          <input
            type="date"
            name="invoiceDate"
            value={invoice.invoiceDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="button" onClick={() => setShowModal(true)}>
          Add Product
        </button>
        <div className="product-list">
          <h2>Products</h2>
          <table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>MRP</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.brandName}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.sellingPrice.toFixed(2)}</td>
                  <td>{item.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="total-value">
          <h3>Total Invoice Value: &#8377;{invoice.totalValue}</h3>
        </div>
        <button type="submit">Submit Invoice</button>
      </form>

      {showModal && (
        <ProductModal
          setShowModal={setShowModal}
          addProduct={handleAddItem}
        />
      )}
    </div>
  );
};

export default Invoice;
