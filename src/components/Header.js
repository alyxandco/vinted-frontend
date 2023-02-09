import vintedlogo from "./assets/images/vintedlogo.svg";

import { Link } from "react-router-dom";

const Header = () => {
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
        />
      </div>
      {}
      <div className="headerzone2">
        <Link to="/Signup">
          <button className="signup">S'inscrire</button>
        </Link>
        <Link to="/Login">
          <button className="login button-hidden">Se connecter</button>
        </Link>
        <button className="sell">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
