import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div className="signup-container">
      <h1>Se connecter</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          //   console.log(email, password);
          try {
            const data = {
              email: email,
              password: password,
            };
            const result = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/login",
              data
            );
            console.log(result.data.token);
            if (result.data.token) {
              const cookieToken = result.data.token;
              setToken(result.data.token);
              Cookies.set("token", cookieToken, { expires: 7 });
              console.log("cookie : ", cookieToken);
              setMessage("");
              // J'affiche une alerte
              alert(`connecté`);
            }
            if (!result.data.token) {
              setErrorMessage("");
              // J'affiche une alerte
              alert(`enregisconnexion impossible`);
              // Sinon
            }
          } catch (error) {
            console.log(error.response);
          }
        }}
      >
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
        <p className="newsletter-checkbox-login">
          Pas encore de compte ? inscris-toi !
        </p>
      </form>
    </div>
  );
};

export default Login;
