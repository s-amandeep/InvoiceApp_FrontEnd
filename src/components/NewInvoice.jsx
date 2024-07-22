import React, { useState } from "react";
import CustomerData from "../data/CustomerData";
import ShowForm from "./ShowForm";
import AddButton from "./AddButton";
import NewItem from "./NewItem";

const NewInvoice = ({ onClose }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    invoiceDate: "",
    // amount: 0,
    // items: [], // Array to store invoice items
    // newItem: {
    //   // State for a new item
    //   brandName: "",
    //   description: "",
    //   mrp: "",
    //   quantity: "",
    //   pricePerPiece: "",
    //   totalAmount: "",
    // },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    var customer = CustomerData.find((item) => item.id === parseInt(formData.customerId));
    formData.customerName = customer.name;

    const combinedData = {
      ...formData,
      // items: [...formData.items, formData.newItem],
    };
    console.log("Form data to submit:", combinedData);

    onClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCustomerSelectChange = (event) => {
    const { value } = event.target;
    if (value === "new") {
      setFormData({ ...formData, customerId: "new", customerName: "" });
    } else {
      setFormData({
        ...formData,
        customerId: value,
        customerName: "",
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Invoice</h2>

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

        {/* <label className="form-text-color">
          Invoice Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </label>
        <hr /> */}
        
        <button onSubmit={handleSubmit}>Confirm </button>
        <ShowForm props={"Items"}>
          Add New Item
        </ShowForm>
      </form>
    </div>
  );
};

export default NewInvoice;
