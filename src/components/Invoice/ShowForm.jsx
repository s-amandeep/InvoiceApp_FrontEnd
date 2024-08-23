import React, { useState } from "react";
import AddButton from "../AddButton";
import NewProduct from "../Product/NewProduct";
import NewCustomer from "../Customer/NewCustomer";
import Invoice from "../InvoiceNew/Invoice";
import InvoiceList from "../InvoiceNew/InvoiceList";

function ShowForm({ props, children }) {
  const [showForm, setShowForm] = useState(false);
  // const [showInvoice, setShowInvoice] = useState(false);
  // const [showInvoiceList, setShowInvoiceList] = useState(false);
  // const [showProduct, setShowProduct] = useState(false);
  // const [showCustomer, setShowCustomer] = useState(false);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  let componentToRender;

  // componentToRender = <NewInvoice onClose={handleCloseForm} />;
  if (props === "Invoice") {
    componentToRender = <Invoice onClose={handleCloseForm} />;
    // setShowInvoice(true);
    // setShowInvoiceList(false);
    // setShowProduct(false);
    // setShowCustomer(false);
  } else if (props === "InvoiceList") {
    componentToRender = <InvoiceList onClose={handleCloseForm} />;
  } else if (props === "Product") {
    componentToRender = <NewProduct onClose={handleCloseForm} />;
  } else if (props === "Customer") {
    componentToRender = <NewCustomer onClose={handleCloseForm} />;
  } else {
    componentToRender = <div></div>;
  }

  return (
    <div>
      {!showForm ? (
        <AddButton onAddNew={handleAddNew}>{children}</AddButton>
      ) : (
        componentToRender
      )}
    </div>
  );
}

export default ShowForm;
