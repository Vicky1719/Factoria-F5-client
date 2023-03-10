import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Signup() {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFirstnameChange = (e) => setFirstname(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      firstname: firstname,
      username: username,
      email: email,
      password: password,
    };

    try {
      await signupService(newUser);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 406) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <div className="fondo">
      <div
        style={{
          width: 700,
          padding: 30,
        }}
      >
        <h1>Regístrate</h1>
        <Form className="form" onSubmit={handleSignup}>
          <Form.Group>
            <Form.Label>Usuario:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre y Apellidos:</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={firstname}
              onChange={handleFirstnameChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Button
            type="submit"
            className="btn btn-light"
            variant="light"
            onClick={handleSignup}
          >
            Regístrate
          </Button>{" "}
          {errorMessage !== "" && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Signup;
