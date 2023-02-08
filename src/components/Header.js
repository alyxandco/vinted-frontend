import vintedlogo from "./assets/images/vintedlogo.svg";

const Header = () => {
  return (
    <header className="header-container">
      <div className="headerzone1">
        <img className="headerLogo" alt="Vinted logo" src={vintedlogo} />
        <input
          type="text"
          name="Search"
          placeholder="🔍  Recherche des articles"
        />
      </div>
      <div className="headerzone2">
        <button className="signin">S'inscrire</button>
        <button className="login">Se connecter</button>
        <button className="sell">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
