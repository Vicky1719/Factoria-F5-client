import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function IsPrivate(props) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === true) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default IsPrivate;