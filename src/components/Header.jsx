import reactCoreConcepts from "../assets/react-core-concepts.png";

export default function Header(){
    return (
      <header>
          <img src={reactCoreConcepts} alt="Stylized atom" />
          <h1>Zionique Trading</h1>
          <p>
            One place solution for all your Sales invoices, stock updates and reports!
          </p>
        </header>    
    );
  }