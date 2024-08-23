import React, { useState, useEffect } from "react";
import axios from "axios";
import InvoicePdf from "./InvoicePdf";

const InvoiceList = () => {
  const [invoicesList, setInvoicesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showInvoicesList, setShowInvoicesList] = useState(false);

  useEffect(() => {
    // Fetch invoices from backend
    fetchInvoices(currentPage);
  }, [currentPage]);

  const fetchInvoices = (page) => {
    axios
      .get(`http://localhost:8080/api/invoices?page=${page}&size=10`)
      .then((response) => {
        console.log(response.data);
        setInvoicesList(response.data.content);
        setTotalPages(response.data.totalPages);
        setShowInvoicesList(true);
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  };

  const deleteInvoice = (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:8080/api/invoices/${invoiceId}`)
        .then(() => {
          fetchInvoices(currentPage); // Refresh the invoice list after deletion
        })
        .catch((error) => {
          console.error("There was an error deleting the invoice!", error);
        });
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const fetchInvoiceById = (invoiceId) => {
    axios
      .get(`http://localhost:8080/api/invoices/${invoiceId}`)
      .then((response) => {
        console.log(response.data);
        setSelectedInvoice(response.data);
        setShowInvoicesList(false);
      })
      .catch((error) => console.error("Error fetching invoice:", error));
  };

  const resetView = () => {
    setSelectedInvoice(null);
    setShowInvoicesList(true);
  };

  return (
    <div>
      {showInvoicesList ? (
        <div>
          <h2>All Invoices</h2>
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Customer Name</th>
                <th>Invoice Date</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoicesList.map((inv) => (
                <tr key={inv.invoiceId}>
                  <td>{inv.invoiceId}</td>
                  <td>{inv.customerName}</td>
                  <td>{inv.invoiceDate}</td>
                  <td>₹ {inv.totalValue}</td>
                  <td class="pagination">
                    <button onClick={() => fetchInvoiceById(inv.invoiceId)}>
                      View
                    </button>
                    <button onClick={() => deleteInvoice(inv.invoiceId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => handlePageChange(i)} className={i === currentPage ? 'active' : ''}>
                        {i + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
      ) : (
        <div>
          {selectedInvoice && (
            <InvoicePdf
              invoice={selectedInvoice}
              reset={resetView}
              resetMessage={"Back to Invoices List"}
            >
              Generate PDF
            </InvoicePdf>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
