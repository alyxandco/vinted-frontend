import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// // import { useState, useEffect } from "react";

// import des composants
import Header from "./components/Header";

// import des Routes
import Home from "./pages/Home";
import Offer from "./pages/Offer";

// //import du package axios
// // import axios from "axios";

function App() {
  return (
    <Router>
      <Header />
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/offer">Offres</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
