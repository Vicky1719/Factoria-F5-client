import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCreationService } from "../services/creation.services";
import { uploadImageService } from "../services/upload.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreationCreate() {
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleNameChange = (event) => setNameInput(event.target.value);

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

  const handleImageChange = async (event) => {
    setIsUploadingImage(true);

    const sendForm = new FormData();
    sendForm.append("image", event.target.files[0]);

    try {
      const response = await uploadImageService(sendForm);
      setImageInput(response.data.image);
      setIsUploadingImage(false);
    } catch (error) {}
  };

  return (
    <div className="fondo" style={{ width: 700, padding: 30 }}>
      <h1>Crea tu nueva creación</h1>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre:</Form.Label>

          <Form.Control type="text" name="name" onChange={handleNameChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlForm="image">Imagen:</Form.Label>

          <input type="file" name="image" onChange={handleImageChange}></input>
        </Form.Group>
        <br />
        {isUploadingImage === true && <p>... loading content</p>}
        {imageInput !== "" ? (
          <img src={imageInput} alt="image" width={200} height={160} />
        ) : (
          <p> Cargar imagen </p>
        )}
        <br />
        <Button type="submit" className="btn btn-light" variant="light">
          Subir imagen
        </Button>{" "}
      </Form>
    </div>
  );
}

export default CreationCreate;
