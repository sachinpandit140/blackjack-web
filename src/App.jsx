import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./sections/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Multiplayer from "./pages/Multiplayer";
import Singleplayer from "./pages/Singleplayer";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/singleplayer" element={<Singleplayer />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
