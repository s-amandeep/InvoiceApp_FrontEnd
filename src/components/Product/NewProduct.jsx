import React, { useState } from 'react';

const NewProduct = () => {
  // State for the form fields
  const [brandName, setBrandName] = useState('');
  const [priceOptions, setPriceOptions] = useState([{ price: '', variants: [{ description: '' }] }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input
    if (!brandName || priceOptions.some(option => !option.price || option.variants.some(variant => !variant.description))) {
      setError('All fields are required.');
      return;
    }

    setError('');
    setSuccess('');

    // Data to be sent to the backend
    const productData = {
      brandName,
      priceOptions,
    };

    try {
      // Send data to the backend
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      // Clear the form and show success message
      setBrandName('');
      setPriceOptions([{ price: '', variants: [{ description: '' }] }]);
      setSuccess('Product added successfully!');
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  // Handle brand name change
  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value);
  };

  // Handle price option change
  const handlePriceOptionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedOptions = [...priceOptions];
    updatedOptions[index] = { ...updatedOptions[index], [name]: value };
    setPriceOptions(updatedOptions);
  };

  // Handle variant description change
  const handleVariantChange = (priceOptionIndex, variantIndex, e) => {
    const { value } = e.target;
    const updatedOptions = [...priceOptions];
    updatedOptions[priceOptionIndex].variants[variantIndex].description = value;
    setPriceOptions(updatedOptions);
  };

  // Add a new price option
  const addPriceOption = () => {
    setPriceOptions([...priceOptions, { price: '', variants: [{ description: '' }] }]);
  };

  // Remove a price option
  const removePriceOption = (index) => {
    const updatedOptions = priceOptions.filter((_, i) => i !== index);
    setPriceOptions(updatedOptions);
  };

  // Add a new variant to a price option
  const addVariant = (priceOptionIndex) => {
    const updatedOptions = [...priceOptions];
    updatedOptions[priceOptionIndex].variants.push({ description: '' });
    setPriceOptions(updatedOptions);
  };

  // Remove a variant from a price option
  const removeVariant = (priceOptionIndex, variantIndex) => {
    const updatedOptions = [...priceOptions];
    updatedOptions[priceOptionIndex].variants = updatedOptions[priceOptionIndex].variants.filter((_, i) => i !== variantIndex);
    setPriceOptions(updatedOptions);
  };

  return (
    <div className="form-container">
      <h2 className="form-text-color">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Brand Name:
            <input
              type="text"
              value={brandName}
              onChange={handleBrandNameChange}
            />
          </label>
        </div>
        {priceOptions.map((option, priceIndex) => (
          <div key={priceIndex}>
            <h3>Price Option {priceIndex + 1}</h3>
            <div>
              <label>
                Price:
                <input
                  type="text"
                  name="price"
                  value={option.price}
                  onChange={(e) => handlePriceOptionChange(priceIndex, e)}
                />
              </label>
            </div>
            {option.variants.map((variant, variantIndex) => (
              <div key={variantIndex}>
                <label>
                  Variant Description:
                  <input
                    type="text"
                    value={variant.description}
                    onChange={(e) => handleVariantChange(priceIndex, variantIndex, e)}
                  />
                </label>
                <button type="button" onClick={() => removeVariant(priceIndex, variantIndex)}>Remove Variant</button>
              </div>
            ))}
            <button type="button" onClick={() => addVariant(priceIndex)}>Add Variant</button>
            <button type="button" onClick={() => removePriceOption(priceIndex)}>Remove Price Option</button>
          </div>
        ))}
        <button type="button" onClick={addPriceOption}>Add Price Option</button>
        <button type="submit">Add Product</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default NewProduct;
