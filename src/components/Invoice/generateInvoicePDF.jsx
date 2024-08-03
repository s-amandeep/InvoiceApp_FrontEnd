import html2pdf from "html2pdf.js";
import "./InvoicePDF.css";

const generateInvoicePDF = ( formData, companyName ) => {
  // Initialize jsPDF instance
  // const doc = new jsPDF();

  // Calculate total price
  const invoiceTotal = formData.items.reduce(
    (acc, item) => acc + item.quantity * item.pricePerUnit,
    0
  );

  // Generate HTML content for the PDF
  const invoiceContent = `
  <div class="invoice-container">
    <div class="header">
      <h1> ${companyName} </h1>
      <h2>Invoice</h1>
      <div class="header-info">
          <div class="customer-info">            
            <p>Customer Name: ${formData.customerName}</p>
          </div>
          <div class="invoice-date">
            <p>Invoice Date: ${formData.invoiceDate}</p>
          </div>
        </div>
      
    </div>
    <table class="item-table">
      <thead>
        <tr>
          <th>S. No.</th>
          <th>Brand Name</th>
          <th>Description</th>
          <th>MRP</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Price per Unit</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        ${formData.items
          .map(
            (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.brandName}</td>
            <td>${item.description}</td>
            <td>${item.mrp}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td>${item.pricePerUnit}</td>
            <td>${item.totalAmount}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
    <div class="total">
    <p>Total Invoice Amount: &#8377; ${invoiceTotal.toFixed(2)}</p>
    </div>
    </div>
  `;
  
  // Options for pdf generation
  const options = {
    filename: "invoice.pdf",
    margin: [10, 10, 10, 10], // [top, left, bottom, right]
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Generate PDF
  // html2pdf().from(invoiceContent).set(options).save();
  // Generate PDF
  const pdfPromise = html2pdf().from(invoiceContent).set(options).outputPdf();

  // Share PDF via WhatsApp (replace with actual phone number or contact)
  // Handle PDF generation completion
  pdfPromise.then(pdf => {
    // Simulate saving PDF (replace with actual saving logic)
    const pdfBlob = new Blob([pdf], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Simulate sharing via WhatsApp (replace with actual share mechanism)
    const whatsappUrl = `https://wa.me/?text=Invoice PDF&${pdfUrl}`;
    window.open(whatsappUrl);
  });
};

export default generateInvoicePDF;
