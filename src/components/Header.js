import vintedlogo from "./assets/images/vintedlogo.svg";
import { Link, useNavigate } from "react-router-dom";
import Toggle from "react-toggle";
import { HiArrowUp } from "react-icons/hi";
import { HiArrowDown } from "react-icons/hi";
import * as React from "react";

const Header = ({
  handleToken,
  token,
  search,
  setSearch,
  checked,
  setChecked,
}) => {
  const navigate = useNavigate();

  return (
    <header className="header-container">
      <div className="headerzone1">
        <Link to="/">
          <img className="headerLogo" alt="Vinted logo" src={vintedlogo} />
        </Link>
        <div>
          <input
            type="text"
            name="Search"
            value={search}
            placeholder="🔍  Recherche des articles"
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="header-price">
            <label>Trier par prix :</label>
            <Toggle
              className="react-toggle-track"
              icons={{
                checked: <HiArrowUp />,
                unchecked: <HiArrowDown />,
              }}
              onClick={() => {
                setChecked(!checked);
              }}
            />
          </div>
        </div>
      </div>
      <div className="headerzone2">
        {token ? (
          <button
            className="signout"
            onClick={() => {
              handleToken(null);
              navigate("/Login");
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
        {token ? (
          <Link to="/Publish">
            <button className="sell">Vends tes articles</button>
          </Link>
        ) : (
          <Link to="/Login">
            <button className="sell">Vends tes articles</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
