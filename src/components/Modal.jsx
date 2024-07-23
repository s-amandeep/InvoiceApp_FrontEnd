import React, { useState } from "react";
import "./Modal.css"; // Import CSS for modal styling

const initialProducts = [
  {
    id: 1,
    name: "Product A",
    priceOptions: [
      {
        id: 1,
        price: 5.0,
        variants: [
          { id: 1, size: "Small", color: "Red" },
          { id: 2, size: "Medium", color: "Blue" },
          { id: 3, size: "Large", color: "Green" },
        ],
      },
      {
        id: 2,
        price: 7.5,
        variants: [
          { id: 4, size: "Regular", color: "Black" },
          { id: 5, size: "Large", color: "White" },
        ],
      },
      {
        id: 3,
        price: 10.0,
        variants: [
          { id: 6, size: "Small", color: "Yellow" },
          { id: 7, size: "Medium", color: "Purple" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Product B",
    priceOptions: [
      {
        id: 4,
        price: 6.0,
        variants: [
          { id: 8, size: "Small", color: "Blue" },
          { id: 9, size: "Large", color: "Green" },
        ],
      },
      {
        id: 5,
        price: 8.0,
        variants: [
          { id: 10, size: "Regular", color: "Black" },
          { id: 11, size: "Large", color: "White" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Product C",
    priceOptions: [
      {
        id: 6,
        price: 4.0,
        variants: [
          { id: 12, size: "Small", color: "Yellow" },
          { id: 13, size: "Medium", color: "Purple" },
        ],
      },
      {
        id: 7,
        price: 5.0,
        variants: [
          { id: 14, size: "Regular", color: "Black" },
          { id: 15, size: "Large", color: "White" },
        ],
      },
    ],
  },
];

const Modal = ({ showModal, closeModal, onSave }) => {
  const [products, setProducts] = useState(initialProducts); // State variable for products
  const [selectedProduct, setSelectedProduct] = useState(products[0]); // Initial selection of first product
  const [selectedPriceOption, setSelectedPriceOption] = useState(
    selectedProduct.priceOptions[0]
  ); // Initial selection of first price option
  const [selectedVariant, setSelectedVariant] = useState(
    selectedPriceOption.variants[0]
  ); // Initial selection of first variant
  // const [quantity, setQuantity] = useState(1); // Initial selection of first product
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

    var item = initialProducts.find(
      (item) => item.id === parseInt(formData.newItem.itemId)
    );
    var calcValue = calculateTotal(
      formData.newItem.quantity,
      formData.newItem.pricePerUnit
    );
    // console.log(calcValue, selectedProduct);

    formData.newItem.totalAmount = calcValue;
    formData.newItem.brandName = selectedProduct.name;
    formData.newItem.description = selectedVariant.size;
    formData.newItem.mrp = selectedPriceOption.price;

    const combinedData = {
      ...formData,
      items: [...formData.items, formData.newItem],
    };
    // console.log(combinedData);

    setFormData({
      // ...formData,
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
                  {product.name}
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
                  ${option.price.toFixed(2)}
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
                  {variant.size} - {variant.color}
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
                <th>Price per Piece</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  {selectedProduct.name} -{" "}
                  {selectedPriceOption.price.toFixed(2)} -{" "}
                  {selectedVariant.size} - {selectedVariant.color}
                </td>
                <td>
                  {/* <input type="number" value="1" min="1" /> */}
                  <input
                    type="number"
                    name="quantity"
                    value={formData.newItem.quantity}
                    onChange={handleNewItemChange}
                    required
                  />
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
                    Total Amount: &#8377;{" "}
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
