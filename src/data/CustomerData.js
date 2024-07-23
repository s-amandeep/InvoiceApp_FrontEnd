const CustomerData = [
  { id: 0, name: "Retail Customer" },
  { id: 1, name: "V Shop" },
  { id: 2, name: "Topaz" },
  { id: 3, name: "Ice Berg" },
  { id: 4, name: "Plaza" },
];

const addCustomer = (newCustomer) => {
  CustomerData.push(newCustomer);
};

export { CustomerData, addCustomer };
