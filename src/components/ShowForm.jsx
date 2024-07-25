import React, { useState } from "react";
import AddButton from "./AddButton";
import NewInvoice from "./NewInvoice";
import NewItem from "./NewItem";

function ShowForm({props, children}) {
  const [showForm, setShowForm] = useState(false);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  let componentToRender;

  componentToRender = <NewInvoice onClose={handleCloseForm} />;
  // if (props === "Invoice") {
  //   componentToRender = <NewInvoice onClose={handleCloseForm} />;
  // } else {
  //   componentToRender = <NewItem onClose={handleCloseForm} />;
  // }

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
