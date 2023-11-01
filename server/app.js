const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const connectDB = require("./db/connect");
require("dotenv").config();
const users = require("./routes/users");
const login = require("./controllers/login");
const signup = require("./controllers/signup");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // used when posting data with javscript

const authentication = require("./middlewares/authentication");

const results = require("./utilities/getLocalPv4");
console.log(results);

const io = new Server(server, {
  cors: {
    origin: "http://192.168.18.189:3000/",
    methods: ["GET", "POST"],
  },
});

io.use(
  require("socketio-jwt").authorize({
    secret: `MyNameIsBananaChocolatePie`,
    handshake: true,
  })
);

app.use("/chatapp", authentication);
app.use("/login", login);
app.use("/signup", signup);
// app.get("*", (req, res) => {
//   res
//     .status(404)
//     .json({ success: false, message: "NOTHING HERE YOU FOOL GO BACK." });
// });

io.use(function (socket, next) {
  var handshakeData = socket.request;
  console.log("middleware:", handshakeData._query["email"]);
  socket.email = handshakeData._query["email"];
  next();
});

const socketsMap = new Map();
io.on("connection", async (socket) => {
  // socket.disconnect();
  console.log(socket.email);
  // console.log("Client Count: ", io.engine.clientsCount);
  const Sockets = await io.fetchSockets();
  // console.log(io.sockets.connected);
  socketsMap.set(socket.email, socket.id);

  for (const socket of Sockets) {
    console.log(socket.id);
    // map.set("")
    // console.log(socket.handshake);
    // console.log(socket.rooms);
    // console.log(socket.data);
    // socket.emit(/* ... */);
    // socket.join(/* ... */);
    // socket.leave(/* ... */);
    // socket.disconnect(/* ... */);
  }

  socket.on("active-users", () => {
    // io.emit("active-users", io.engine.clientsCount);
    io.emit("active-users", socketsMap.size);
    let transitString = JSON.stringify(Array.from(socketsMap));
    // console.log(transitString);
    io.emit("active-users-map", transitString);
    console.log(socketsMap);
  });
  // socket.on("active-users-map", () => {
  // io.emit("active-users", io.engine.clientsCount);
  // console.log(socketsMap);
  // });
  console.log(`Connected user ${socket.id}`);
  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(data);
  });
  socket.on("send-message", (data) => {
    // socket.broadcast.emit("recieve-message", data);
    socket.to(data.room).emit("recieve-message", data);
  });

  socket.on("disconnect", async () => {
    const Sockets = await io.fetchSockets();
    socketsMap.delete(socket.email);
    // console.log("Client Count", io.engine.clientsCount);
    console.log("Client Count", socketsMap.size);
    for (const socket of Sockets) {
      console.log("Remaining: ", socket.id);
    }
    // io.emit("active-users", io.engine.clientsCount);
    io.emit("active-users", socketsMap.size);
    let transitString = JSON.stringify(Array.from(socketsMap));
    // console.log(transitString);
    io.emit("active-users-map", transitString);
    console.log("Socket disconnected", socket.id);
  });
  io.engine.on("connection_error", (err) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
  });
});

async function Start() {
  try {
    await connectDB(process.env.MONGO_URI).then(() => {
      console.log("Database Connected");
    });
    server.listen(80, () => {
      console.log("Server is listening");
    });
  } catch (error) {
    console.log(error);
  }
}

Start();
