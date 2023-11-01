import { createContext } from "react";
// import { useParams } from "react-router";
import { useLocation } from "react-router";
import ChatNavbar from "./chatNavbar";
import ChatWindow from "./chatWindow";
import io from "socket.io-client";
// import ChatUsers from "./chatUsers";
// import axios from "axios";
import ChatUsers from "./chatUsers";

export const WEBSOCKET = createContext();

const ChatApp = () => {
  // const { email } = useParams();
  const location = useLocation();
  console.log(location.state.email);

  // const checkValid = async () => {
  //   await axios.get(`http:192.168.18.189/`, location.state.email).then();
  // };
  // let socket = null;
  // if (location.state.email) {
    const token = localStorage.getItem("token") || "";
    const socket = io.connect("http://192.168.18.189:80/", {
      transports: ["websocket"],
      query: {
        token: token.split(" ")[1],
        email: location.state.email,
      },
      forceNew: true,
    });
  // }/
  // const [activeUsers, setActiveUsers] = useState();
  // socket.no("activeUsers", (data) => {
  //   setActiveUsers(data);
  // });

  return (
    <WEBSOCKET.Provider value={socket}>
      {location.state.email ? (
        <>
          <ChatNavbar email={location.state.email} />
          <ChatWindow email={location.state.email} />
        </>
      ) : (
        <hi>hi</hi>
      )}
      <ChatUsers />
    </WEBSOCKET.Provider>
  );
}
export default ChatApp;
