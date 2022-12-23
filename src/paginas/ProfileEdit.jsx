import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { deleteProfileService, getProfileDetailsService, updateProfileService } from "../services/profile.services"
import {AuthContext} from "../context/auth.context"
import { Button } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner'


function Profile() {
const {user} = useContext(AuthContext)
const userId = user.user._id
const navigate = useNavigate()

 

  const [details, setDetails] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  const [usernameInput, setUsernameInput] = useState("")
  const [firstnameInput, setFirstnameInput] = useState("")
  const [lastnameInput, setLastnameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await getProfileDetailsService()
      setDetails(response.data)
      setUsernameInput(response.data.username)
      setFirstnameInput(response.data.firstname)
      setLastnameInput(response.data.lastname)
      setEmailInput(response.data.email)
    
      setIsFetching(false)
    } catch (error) {
      navigate("/error")
    }
  }
  const handleUsernameChange = (event) => setUsernameInput(event.target.value)
  const handleFirstnameChange = (event) => setFirstnameInput(event.target.value)
  const handleLastnameChange = (event) => setLastnameInput(event.target.value)
  const handleEmailChange = (event) => setEmailInput(event.target.value)


  const handleUpdate = async (event) => {

    event.preventDefault()
    const updatedProfile = {
        username: usernameInput,
      firstname: firstnameInput, 
      lastname: lastnameInput,
      email: emailInput
    }
    
    try {
  await updateProfileService(userId, updatedProfile)
  
  navigate("/profile")

  }catch(error) {
    navigate("/error")
  }

  }


  if (isFetching === true) {
    return <h3>...cargando</h3>
  }

  const handleDelete = async () => {
    try {
      await deleteProfileService(userId)

      navigate("/")
    } catch (error) {
      navigate("/error")
    }
  }

  return (
    <div>
     

      <div className='fondo' style={{
width: 700, 
padding: 30 }}>
<h4>Accede</h4>
<Form className="form" onSubmit={handleUpdate}>
<Form.Group>
<Form.Label>Usuario:</Form.Label>
<Form.Control type="text" name="username" value={usernameInput} onChange={handleUsernameChange} />
</Form.Group>

<Form.Group>
<Form.Label>Nombre:</Form.Label>
<Form.Control type="text" name="firstname" value={firstnameInput} onChange={handleFirstnameChange} />
</Form.Group>

<Form.Group>
<Form.Label>Apellidos:</Form.Label>
<Form.Control type="text" name="lastname" value={lastnameInput} onChange={handleLastnameChange} />
</Form.Group>

<Form.Group>
<Form.Label>Email:</Form.Label>
<Form.Control type="text" name="email" value={emailInput} onChange={handleEmailChange} />
</Form.Group>



<Button onClick={handleUpdate}>Actualizar</Button>

      
          
      
      </Form>
  

        
  </div>
    </div>
  )
}

export default Profile