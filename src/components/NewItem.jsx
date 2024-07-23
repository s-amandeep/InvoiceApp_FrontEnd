import React, { useState } from "react";
import "./InvoiceTable.css";
import ProductData from "../data/ProductData";
import Modal from "./Modal";

const NewItem = () => {
  const [formData, setFormData] = useState({
    items: [],
    newItem: {
      // State for a new item
      brandName: "",
      mrp: "",
      description: "",
      quantity: 0,
      pricePerUnit: 0,
      totalAmount: 0,
    },
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
    // setFormData(data); // Receive data from modal
    setFormData((formData) => ({
      ...formData,
      items: [...formData.items, data.newItem],
      // newItem: {
      //   ...formData.newItem,
      //   // [name]: value,
      //   itemId: value,
      //   brandName: "",
      //   description: "",
      //   mrp: "",
      // },
    }));
    
    // console.log(formData);
    // Here you can further process the received data, e.g., send to backend, update state, etc.
  };

  const handleNewItemChange = (event) => {
    const { name, value } = event.target;

    // Update newItem state
    setFormData((prevFormData) => ({
      ...prevFormData,
      newItem: {
        ...prevFormData.newItem,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const combinedData = {
      ...formData,
      items: [...formData.items, formData.newItem],
    };
    console.log("Form data to submit:", combinedData);

    onClose();
  };

  const handleItemSelectChange = (event) => {
    const { value } = event.target;

    setFormData((formData) => ({
      ...formData,
      newItem: {
        ...formData.newItem,
        // [name]: value,
        itemId: value,
        brandName: "",
        description: "",
        mrp: "",
      },
    }));
  };

  function calculateTotal(quantity, pricePerUnit) {
    var calcValue =
      quantity && pricePerUnit
        ? (parseFloat(quantity) * parseFloat(pricePerUnit)).toFixed(2)
        : "";

    return calcValue;
  }

  const handleAddItem = (event) => {
    event.preventDefault();

    var item = ProductData.find(
      (item) => item.id === parseInt(formData.newItem.itemId)
    );
    var calcValue = calculateTotal(
      formData.newItem.quantity,
      formData.newItem.pricePerUnit
    );

    formData.newItem.totalAmount = calcValue;
    formData.newItem.brandName = item.brandName;
    formData.newItem.description = item.description;
    formData.newItem.mrp = item.mrp;

    const combinedData = {
      ...formData,
      items: [...formData.items, formData.newItem],
    };

    setFormData({
      ...formData,
      items: [...formData.items, formData.newItem], // Add new item to items array
      newItem: {
        // Clear newItem state for next item
        brandName: "",
        mrp: "",
        quantity: 0,
        pricePerUnit: 0,
        totalAmount: 0,
      },
    });
  };

  // Calculate total price
  const lineTotal = formData.items.reduce(
    (acc, item) => acc + item.quantity * item.pricePerUnit,
    0
  );

  // Function to handle quantity change
  const handleQuantityChange = (id, event) => {
    const updatedItems = formData.items.map((item) => {
      if (item.itemId === id) {
        return { ...item, quantity: parseInt(event.target.value, 10) };
      }
      return item;
    });
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  // Function to handle item deletion
  const handleDeleteItem = (id) => {
    console.log(id, formData.items)
    // const updatedItems = formData.items.filter((item) => item.itemId !== id);
    const updatedItems = formData.items.filter((item, index) => index !== id);
    // console.log(i)
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-text-color">Invoice</h2>

      <form onSubmit={handleSubmit}></form>
      <div>
        {/* <h3 className="form-text-color">Invoice</h3> */}

        {formData.items.length > 0 && (
          // <div>
          //   <h4>Items Added:</h4>
          //   <ul>
          //     {formData.items.map((item, index) => (
          //       <li className="form-text-color" key={index}>
          //         {item.brandName} - {item.description} - MRP: {item.mrp} -
          //         Quantity: {item.quantity} Price: {item.pricePerUnit} - Total
          //         Amount: &#8377; {item.totalAmount}
          //       </li>
          //     ))}
          //   </ul>
          // </div>
          <div className="invoice-table-container">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Brand</th>
                  <th>Description</th>
                  <th>MRP</th>
                  <th>Quantity</th>
                  <th>Price per Unit</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={item.itemId}>
                    <td>{index + 1}</td>
                    <td>{item.brandName}</td>
                    <td>{item.description}</td>
                    <td>&#8377; {item.mrp}</td>
                    <td>{item.quantity}</td>
                    {/* <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.itemId, e)}
                        min="1"
                      />
                    </td> */}
                    <td>&#8377; {item.pricePerUnit}</td>
                    <td>&#8377; {item.quantity * item.pricePerUnit}</td>
                    <td>
                      <button onClick={() => handleDeleteItem(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="4" style={{ textAlign: "right" }}>
                    Total:
                  </td>
                  <td>&#8377; {lineTotal.toFixed(2)}</td>
                  <td></td> {/* Empty cell to align with header columns */}
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <label className="form-text-color">
          Product Details:
          <select
            name="itemId"
            value={formData.itemId}
            onChange={handleItemSelectChange}
            required
          >
            <option value="">Select an item</option>
            {ProductData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.brandName} + {item.description} + {item.mrp}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="form-text-color">
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.newItem.quantity}
            onChange={handleNewItemChange}
            required
          />
        </label>
        <br />
        <label className="form-text-color">
          Price Per Piece:
          <input
            type="number"
            name="pricePerUnit"
            value={formData.newItem.pricePerUnit}
            onChange={handleNewItemChange}
            required
          />
        </label>
        <br />
        <label className="form-text-color">
          <p>
            Total Amount: &#8377;{" "}
            {calculateTotal(
              formData.newItem.pricePerUnit,
              formData.newItem.quantity
            )}
          </p>
        </label>
        <br />
        {/* <button type="button" onClick={handleAddItem}>
          Add Item
        </button> */}
        <button className="open-modal-btn" onClick={openModal}>
          Add New Item
        </button>

        <Modal showModal={showModal} closeModal={closeModal} onSave={handleSave}/>
        <hr />
      </div>
    </div>
  );
};

export default NewItem;
