import { useContext, useEffect, useState } from "react";
import { WEBSOCKET } from "./chatApp";

const ChatUsers = ({ activeUsers }) => {
  const socket = useContext(WEBSOCKET);
  //   const [users, setUsers] = useState("");
  //   const userlist = useMemo(() => {
  //     return new Array([]);
  //   }, []);
  const [users, setUsers] = useState(null);
  //   console.log(typeof userlist);
  useEffect(() => {
    socket.on("active-users-map", (data) => {
      var newMap = new Map(JSON.parse(data));
      setUsers(newMap);
    });
    console.log(users);
    const arr = [];
    if (users) {
      for (let user of users) {
        arr.push(<li key={user[1]}>${user[0]}</li>);
        // console.log(user)
      }
    }
  }, [socket, users]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Active Users</h1>
      <ul>{users}</ul>
    </div>
  );
};

export default ChatUsers;
