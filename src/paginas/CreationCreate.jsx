import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createCreationService } from "../services/creation.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreationCreate() {
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
getData()
  },[])


  const getData = async() => {
    try {
const response = await createCreationService()
console.log("lupa", response.data)
    }catch(error) {
      navigate("/error");
    }
  }

  const handleNameChange = (event) => setNameInput(event.target.value);
  const handleImageChange = (event) => setImageInput(event.target.value);

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
      navigate("/error");
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
          <Form.Label htmlForm="image">Imagen:</Form.Label>
          <input
            type="file" name="image"
            onChange={handleImageChange}>
          </input>
        </Form.Group>

        <Button type="submit">Crear</Button>
      </Form>
    </div>
  );
}

export default CreationCreate;
