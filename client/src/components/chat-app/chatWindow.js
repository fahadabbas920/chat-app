import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { WEBSOCKET } from "./chatApp";

const ChatWindow = ({ email }) => {
  const navigate = useNavigate();
  const socket = useContext(WEBSOCKET);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, user: "You" }]);
      setInput("");
    }
  };
  const handleRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", room);
  };

  const sendMessage = () => {
    socket.emit("send-message", { input, room, email });
  };

  useEffect(() => {
    socket.on("recieve-message", (data) => {
      console.log(data);
      setMessages([...messages, { text: data.input, user: data.email }]);
    });
  }, [messages, socket]);

  return (
    <div className="chat-app">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.user === "You" ? "sent" : "received"
            }`}
          >
            {" "}
            <small>{message.user}</small>
            <div className="message-text">{message.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </form>
      <form onSubmit={handleRoom} className="input-form">
        <input
          type="text"
          placeholder="Type room id..."
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <br />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          socket.disconnect();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ChatWindow;
