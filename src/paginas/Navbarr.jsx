import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
      <Nav variant="tabs" defaultActiveKey="/home">
        <Container>
          {isLoggedIn === true ? (
            <Nav className="me-auto links">
              <Nav.Item>
                <Nav.Link href="/">Inicio</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/profile">Perfil</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/creation">Imágenes</Nav.Link>
              </Nav.Item>
              <Nav.Item to="/">
                <Nav.Link href="/" variant="light" onClick={handleLogout}>
                  Cerrar Sesión
                </Nav.Link>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav className="me-auto links">
              <Nav.Item>
                <Nav.Link href="/">Inicio</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/signup">Regístrate</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login">Accede</Nav.Link>
              </Nav.Item>
            </Nav>
          )}
        </Container>
      </Nav>
    </>
  );
}

export default Navbarr;
