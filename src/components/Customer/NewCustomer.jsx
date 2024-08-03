import React, { useState } from 'react';

const NewCustomer = () => {
  // State for form fields
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input
    if (!customerName || !address || !phoneNumber) {
      setError('All fields are required.');
      return;
    }
    
    setError('');
    setSuccess('');

    // Data to be sent to the backend
    const customerData = {
      name: customerName,
      address: address,
      mobile: phoneNumber,
    };

    try {
      // Send data to the backend
      const response = await fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      // Clear the form and show success message
      setCustomerName('');
      setAddress('');
      setPhoneNumber('');
      setSuccess('Customer added successfully!');
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  // Handle phone number input change
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;

    // Allow only digits and limit to 10 characters
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-text-color">Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Customer Name:             
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              maxLength={10} // HTML attribute to limit input length
            />
          </label>
        </div>
        <button type="submit">Add Customer</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default NewCustomer;
