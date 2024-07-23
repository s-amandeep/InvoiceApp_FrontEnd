const TableComponent = ({ formData, handleDeleteItem }) => {
  
  // Calculate total price
  const invoiceTotal = formData.items.reduce(
    (acc, item) => acc + item.quantity * item.pricePerUnit,
    0
  );

  return (
    <div className="invoice-table-container">
      <table className="invoice-table">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Brand</th>
            <th>Description</th>
            <th>MRP</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price per Unit</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {formData.items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.brandName}</td>
              <td>{item.description}</td>
              <td>&#8377; {item.mrp}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>&#8377; {item.pricePerUnit}</td>
              <td>&#8377; {item.quantity * item.pricePerUnit}</td>
              <td>
                <button onClick={() => handleDeleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr className="total-row">
            <td colSpan="4" style={{ textAlign: "right" }}>
              Total:
            </td>
            <td>&#8377; {invoiceTotal.toFixed(2)}</td>
            <td></td> {/* Empty cell to align with header columns */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
