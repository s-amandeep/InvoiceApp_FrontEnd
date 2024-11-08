import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/auth-interceptor";
import "./Invoice.css";
import ProductModal from "./ProductModal";
import InvoicePdf from "./InvoicePdf";
import { jwtDecode } from "jwt-decode";
("./ProductModal");

const Invoice = () => {
  const [customers, setCustomers] = useState([]);
  const [userRole, setUserRole] = useState("ROLE_USER"); // Initialize state for user role
  const [invoice, setInvoice] = useState({
    customerId: "",
    invoiceDate: "",
    items: [],
    totalTax: 0,
    totalValue: 0,
  });
  const [showCreateInvoice, setShowCreateInvoice] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [pdfData, setPdfData] = useState(false);
  const [dataFromBackend, setDataFromBackend] = useState(null);

  useEffect(() => {
    // Fetch customers from backend
    fetchCustomers();
    const jwtToken = localStorage.getItem("jwtToken");
    const role = jwtDecode(jwtToken).roles[0];
    setUserRole(role);
  }, []);

  const fetchCustomers = () => {
    axiosInstance
      .get("/user/customers")
      // .get("http://localhost:8080/api/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const handleInputChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotalInvoiceValue = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      return 0;
    }

    const total = items
      .reduce((total, item) => {
        const quantity = parseFloat(item.quantity) || 0;
        const sellingPrice = parseFloat(item.sellingPrice) || 0;
        const itemTotal = quantity * sellingPrice;
        return total + itemTotal;
      }, 0)
      .toFixed(2);

    return total;
  };

  const calculateTotalTaxValue = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      return 0;
    }

    const totalCess = items.reduce((totalCess, item) => {
      if (item.cessRate === 0) {
        return totalCess;
      }
      const quantity = parseFloat(item.quantity) || 0;
      const sellingPrice = parseFloat(item.sellingPrice) || 0;
      const itemTotal = quantity * sellingPrice;
      const cess =
        (itemTotal / (1 + (item.taxRate + item.cessRate) / 100)) *
        (item.cessRate / 100);
      console.log(cess);
      return totalCess + cess;
    }, 0);

    const totalTax = items.reduce((totalTax, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const sellingPrice = parseFloat(item.sellingPrice) || 0;
      const itemTotal = quantity * sellingPrice;
      const tax =
        (itemTotal / (1 + (item.taxRate + item.cessRate) / 100)) *
        (item.taxRate / 100);
      return totalTax + tax;
    }, 0);

    return totalCess + totalTax;
  };

  const resetInvoice = () => {
    setInvoice({
      customerId: "",
      invoiceDate: "",
      items: [],
      totalTax: 0,
      totalValue: 0,
    });
    setShowCreateInvoice(true);
    setPdfData(false);
  };

  const getTaxDisplay = (tax, cess) => {
    if (cess === 0) {
      return "CGST + SGST " + tax + "%";
    } else {
      return "CGST + SGST " + tax + "%" + " + Cess " + cess + "%";
    }
  };

  const getTaxableValue = (amount, tax, cess) => {
    if (cess === 0) {
      return (amount / (1 + tax / 100)).toFixed(2);
    } else {
      return (amount / (1 + (tax + cess) / 100)).toFixed(2);
    }
  };

  const numberToWords = (num) => {
    const belowTwenty = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (num < 20) return belowTwenty[num];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] +
        (num % 10 ? " " + belowTwenty[num % 10] : "")
      );
    if (num < 1000)
      return (
        belowTwenty[Math.floor(num / 100)] +
        " Hundred" +
        (num % 100 ? " " + numberToWords(num % 100) : "")
      );
    if (num < 1000000)
      return (
        numberToWords(Math.floor(num / 1000)) +
        " Thousand" +
        (num % 1000 ? " " + numberToWords(num % 1000) : "")
      );

    return ""; // You can extend this for larger numbers if needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(invoice);

    // Submit the invoice data to the backend
    axiosInstance
      .post("/user/invoices", invoice)
      .then((response) => {
        console.log("Invoice created:", response.data);
        setDataFromBackend(response.data);
        setPdfData(true);
        setShowCreateInvoice(false);
        // Reset the form after submission
        setInvoice({
          customerId: "",
          invoiceDate: "",
          items: [],
          totalTax: 0,
          totalValue: 0,
        });
      })
      .catch((error) => console.error("Error creating invoice:", error));
  };

  const handleAddItem = (item) => {
    setInvoice((prevInvoice) => {
      const updatedItems = [...prevInvoice.items, item];
      console.log(updatedItems);
      const totalValue = calculateTotalInvoiceValue(updatedItems);
      const totalTax = calculateTotalTaxValue(updatedItems);

      if (userRole === "ROLE_USER") {
        const userInvoiceDate = new Date().toISOString();
        return {
          ...prevInvoice,
          invoiceDate: userInvoiceDate,
          items: updatedItems,
          totalTax: totalTax,
          totalValue: totalValue, // Assuming totalValue is part of invoice state
        };
      } else {
        return {
          ...prevInvoice,
          items: updatedItems,
          totalTax: totalTax,
          totalValue: totalValue, // Assuming totalValue is part of invoice state
        };
      }      
    });
    setShowModal(false);
  };

  // Function to remove product from the list
  const removeProduct = (index) => {
    setInvoice((prevInvoice) => {
      const updatedItems = prevInvoice.items.filter((_, i) => i !== index);
      console.log(updatedItems);
      const totalValue = calculateTotalInvoiceValue(updatedItems);
      const totalTax = calculateTotalTaxValue(updatedItems);
      return {
        ...prevInvoice,
        items: updatedItems,
        totalTax: totalTax,
        totalValue: totalValue, // Assuming totalValue is part of invoice state
      };
    });
  };

  return (
    <div>
      <div className="invoice-container">
        {showCreateInvoice ? (
          <div>
            <h1>Create Invoice</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Customer</label>
                <select
                  name="customerId"
                  value={invoice.customerId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              {userRole === "ROLE_ADMIN" && (
                <div className="form-group">
                  <label>Invoice Date</label>
                  <input
                    type="date"
                    name="invoiceDate"
                    value={invoice.invoiceDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              <button type="button" onClick={() => setShowModal(true)}>
                Add Product
              </button>
              <div className="product-list">
                <h2>Products</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      {/* <th>HSN Code</th> */}
                      <th>Unit</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      {/* <th>Tax</th> */}
                      {/* <th>Taxable Value</th> */}
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.brandName +
                            " - " +
                            item.description +
                            " - MRP " +
                            item.price +
                            "/-"}
                        </td>
                        {/* <td>{item.hsnCode}</td> */}
                        <td>{item.unitOfMeasurement}</td>
                        <td>{item.quantity}</td>
                        <td>&#8377;{item.sellingPrice.toFixed(2)}</td>
                        {/* <td>CGST + SGST {item.taxRate}%</td>                         */}
                        {/* <td>{getTaxDisplay(item.taxRate, item.cessRate)}</td> */}
                        {/* <td>&#8377;{getTaxableValue(item.totalPrice.toFixed(2), item.taxRate, item.cessRate)}</td> */}
                        <td>&#8377;{item.totalPrice.toFixed(2)}</td>
                        <button onClick={() => removeProduct(index)}>
                          Remove
                        </button>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="total-value">
                <h3>
                  Total Invoice Value: &#8377;{Math.round(invoice.totalValue)}
                </h3>
              </div>
              {/* <div className="total-value">
                <h3>Total Tax: &#8377;{invoice.totalTax.toFixed(2)}</h3>
              </div>
               <div className="total-value">
                <h3>Amount in words: &#8377; {numberToWords(Math.round(invoice.totalValue))} only</h3>
              </div> */}
              <button type="submit">Submit Invoice</button>
              {showModal && (
                <ProductModal
                  setShowModal={setShowModal}
                  addProduct={handleAddItem}
                />
              )}
            </form>
          </div>
        ) : (
          <div>
            {pdfData && (
              <InvoicePdf
                invoice={dataFromBackend}
                reset={resetInvoice}
                resetMessage={"Create New Invoice"}
              >
                Generate PDF
              </InvoicePdf>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
