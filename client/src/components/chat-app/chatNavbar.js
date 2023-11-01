import React, { useEffect, useState, useContext } from "react";
import { WEBSOCKET } from "./chatApp";

function ChatNavbar({ email }) {
  const socket = useContext(WEBSOCKET);
  const [user, setUser] = useState(0);
  useEffect(() => {
    socket.emit("active-users");
    socket.on("active-users", (data) => {
      console.log(data);
      setUser(data);
    });
  }, [socket]);
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Welcome {email}</h3>
      Active Users: {user}
    </div>
  );
}
export default ChatNavbar;
