import React from "react";
import navigate from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  creationDetailsService,
  creationEditService,
} from "../services/creation.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreationEdit() {
  const { creationId } = useParams();
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  

  const handleNameChange = (event) => setNameInput(event.target.value);
  const handleImageChange = (event) =>
    setImageInput(event.target.value);
 

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await creationDetailsService(creationId);
      setNameInput(response.data.name);
      setImageInput(response.data.image);

    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCreation = {
      name: nameInput,
      image: imageInput,
      
    };
    try {
      await creationEditService(creationId, newCreation);
      navigate("/creation");
    } catch (error) {
      navigate(error);
    }
  };

  return (
    <div
      className="fondo"
      style={{
        width: 700,
        padding: 30,
      }}
    >
      <h4>Edita tu creación</h4>
      <Form className="form">
        <Form.Group>
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={nameInput}
            onChange={handleNameChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Imagen:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={imageInput}
            onChange={handleImageChange}
          />
        </Form.Group>

        
        <Button onClick={handleSubmit}>Editar</Button>
      </Form>
    </div>
  );
}

export default CreationEdit;