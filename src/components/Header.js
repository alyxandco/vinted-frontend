import vintedlogo from "./assets/images/vintedlogo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({ handleToken, token, search, setSearch }) => {
  return (
    <header className="header-container">
      <div className="headerzone1">
        <Link to="/">
          <img className="headerLogo" alt="Vinted logo" src={vintedlogo} />
        </Link>
        <input
          type="text"
          name="Search"
          placeholder="🔍  Recherche des articles"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="headerzone2">
        {token ? (
          <button
            className="signout"
            onClick={() => {
              handleToken(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <Link to="/Signup">
              <button className="signup">S'inscrire</button>
            </Link>
            <Link to="/Login">
              <button className="login">Se connecter</button>
            </Link>
          </>
        )}
        <button className="sell">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
