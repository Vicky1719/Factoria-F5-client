import React from "react";
import { userCreationService } from "../services/profile.services";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Card from 'react-bootstrap/Card'


function MyCreations() {
  const navigate = useNavigate();

  const [creation, setCreation] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (event) => {
    try {
      const response = await userCreationService();

      setCreation(response.data);
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
    <div>
      {creation.map((eachCreation) => {
        return (
          <p key={eachCreation._id}>
            <Link to={`/creation/${eachCreation._id}`}>
            < Card body style={{width: "250px", textDecoration: "none"}} >{eachCreation.name}<img src={eachCreation.image} alt="photo-creation" width={150} />
</Card>
            </Link>
          </p>
         
        );
      })}
    </div>
  );
}

export default MyCreations;
