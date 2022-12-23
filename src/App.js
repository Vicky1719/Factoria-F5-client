import logo from "./logo.svg";
import "./App.css";
import Navbarr from "./paginas/Navbarr";
import { Routes, Route } from "react-router-dom";
import Signup from "./paginas/Signup";
import Login from "./paginas/Login";
import Home from "./paginas/Home";
import Error from "./paginas/Error";
import NotFound from "./paginas/NotFound";
import Profile from "./paginas/Profile";
import ProfileEdit from "./paginas/ProfileEdit";
import CreationCreate from "./paginas/CreationCreate";
import CreationList from "./paginas/CreationList";
import MyCreations from "./paginas/MyCreations";

function App() {
  return (
    <div className="App">
      <Navbarr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile/new-creation" element={<CreationCreate />} />
        <Route path="/creation" element={<CreationList />} />
        <Route/>

        <Route path="/profile/my-creation" element={<MyCreations />} />

        {/* errores */}

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
