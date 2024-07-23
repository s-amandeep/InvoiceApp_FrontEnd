
const DropDownSelection = ({ children, itemId, itemArray, selectionTitle, onAddNew }) => {
    
    const handleItemSelectChange = (event) => {
        const { value } = event.target;
    
        setFormData((formData) => ({
          ...formData,
          newItem: {
            ...formData.newItem,
            // [name]: value,
            itemId: value,
            brandName: "",
            description: "",
            mrp: "",
          },
        }));
      };
      
  return (
    <label className="form-text-color">
      {children}
      <select
        name="itemId"
        value={itemId}
        onChange={handleItemSelectChange}
      >
        <option value="">Select an item</option>
        {itemArray.map((item) => (
          <option key={item.id} value={item.id}>
            {selectionTitle}
          </option>
        ))}
      </select>
    </label>
  );
};

export default DropDownSelection;
