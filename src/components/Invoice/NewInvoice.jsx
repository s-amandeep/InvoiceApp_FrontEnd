import React, { useEffect, useState } from "react";
import GetAllCustomers from "../Customer/GetAllCustomers";
import Modal from "./Modal";
import TableComponent from "./TableComponent";
import generateInvoicePDF from "./generateInvoicePDF";
import ProductModal from "../InvoiceNew/ProductModal";
import "./InvoiceTable.css";

const NewInvoice = ({ onClose }) => {
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    invoiceDate: "",
    items: [], // Array to store invoice items
    newItem: {
      // State for a new item
      itemId: "",
      brandName: "",
      description: "",
      mrp: "",
      quantity: 1,
      unit: "",
      pricePerUnit: 0,
      totalAmount: "",
    },
    invoiceTotal: 0,
  });

  const [showModal, setShowModal] = useState(false);  

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const CustomerData = GetAllCustomers();  
  console.log(ProductData);

  const invoiceTotalAmount = 0;

  // Function to add items to invoice
  const onSave = (data) => {
    console.log("NI -- ", data);

    const updatedItems = [...formData.items];
    updatedItems.push(data);

    setFormData((formData) => ({
      ...formData,
      items: updatedItems,
      invoiceTotal: invoiceTotalAmount,
    }));

    // Here you can further process the received data, e.g., send to backend, update state, etc.
    // After adding results in the backend, set all values to initial state
    // console.log(formData, updatedItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var customer = CustomerData.find(
      (item) => item.id === parseInt(formData.customerId)
    );
    formData.customerName = customer.name;

    const combinedData = {
      ...formData,
      newItem: {
        // State for a new item
        brandName: "",
        description: "",
        mrp: "",
        quantity: 1,
        unit: "",
        pricePerUnit: 0,
        totalAmount: "",
      },
      invoiceTotal: invoiceTotalAmount,
    };
    if (combinedData.items.length === 0) {
      alert("Please add items to the invoice!");
    } else {
      console.log("Form data to submit:", combinedData);
      // Here you can further process the received data, e.g., send to backend, update state, etc.

      onClose();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteItem = (id) => {
    console.log(id, formData.items);    
    const updatedItems = formData.items.filter((item, index) => index !== id);
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const companyName = "ZTL";

  const handleCustomerSelectChange = (event) => {
    event.preventDefault();
    const { value } = event.target;

    if (value === "new") {
      setFormData({ ...formData, customerId: "new", customerName: "" });
    } else {
      const customer = CustomerData.find((c) => c.id === parseInt(value));
      setFormData({
        ...formData,
        customerId: value,
        customerName: customer.name,    
      });
    }
  };

  const getFinalInvoice = (event) => {
    console.log(formData);
    generateInvoicePDF(formData, companyName);
  };

  return (
    <div className="form-container">
      <h2 className="form-text-color">Invoice</h2>

      <form onSubmit={handleSubmit}>
        <label className="form-text-color">
          Customer:
          <select
            name="customerId"
            value={formData.customerId}
            onChange={handleCustomerSelectChange}
            required
          >
            <option value="">Select a customer or add new</option>
            {CustomerData.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
            <option value="new">Add New Customer</option>
          </select>
        </label>

        {formData.customerId === "new" && (
          <label className="form-text-color">
            New Customer Name:
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </label>
        )}
        <br />

        <label className="form-text-color">
          Invoice Date:
          <input
            type="date"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <div>
          <button type="button" className="open-modal-btn" onClick={openModal}>
            Add New Item
          </button>
          <Modal
            showModal={showModal}
            closeModal={closeModal}
            onSave={onSave}
          />
        </div>

        {formData.items.length > 0 && (
          <TableComponent
            formData={formData}
            handleDeleteItem={handleDeleteItem}
          />
        )}

        <hr />
        <button type="button" onClick={getFinalInvoice}>
          Generate PDF and Share via WhatsApp
        </button>
      </form>
    </div>
  );
};

export default NewInvoice;
