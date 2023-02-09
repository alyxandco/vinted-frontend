import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import des composants
import Header from "./components/Header";

// import des Routes
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/Signup/" element={<Signup />} />
        <Route path="/Login/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
