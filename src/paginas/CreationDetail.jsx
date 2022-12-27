import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  creationDetailsService,
  creationDeleteService,
} from "../services/creation.services";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Spinner from "react-bootstrap/Spinner";
import Button from 'react-bootstrap/Button';

function CreationDetail() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { creationId } = useParams();
  const [isFetching, setIsFetching] = useState(true);
  const [creationDetail, setCreationDetails] = useState("");

  useEffect(() => {
    getCommentAdd();
  }, []);

  const getCommentAdd = async () => {
    try {
      const response2 = await creationDetailsService(creationId);
      setCreationDetails(response2.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await creationDeleteService(creationId);

      navigate("/profile/my-creation");
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
    <div>
      
      <h2>Detalles</h2>
      <p>Nombre: {creationDetail.name}</p>
      <p>Imagen:</p>
      <br/>
         {<img src={creationDetail.image} alt="photo-detail" width={200} />}      
      {user.user._id === creationDetail.user && (
        <Link to={`/creation/${creationId}/edit`}>
<br/>
<Button type="submit" variant="outline-primary">Editar</Button>{' '}

          </Link>
        )}
{user.user._id === creationDetail.user && (
            <Button type="submit" variant="outline-primary" onClick={handleDelete}>Borrar</Button>


        )}


    </div>
  );
}

export default CreationDetail;