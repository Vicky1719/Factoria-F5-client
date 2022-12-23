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

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await creationDetailsService(creationId);
      setNameInput(response.data.name);
      setDescriptionInput(response.data.description);
      setLetterInput(response.data.letter);
      setMusicInput(response.data.music);
      setSongInput(response.data.song);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCreation = {
      name: nameInput,
      description: descriptionInput,
      letterr: letterInput,
      music: musicInput,
      song: songInput,
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
        <Button onClick={handleSubmit}>Editar</Button>
      </Form>
    </div>
  );
}

export default CreationEdit;