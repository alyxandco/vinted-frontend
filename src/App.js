import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// import des composants
import Header from "./components/Header";

// import des Routes
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
// import CheckoutForm from "./pages/CheckoutForm";

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(true);
  console.log(token);
  // fonction pour stocker OU suppr le token dans le state + cookie
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-vinted", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("token-vinted");
    }
  };

  return (
    <Router>
      {/* // passer des props à des composants !!!! */}
      <Header
        handleToken={handleToken}
        token={token}
        search={search}
        setSearch={setSearch}
        checked={checked}
        setChecked={setChecked}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              token={token}
              search={search}
              setSearch={setSearch}
              checked={checked}
              setChecked={setChecked}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/Signup/" element={<Signup handleToken={handleToken} />} />
        <Route path="/Login/" element={<Login handleToken={handleToken} />} />
        <Route
          path="/Publish"
          element={<Publish handleToken={handleToken} token={token} />}
        />
        <Route path="/Payment/" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
