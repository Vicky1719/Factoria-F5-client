import { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbarr() {
  const { authenticatorUser, isLoggedIn, setUser, setIsLoggedIn } =
    useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticatorUser();
  };
  return (
    
    <>
<Navbar bg="light" variant="light">
        <Container>
   
      {isLoggedIn === true ? (
    <Nav className="me-auto">
    <Nav.Link href="/">Inicio</Nav.Link>
    <Nav.Link href="/profile">Perfil</Nav.Link>
    <Nav.Link href="/creation">Imágenes</Nav.Link>
           
         
          <NavLink to="/">
            <button onClick={handleLogout}>Logout</button>
          </NavLink>
        
  </Nav>
      ) : (
        <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/creation">Imágenes</Nav.Link>
            <Nav.Link href="/signup">Regístrate</Nav.Link>
            <Nav.Link href="/login">Accede</Nav.Link>
          </Nav>
            
       
      )}
    
      </Container>
    </Navbar>
  </>
  
  );



      
  
}

export default Navbarr;