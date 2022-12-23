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
  const [descriptionInput, setDescriptionInput] = useState("");
  const [letterInput, setLetterInput] = useState();
  const [musicInput, setMusicInput] = useState("");
  const [songInput, setSongInput] = useState("");

  const handleNameChange = (event) => setNameInput(event.target.value);
  const handleDescriptionChange = (event) =>
    setDescriptionInput(event.target.value);
  const handleLetterChange = (event) => setLetterInput(event.target.value);
  const handleMusicChange = (event) => setMusicInput(event.target.value);
  const handleSongChange = (event) => setSongInput(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCreation = {
      name: nameInput,
      description: descriptionInput,
      letter: letterInput,
      music: musicInput,
      song: songInput,
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
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={descriptionInput}
            onChange={handleDescriptionChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Letra de la canción:</Form.Label>
          <Form.Control
            ype="text"
            name="letter"
            value={letterInput}
            onChange={handleLetterChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Música:</Form.Label>
          <Form.Control
            type="text"
            name="music"
            value={musicInput}
            onChange={handleMusicChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Canción completa:</Form.Label>
          <Form.Control
            type="text"
            name="song"
            value={songInput}
            onChange={handleSongChange}
          />
        </Form.Group>
        <Button type="submit">Crear</Button>
      </Form>
    </div>
  );
}

export default CreationCreate;