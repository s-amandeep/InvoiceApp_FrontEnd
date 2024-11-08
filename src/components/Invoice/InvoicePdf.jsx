import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InvoicePdf = ({ invoice, reset, resetMessage }) => {
  const invoiceRef = useRef();
  const [additionalMobile, setAdditionalMobile] = useState("");

  const generatePdf = () => {
    const element = invoiceRef.current;
    console.log(invoice);

    // Generate the PDF
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate scaling factor to fit the canvas into the PDF
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const scaleFactor = Math.min(
        pdfWidth / canvasWidth,
        pdfHeight / canvasHeight
      );

      const imgWidth = canvasWidth * scaleFactor;
      const imgHeight = canvasHeight * scaleFactor;

      // Center the image on the page
      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = 10; // You can adjust this value to control vertical positioning

      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(`Invoice_${invoice.invoiceId}.pdf`); // Trigger the download
    });
    //   .then((pdfUrl) => {
    //     sendWhatsAppMessage(pdfUrl);
    //   });
  };

  //   const sendWhatsAppMessage = (pdfUrl) => {
  const sendWhatsAppMessage = () => {
    const mobileNumbers = [invoice.customerMobile];
    if (additionalMobile) {
      mobileNumbers.push(additionalMobile);
    }
    const encodedMessage = encodeURIComponent(
      `Invoice for ${invoice.customerName} - Total Amount: ₹${invoice.totalValue}`
    );

    mobileNumbers.forEach((mobile) => {
      const whatsappUrl = `https://wa.me/${mobile}?text=${encodedMessage}&url=${pdfUrl}`;
      window.open(whatsappUrl, "_blank");
    });
  };

  const handleAdditionalMobileChange = (e) => {
    setAdditionalMobile(e.target.value);
  };

  const handleCreateNewInvoice = () => {
    // Reset the invoice and navigate back to the parent component
    reset();
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
      return (amount/(1+tax/100)).toFixed(2);
    } else {
      return (amount/(1+ (tax+cess)/100)).toFixed(2);
    }
  }

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

  return (
    <div>
      {/* Invoice Content */}
      <div ref={invoiceRef} style={styles.invoiceContainer}>
        <div style={styles.companyHeader}>
          <h1 style={styles.companyName}>Zionique Trading LLP</h1>
          <p style={styles.companyDetails}>Jora Phatak Road, Dhanbad</p>
          <p style={styles.companyDetails}>+91 9110078517</p>
          <p style={styles.companyDetails}>GSTIN: 20AABFZ9147J1ZD</p>
        </div>

        <h2 style={styles.invoiceTitle}>Invoice</h2>

        <div style={styles.customerDetails}>
          <p style={styles.invoiceDate}>
            <strong>Invoice Date:</strong> {invoice.invoiceDate}
          </p>
          <p style={styles.invoiceDate}>
            <strong>Invoice Number:</strong> {invoice.invoiceId}
          </p>
          <p>
            Customer Details: <strong> {invoice.customerName}</strong>
            {", "}
            {invoice.customerAddress}
            {" -- Mob: "}
            {invoice.customerMobile}
          </p>
          {/* <p>
            <strong>Customer Address:</strong> {invoice.customerAddress}
          </p>
          <p>
            <strong>Customer Mobile:</strong> {invoice.customerMobile}
          </p> */}
          <p>
            Customer GSTIN: <strong> {invoice.customerGstin} </strong>
          </p>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              {/* <th style={styles.tableHeader}>Brand</th>
              <th style={styles.tableHeader}>MRP</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>Quantity</th>
              <th style={styles.tableHeader}>Selling Price</th>
              <th style={styles.tableHeader}>Total Price</th> */}

              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>HSN Code</th>
              <th style={styles.tableHeader}>Quantity</th>
              <th style={styles.tableHeader}>Unit</th>              
              <th style={styles.tableHeader}>Unit Price</th>
              <th style={styles.tableHeader}>Tax</th>
              <th style={styles.tableHeader}>Taxable Value</th>
              <th style={styles.tableHeader}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.itemDtoList.map((item, index) => (
              <tr key={index} style={styles.tableRow}>
                {/* <td style={styles.tableCell}>{item.brandName}</td>
                <td style={styles.tableCell}>₹{item.price}</td>
                <td style={styles.tableCell}>{item.description}</td>
                <td style={styles.tableCell}>{item.quantity}</td>
                <td style={styles.tableCell}>₹{item.sellingPrice}</td>
                <td style={styles.tableCell}>₹{item.totalPrice}</td> */}

                <td style={styles.tableCell}>
                  {item.brandName +
                    " - " +
                    item.description +
                    " - MRP " +
                    item.price +
                    "/-"}
                </td>
                <td style={styles.tableCell}>{item.hsnCode}</td>
                <td style={styles.tableCell}>{item.quantity}</td>
                <td style={styles.tableCell}>{item.unitOfMeasurement}</td>                
                <td style={styles.tableCell}>
                  &#8377;{item.sellingPrice.toFixed(2)}
                </td>
                <td style={styles.tableCell}>
                  {getTaxDisplay(item.taxRate, item.cessRate)}
                </td>
                <td style={styles.tableCell}>&#8377;{getTaxableValue(item.totalPrice.toFixed(2), item.taxRate, item.cessRate)}</td>
                <td style={styles.tableCell}>
                  &#8377;{item.totalPrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.totalAmount}>
          <h3>Total Amount: ₹{invoice.totalValue}</h3>
        </div>
        <div style={styles.totalAmount}>
          <h3>Total Tax: ₹{invoice.totalTax.toFixed(2)}</h3>
        </div>

        <div style={styles.totalAmount}>
          <h3>
            Amount in words: &#8377;{" "}
            {numberToWords(Math.round(invoice.totalValue))} only
          </h3>
        </div>
      </div>

      {/* Generate PDF Button */}
      {/* <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={generatePdf}>Download Invoice PDF</button>
      </div> */}
      {/* Add extra mobile number */}
      <div style={{ marginTop: "20px" }}>
        <label style={styles.label}>
          Additional Mobile Number:
          <input
            type="text"
            value={additionalMobile}
            onChange={handleAdditionalMobileChange}
            placeholder="Enter mobile number"
            style={styles.input}
          />
        </label>
      </div>

      {/* Buttons to Download PDF and Share via WhatsApp */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={generatePdf} style={styles.button}>
          Download Invoice PDF
        </button>
        <button onClick={sendWhatsAppMessage} style={styles.button}>
          Share Invoice via WhatsApp
        </button>
        <button
          onClick={handleCreateNewInvoice}
          style={styles.newInvoiceButton}
        >
          {resetMessage}
        </button>
      </div>
    </div>
  );
};

export default InvoicePdf;

// Styles object for better maintainability
const styles = {
  invoiceContainer: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
    color: "#000", // Jet black font color
    backgroundColor: "#fff", // White background
  },
  companyHeader: {
    textAlign: "center",
    marginBottom: "20px",
  },
  companyName: {
    fontSize: "24px",
    margin: "0",
    fontWeight: "bold",
  },
  companyDetails: {
    fontSize: "12px",
    margin: "2px 0",
  },
  invoiceTitle: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "20px",
    textDecoration: "underline",
  },
  invoiceDate: {
    textAlign: "right",
    fontSize: "14px",
  },
  invoiceNumber: {
    textAlign: "left",
    fontSize: "14px",
  },
  customerDetails: {
    marginBottom: "20px",
    fontSize: "14px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  tableHeader: {
    border: "1px solid #000",
    padding: "10px",
    fontWeight: "bold",
    backgroundColor: "#f2f2f2", // Light grey background for headers
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    border: "1px solid #000",
    padding: "8px",
    textAlign: "center",
  },
  totalAmount: {
    marginTop: "20px",
    textAlign: "right",
    fontSize: "18px",
    fontWeight: "bold",
  },
  button: {
    padding: "10px 20px",
    margin: "5px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  newInvoiceButton: {
    padding: "10px 20px",
    margin: "5px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#008CBA",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};
