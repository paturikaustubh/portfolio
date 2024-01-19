import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./Pages/Hero/Hero";

function App() {
  return (
    <div className=" h-[200svh]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
