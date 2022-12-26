import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createCreationService } from "../services/creation.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreationCreate(props) {
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const handleNameChange = (event) => setNameInput(event.target.value);
  const handleImageChange = (event) =>
    setImageInput(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCreation = {
      name: nameInput,
      image: imageInput,
    };
    try {
      await createCreationService(newCreation);
      navigate("/profile/my-creation");
    } catch (error) {
      navigate(error);
    }
  };

  return (
    <div className="fondo" style={{ width: 700, padding: 30 }}>
      <h1>Crea tu nueva creación</h1>
      <Form className="form" onSubmit={handleSubmit}>
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
            name="image"
            value={imageInput}
            onChange={handleImageChange}
          />
        </Form.Group>

               <Button type="submit">Crear</Button>
      </Form>
    </div>
  );
}

export default CreationCreate;