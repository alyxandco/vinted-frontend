import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    //   console.log(email, password);
    setErrorMessage("");
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        data
      );
      console.log(response.data);
      if (response.data.token) {
        //   const cookieToken = response.data.token;
        handleToken(response.data.token);
        console.log("cookie : ", response.data.token);
        // J'affiche une alerte
        alert(`connecté`);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "User not found") {
        setErrorMessage("Utilisateur et/ou mot de passe inconnu");
        alert(`Utilisateur et/ou mot de passe inconnu`);
      }
      if (error.response.data.error === "Unauthorized") {
        setErrorMessage("Utilisateur et/ou mot de passe incorrect");
        alert(`Utilisateur et/ou mot de passe incorrect`);
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Se connecter</h1>
      <form onSubmit={handleLogin}>
        <input
          id="email"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          id="password"
          placeholder="Mot de passe"
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button className="signup-button" type="submit">
          Se connecter
        </button>
        <Link to="/Signup">
          <p className="newsletter-checkbox-login">
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            Pas encore de compte ? inscris-toi !
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
