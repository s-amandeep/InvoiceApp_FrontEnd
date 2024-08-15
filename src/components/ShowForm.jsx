import React, { useState } from "react";
import AddButton from "./AddButton";
import NewInvoice from "./Invoice/NewInvoice";
import NewProduct from "./Product/newProduct";
// import ViewProducts from "./Product/GetAllProducts";
import NewCustomer from "./Customer/NewCustomer";
import Invoice from "./InvoiceNew/Invoice";

function ShowForm({props, children}) {
  const [showForm, setShowForm] = useState(false);

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
  } else if (props === "Product") {
    componentToRender = <NewProduct onClose={handleCloseForm} />;
  // } else if (props === "ViewProducts") {
  //   componentToRender = <ViewProducts onClose={handleCloseForm} />;
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
