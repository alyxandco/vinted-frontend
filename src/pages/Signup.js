import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedNewsletter, setCheckedNewsletter] = useState(false);
  const [token, setToken] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div className="signup-container">
      <h1>S'inscrire</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          //   console.log(name, email, password, checkedNewsletter);
          try {
            const data = {
              email: email,
              username: name,
              password: password,
              newsletter: checkedNewsletter,
            };
            const result = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/signup",
              data
            );
            // console.log(result.data.token);
            if (result.data.token) {
              const cookieToken = result.data.token;
              setToken(result.data.token);
              Cookies.set("token", cookieToken, { expires: 7 });
              console.log(cookieToken);
              setMessage("");
              // J'affiche une alerte
              alert(`succès`);
            }
            if (!result.data.token) {
              setErrorMessage("");
              // J'affiche une alerte
              alert(`enregistrement impossible`);
              // Sinon
            }
          } catch (error) {
            console.log(error.response);
          }
        }}
      >
        <input
          id="name"
          placeholder="Nom d'utilisateur"
          type="text"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
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
        <div className="newsletter-checkbox-container">
          <div>
            <input
              id="newsletter"
              type="checkbox"
              name="newsletter"
              value={checkedNewsletter}
              onChange={(event) => {
                setCheckedNewsletter(true);
              }}
            />
          </div>
          <h3>S'inscrire à notre newsletter</h3>
          <div>
            <p className="newsletter-checkbox-text">
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
        </div>
        <button className="signup-button" type="submit">
          S'inscrire
        </button>
        <p className="newsletter-checkbox-login">
          Tu as déjà un compte ? Connecte-toi !
        </p>
      </form>
    </div>
  );
};

export default Signup;
