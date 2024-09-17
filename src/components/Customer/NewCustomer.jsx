import React, { useState, useEffect } from 'react';
import axios from "axios";

const NewCustomer = () => {
  // State for form fields
  const [customers, setCustomers] = useState([]);  
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    address: "",
    mobile: ""
  });  

  useEffect(() => {
    fetchCustomers();    
  }, []);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchCustomers = () => {
    axios
      .get("http://localhost:8080/api/customers")
      .then((response) => {
        setCustomers(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customers!", error);
      });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // setError('');
    // setSuccess('');  

    try {
        axios.post("http://localhost:8080/api/customers", newCustomer);        
        setNewCustomer({
          name: "",
          address: "",
          mobile: "",
        });          

      setSuccess('Customer added successfully!');
      fetchCustomers();
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  // Handle phone number input change
  const handlePhoneNumberChange = (e) => {
    const {name, value} = e.target;
    
    // Allow only digits and limit to 10 characters
    if (/^\d{0,10}$/.test(value)) {
      setNewCustomer({ ...newCustomer, [name]: value });
      // setPhoneNumber(value);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
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
              name="name"
              value={newCustomer.name}
              onChange={handleChange}   
              placeholder="Customer Name"           
              required
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={newCustomer.address}
              onChange={handleChange}
              placeholder="Customer Address"  
              required
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input
              name="mobile"
              type="text"
              value={newCustomer.mobile}
              onChange={handlePhoneNumberChange}
              placeholder="Phone Number"  
              maxLength={10} // HTML attribute to limit input length
              required
            />
          </label>
        </div>
        <button type="submit">Add Customer</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <h2>Customer List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>            
            <th>Address</th>
            <th>Phone Number</th>
            {/* <th>Actions</th>  */}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.address}</td>                       
              <td>{customer.mobile}</td>
              {/* <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(customer.id)}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewCustomer;
