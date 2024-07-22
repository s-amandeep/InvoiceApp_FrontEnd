import React, { useState } from "react";
import "./InvoiceTable.css";
import ProductData from "../data/ProductData";

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
  const total = formData.items.reduce(
    (acc, item) => acc + item.quantity * item.pricePerUnit,
    0
  );

  // Function to handle quantity change
  const handleQuantityChange = (id, event) => {
    const updatedItems = formData.items.map(item => {
      if (item.itemId === id) {
        return { ...item, quantity: parseInt(event.target.value, 10) };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div className="form-container">
      <h2>Add New Item</h2>

      <form onSubmit={handleSubmit}></form>
      <div>
        <h3 className="form-text-color">Add Items to Invoice</h3>

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
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.brandName}</td>
                    <td>{item.description}</td>
                    <td>{item.mrp}</td>
                    <td>{item.quantity}</td>
                    <td>&#8377; {item.pricePerUnit}</td>
                    <td>&#8377; {item.quantity * item.pricePerUnit}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" style={{ textAlign: "right" }}>
                    Total:
                  </td>
                  <td>&#8377; {total.toFixed(2)}</td>
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
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <hr />
      </div>
    </div>
  );
};

export default NewItem;
