import { createContext, useState, useEffect } from "react";
import { verifyService } from "../services/auth.services";
import Spinner from "react-bootstrap/Spinner";
const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    authenticatorUser();
  }, []);

  const authenticatorUser = async () => {
    try {
      const response = await verifyService();

      setIsLoggedIn(true);
      setUser(response.data);
      setIsFetching(false);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      setIsFetching(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    user,
    authenticatorUser,
    setIsLoggedIn,
    setUser,
  };

  if (isFetching === true) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
