import { useState } from "react";
import { loginService } from "../services/auth.services";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Login() {
  const { authenticatorUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userInfo = {
      email: email,
      password: password,
    };

    try {
      const response = await loginService(userInfo);

      localStorage.setItem("authToken", response.data.authToken);

      authenticatorUser();
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div
      style={{
        width: 700,
        padding: 30,
      }}
    >
      <h1>Accede</h1>
      <Form className="form" onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
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
        
        <Button type="submit" className="btn btn-light" variant="light" >Login</Button>

        {errorMessage !== "" && <p style={{ color: "red" }}>{errorMessage}</p>}
      </Form>
    </div>
  );
}

export default Login;