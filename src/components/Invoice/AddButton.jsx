import React, { useState } from 'react';
import './addButton.css';

const AddButton = ({ children, onAddNew }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddNew = () => {
    setShowForm(true);
    if (onAddNew) {
      onAddNew(); // Optional: You can also trigger a callback if needed
    }
  };

  return (
    <>
      {!showForm && (
        <button type="button" className="add-button" onClick={handleAddNew}>
          {children}
        </button>
      )}
    </>
  );
}

export default AddButton;