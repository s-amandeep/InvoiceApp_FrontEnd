import React from 'react';
import Header from "./components/Header";
import ShowForm from "./components/ShowForm";

function App() {  

  return (
    <div className='App'>
      <Header />
      <main className='core-concepts'>        
        <ShowForm props={"Invoice"}>Add New Invoice</ShowForm>
        <br />
        <ShowForm props={"Product"}>Add New Product</ShowForm>
        <br />        
        <ShowForm props={"Customer"}>Add New Customer</ShowForm>
      </main>
    </div>
  );
}

export default App;
