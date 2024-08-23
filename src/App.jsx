import React, { useState } from "react";
import Header from "./components/Header";
// import ShowForm from "./components/Invoice/ShowForm";
import NewProduct from "./components/Product/NewProduct";
import NewCustomer from "./components/Customer/NewCustomer";
import Invoice from "./components/InvoiceNew/Invoice";
import InvoiceList from "./components/InvoiceNew/InvoiceList";

function App() {
  const [selected, setSelected] = useState(null);

  // return (
  //   <div className='App'>
  //     <Header />
  //     <main className='core-concepts'>
  //       <ShowForm props={"Invoice"}>Invoice</ShowForm>
  //       <br />
  //       <ShowForm props={"InvoiceList"}>Invoice List</ShowForm>
  //       <br />
  //       <ShowForm props={"Product"}>Products</ShowForm>
  //       <br />
  //       <ShowForm props={"Customer"}>Customers</ShowForm>
  //     </main>
  //   </div>
  // );
  const renderContent = () => {
    switch (selected) {
      case "invoices":
        return <Invoice />;
      case "invoiceList":
        return <InvoiceList />;
      case "products":
        return <NewProduct />;
      case "customers":
        return <NewCustomer />;
      default:
        return null;
    }
  };

  return (
    <div className='App'>
      <Header />
      <div className="navbar">
        <button className="home-button" onClick={() => setSelected(null)}>
          Home
        </button>
      </div>
      {selected === null ? (
        <div className="menu">
          <button onClick={() => setSelected("invoices")}>Invoice</button>
          <button onClick={() => setSelected("invoiceList")}>Invoice List</button>
          <button onClick={() => setSelected("products")}>Products</button>
          <button onClick={() => setSelected("customers")}>Customers</button>
        </div>
      ) : (
        <div className="content">{renderContent()}</div>
      )}
    </div>
  );
}

// }

export default App;
