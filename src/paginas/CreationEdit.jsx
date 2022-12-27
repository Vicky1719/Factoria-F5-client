

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
  import { uploadImageService } from "../services/upload.services";
  
  
  function CreationEdit() {
    const { creationId } = useParams();
    const navigate = useNavigate();
    const [nameInput, setNameInput] = useState("");
    const [imageInput, setImageInput] = useState("");
    const [isUploadingImage, setIsUploadingImage] = useState(false)
  
    const handleNameChange = (event) => setNameInput(event.target.value);
  
   
  
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
  
    const handleImageChange = async (event) => {
      setIsUploadingImage(true)
      console.log(event.target.files[0])
  
      const sendForm = new FormData()
      sendForm.append("image", event.target.files[0])
  
      try {
        const response = await uploadImageService(sendForm)
        console.log(response.data.image)
        setImageInput(response.data.image)
        setIsUploadingImage(false)
      } catch (error) {
        console.log(error)
      }
    }
  
  
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
            <Form.Label htmlFor="image">Imagen:</Form.Label>
        <input type="file" name="image" onChange={handleImageChange}></input>
        <br />
        {isUploadingImage === true && <p>... loading content</p>}
        {imageInput !== "" ? <img src={imageInput} alt="image" width={200} /> : <p> Elegir Imagen </p>}
          </Form.Group>
         
          <Button type="submit" className="btn btn-light" variant="light" >Editar</Button>{' '}

        </Form>
      </div>
    );
  }
  
  export default CreationEdit;