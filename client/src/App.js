import "./App.css";
import BugDetails from "./pages/BugDetails";
import CreateBug from "./pages/CreateBug";
import EditBug from "./pages/EditBug";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bug-detail/:id" element={<BugDetails />} />
        <Route path="/create-bug" element={<CreateBug />} />
        <Route path="/edit-bug/:id" element={<EditBug />} />
      </Routes>
    </Router>
  );
}

export default App;
