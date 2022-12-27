import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { creationListService } from "../services/creation.services";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

function CreationList() {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getCreationList();
  }, []);

  const getCreationList = async () => {
    try {
      const response = await creationListService();
      setList(response.data);
      setIsFetching(false);
    } catch (error) {}
  };

  if (isFetching === true) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="fondo cartas">
      {list.map((eachCreation) => {
        return (
          <p className="fotos" key={eachCreation._id}>
            <Link to={`/creation/${eachCreation._id}`}>
              <Card
                body
                style={{
                  width: "250px",
                  height: "250px",
                  textDecoration: "none",
                }}
              >
                {eachCreation.name}
                <br />
                <img
                  src={eachCreation.image}
                  alt="photo-creation"
                  width={150}
                />
              </Card>
            </Link>
          </p>
        );
      })}
    </div>
  );
}

export default CreationList;
