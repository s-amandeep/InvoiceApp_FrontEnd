const CustomerData = [
  { id: 0, name: "Retail Customer, Dhanbad", phone: 0 },
  { id: 1, name: "V Shop, Purana Bazaar", phone: 9175112456 },
  { id: 2, name: "Topaz, ISM", phone: 789654123 },
  { id: 3, name: "Ice Berg, Shakti Mandir", phone: 1459786325 },
  { id: 4, name: "Plaza, Bank More", phone: 7489652315 },
];

const addCustomer = (newCustomer) => {
  CustomerData.push(newCustomer);
};

export { CustomerData, addCustomer };
