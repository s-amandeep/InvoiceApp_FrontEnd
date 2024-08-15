import React from 'react';
import Header from "./components/Header";
import ShowForm from "./components/ShowForm";

function App() {  

  return (
    <div className='App'>
      <Header />
      <main className='core-concepts'>        
        <ShowForm props={"Invoice"}>Invoices</ShowForm>
        <br />
        <ShowForm props={"Product"}>Products</ShowForm>
        <br />        
        <ShowForm props={"Customer"}>Customers</ShowForm>
      </main>
    </div>
  );
}

export default App;
