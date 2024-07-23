import React, { useState } from "react";
import { CustomerData, addCustomer } from "../data/CustomerData";
import ShowForm from "./ShowForm";
import AddButton from "./AddButton";
import NewItem from "./NewItem";
import Modal from "./Modal";
import TableComponent from "./TableComponent";

const NewInvoice = ({ onClose }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    invoiceDate: "",
    items: [], // Array to store invoice items
    newItem: {
      // State for a new item
      brandName: "",
      description: "",
      mrp: "",
      quantity: "",
      unit: "",
      pricePerUnit: "",
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

  const handleSave = (data) => {
    console.log(data.newItem);    
    setFormData((formData) => ({
      ...formData,
      items: [...formData.items, data.newItem],
    }));
    // Here you can further process the received data, e.g., send to backend, update state, etc.
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var customer = CustomerData.find(
      (item) => item.id === parseInt(formData.customerId)
    );
    formData.customerName = customer.name;

    const combinedData = {
      ...formData,
      items: [...formData.items, formData.newItem],
    };
    console.log("Form data to submit:", combinedData);

    onClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddNewCustomer = (event) => {
    // event.preventDefault();
    // const { name, value } = event.target;
    const newCustomer = {
      id: CustomerData.length + 1, // Generate a unique id
      name: "KK",
    };
    addCustomer(newCustomer); // Call addItem function to add new item to the array
    console.log(CustomerData);
    // setFormData.customerName(value); // Clear input field after adding item
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteItem = (id) => {
    console.log(id, formData.items);
    // const updatedItems = formData.items.filter((item) => item.itemId !== id);
    const updatedItems = formData.items.filter((item, index) => index !== id);
    // console.log(i)
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const handleCustomerSelectChange = (event) => {
    event.preventDefault();
    const { value } = event.target;

    // const { value } = event.target;
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
            <AddButton onAddNew={handleAddNewCustomer}>New Customer</AddButton>
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

        {/* <ShowForm props={"Items"}>
          Add New Item
        </ShowForm> */}
        {/* <NewItem>Add New Item</NewItem> */}
        {formData.items.length > 0 && (
          <TableComponent
            formData={formData}
            handleDeleteItem={handleDeleteItem}
          />
        )}
        <button className="open-modal-btn" onClick={openModal}>
          Add New Item
        </button>
        <Modal
          showModal={showModal}
          closeModal={closeModal}
          onSave={handleSave}
        />
        <button onSubmit={handleSubmit}>Confirm </button>
      </form>
    </div>
  );
};

export default NewInvoice;
