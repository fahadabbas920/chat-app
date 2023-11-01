import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./components/home";
import Login from "./components/login";
import SignUp from "./components/signup";
import ChatApp from "./components/chat-app/chatApp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chatapp/" element={<ChatApp />} />
      </Routes>
    </div>
  );
}

export default App;
