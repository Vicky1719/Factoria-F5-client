import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProfileDetailsService } from "../services/profile.services";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function Profile() {
  const navigate = useNavigate();

  const { userId } = useParams();

  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getProfileDetailsService();
      setDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="perfil">
      <h2>Hola! {details.username} </h2>

      <div className="botones">
        <Link to={"/profile/edit"}>
          <Button type="submit" className="btn btn-light" variant="light">
            Editar
          </Button>{" "}
        </Link>
        <Link to={"/profile/new-creation"}>
          <Button type="submit" className="btn btn-light" variant="light">
            Crear una nueva imagen
          </Button>{" "}
        </Link>
        <Link to={"/profile/my-creation"}>
          <Button type="submit" className="btn btn-light" variant="light">
            Mis imágenes
          </Button>{" "}
        </Link>
      </div>
    </div>
  );
}
export default Profile;
