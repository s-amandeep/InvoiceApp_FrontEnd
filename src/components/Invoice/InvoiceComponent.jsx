import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Base64 string of Roboto-Regular.ttf (This is just an example, you should replace it with your actual base64 encoded font)
const robotoFontBase64 = '...base64 string...';

const InvoiceComponent = ({ invoice }) => {

    const generatePdf = () => {
        const doc = new jsPDF();
        console.log(invoice);
        
       // Embed the font into jsPDF's vFS
       doc.addFileToVFS("Roboto-Regular.ttf", robotoFontBase64);
       doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
       doc.setFont("Roboto");

        // Company Details
        doc.setFontSize(20);
        doc.text("Zionique Trading LLP", 105, 10, null, null, "center");
        doc.setFontSize(12);
        doc.text("Jora Phatak Road, Dhanbad", 105, 18, null, null, "center");
        doc.text("GST: 20..........", 105, 24, null, null, "center");
        doc.text("+91 9110078517", 105, 30, null, null, "center");
        

        doc.setFontSize(18);
        doc.text("Invoice", 105, 40, null, null, "center");

        // Customer Details
        doc.setFontSize(12);
        doc.text(`Customer Name: ${invoice.customerName}`, 14, 50);
        doc.setFontSize(8);
        doc.text(`Customer Address: ${invoice.customerAddress}`, 14, 58);
        doc.text(`Customer Mobile: ${invoice.customerMobile}`, 14, 66);

        // Invoice Date
        doc.text(`Invoice Date: ${invoice.invoiceDate}`, 100, 58);

        // Add some space
        doc.text(" ", 14, 80);

        // Table Headers
        const tableColumn = ["Brand", "Price", "Description", "Quantity", "Selling Price", "Total Price"];
        const tableRows = [];

        // Table Content
        invoice.itemDtoList.forEach(item => {
            const productData = [
                item.brandName,
                `₹${item.price}`,
                item.description,
                item.quantity,
                `₹${item.sellingPrice}`,
                `₹${item.totalPrice}`
            ];
            tableRows.push(productData);
        });

        // Start position of the table
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 90,
        });

        // Total Amount
        const finalY = doc.autoTable.previous.finalY + 10;
        doc.text(`Total Amount: ₹${invoice.totalValue}`, 14, finalY);

        // Save the PDF
        doc.save(`invoice_${invoice.id}.pdf`);
    };

    return (
        <div>
            <button onClick={generatePdf}>Download Invoice PDF</button>
        </div>
    );
};

export default InvoiceComponent;
