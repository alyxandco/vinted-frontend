import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedNewsletter, setCheckedNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    //   Je fais disparaitre le message d'erreur
    setErrorMessage("");
    try {
      const data = {
        email: email,
        username: name,
        password: password,
        newsletter: checkedNewsletter,
      };
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        data
      );
      if (response.data.token) {
        handleToken(response.data.token);
        navigate("/");
        // J'affiche une alerte
        alert(`Compte enregistré !`);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez créer un compte avec un Email valide."
        );
        alert(`Email déjà utilisé, merci d'utiliser un Email valide.`);
      }
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Merci de remplir tous les champs obligatoires");
        alert(`Merci de remplir tous les champs obligatoires`);
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>S'inscrire</h1>
      <form onSubmit={handleSignup}>
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
          placeholder="Email *"
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          id="password"
          placeholder="Mot de passe *"
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
              checked={checkedNewsletter}
              onChange={(event) => {
                setCheckedNewsletter(!checkedNewsletter);
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
        {errorMessage && <p className="errorMessage">{errorMessage} </p>}
        <Link to="/Login">
          <p className="newsletter-checkbox-login">
            Tu as déjà un compte ? Connecte-toi !
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
