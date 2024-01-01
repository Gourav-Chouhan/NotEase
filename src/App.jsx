import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/NotesHomePage";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <Router>
      <div className="bg-zinc-900 h-[100svh] overflow-hidden font-inconsolata">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/notes/:id" element={<NotePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
