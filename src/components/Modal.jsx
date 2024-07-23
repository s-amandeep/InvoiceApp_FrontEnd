import React, { useState } from "react";
import "./Modal.css"; // Import CSS for modal styling
import ProductData from "../data/ProductData";
import ProductUnit from "../data/ProductUnit";

const Modal = ({ formData, showModal, closeModal, onSave, handleNewItemChange }) => {
  const [products, setProducts] = useState(ProductData); // State variable for products
  const [selectedProduct, setSelectedProduct] = useState(products[0]); // Initial selection of first product
  const [selectedPriceOption, setSelectedPriceOption] = useState(selectedProduct.priceOptions[0]); // Initial selection of first price option
  const [selectedVariant, setSelectedVariant] = useState(selectedPriceOption.variants[0]); // Initial selection of first variant
  const [selectedUnit, setselectedUnit] = useState(ProductUnit[0]); // State variable for unit

  // Function to handle product change
  const handleProductChange = (event) => {
    const productId = parseInt(event.target.value, 10);
    const product = products.find((prod) => prod.id === productId);
    setSelectedProduct(product);
    setSelectedPriceOption(product.priceOptions[0]); // Reset selected price option when product changes
    setSelectedVariant(product.priceOptions[0].variants[0]); // Reset selected variant when product changes
  };

  // Function to handle price option change
  const handlePriceOptionChange = (event) => {
    const priceOptionId = parseInt(event.target.value, 10);
    const priceOption = selectedProduct.priceOptions.find(
      (option) => option.id === priceOptionId
    );
    setSelectedPriceOption(priceOption);
    setSelectedVariant(priceOption.variants[0]); // Reset selected variant when price option changes
  };

  // Function to handle variant change
  const handleVariantChange = (event) => {
    const variantId = parseInt(event.target.value, 10);
    const variant = selectedPriceOption.variants.find(
      (variant) => variant.id === variantId
    );
    setSelectedVariant(variant);
  };

  // Function to handle unit change
  const handleUnitChange = (event) => {
    const unitId = parseInt(event.target.value, 10);
    const unit = ProductUnit.find((unit) => unit.id === unitId);
    setselectedUnit(unit);
  };

  function calculateTotal(quantity, pricePerUnit) {
    var calcValue =
      quantity && pricePerUnit
        ? (parseFloat(quantity) * parseFloat(pricePerUnit)).toFixed(2)
        : "";

    return calcValue;
  }

  // Function to handle add items to invoice
  const handleAddItem = (event) => {
    event.preventDefault();

    var calcValue = calculateTotal(
      formData.newItem.quantity,
      formData.newItem.pricePerUnit
    );

    formData.newItem.totalAmount = calcValue;
    formData.newItem.brandName = selectedProduct.brandName;
    formData.newItem.description = selectedVariant.description;
    formData.newItem.mrp = selectedPriceOption.mrp;
    formData.newItem.unit = selectedUnit.name;  
    
    setselectedUnit(ProductUnit[0]);
    setSelectedProduct(products[0]); 
    setSelectedPriceOption(selectedProduct.priceOptions[0]); 
    setSelectedVariant(selectedPriceOption.variants[0]);   

    onSave(formData);

    closeModal();
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Add New Item</h2>
        <div className="invoice-table-container">
          <div className="product-select">
            <label htmlFor="productSelect">Brand: </label>
            <select
              id="productSelect"
              value={selectedProduct.id}
              onChange={handleProductChange}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.brandName}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="price-option-select">
            <label htmlFor="priceOptionSelect">MRP: </label>
            <select
              id="priceOptionSelect"
              value={selectedPriceOption.id}
              onChange={handlePriceOptionChange}
            >
              {selectedProduct.priceOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  &#8377; {option.mrp.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="variant-select">
            <label htmlFor="variantSelect">Description: </label>
            <select
              id="variantSelect"
              value={selectedVariant.id}
              onChange={handleVariantChange}
            >
              {selectedPriceOption.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.description}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="unit-select">
            <label htmlFor="unitSelect">Unit: </label>
            <select
              id="unitId"
              value={selectedUnit.id}
              onChange={handleUnitChange}
            >
              {ProductUnit.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>          
          {/* Table to display selected product, price option, variant, and price */}
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item No.</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  {selectedProduct.brandName} -{" "}
                  {selectedPriceOption.mrp.toFixed(2)} -{" "}
                  {selectedVariant.description}
                  {/* {selectedUnit.name} */}
                </td>
                <td>
                  <p>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.newItem.quantity} 
                    onChange={handleNewItemChange}
                    min="1"
                    required
                  /> {selectedUnit.name}
                  </p> 
                </td>
                <td>
                  <input
                    type="number"
                    name="pricePerUnit"
                    value={formData.newItem.pricePerUnit}
                    onChange={handleNewItemChange}
                    required
                  />
                </td>
                <td>
                  <p>
                    &#8377;{" "}
                    {calculateTotal(
                      formData.newItem.pricePerUnit,
                      formData.newItem.quantity
                    )}
                  </p>
                </td>
              </tr>
              {/* Add more rows dynamically based on requirement */}
            </tbody>
          </table>
          <br />
          <button type="button" onClick={handleAddItem}>
            Add Item
          </button>
          <hr />
        </div>

        {/* <p>This is a basic modal popup example in React. Click the close button or outside the modal to close it.</p> */}
      </div>
    </div>
  );
};

export default Modal;
