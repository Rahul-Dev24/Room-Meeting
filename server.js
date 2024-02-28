import express from "express";
import { Server } from "socket.io";
import http from "http";
// import ACTIONS from "./src/Actions.js";
// const ACTIONS = require("./src/Actions");
const app = express();
app.use(express.static("dist"));

// const server = http.createServer(app);

const io = new Server(server);

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  //Map Type
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        userName: userSocketMap[socketId],
      };
    }
  );
};

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("join", ({ roomId, userName }) => {
    userSocketMap[socket.id] = userName;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("join", {
        clients,
        userName,
        socketId: socketId.id,
      });
    });
  });

  //
  socket.on("code-change", ({ roomId, code }) => {
    socket.in(roomId).emit("code-change", {
      code,
    });
  });

  //

  // not working
  // socket.on("sync-code", ({ socketId, codes }) => {
  //   io.to(socketId).emit("code-change", {
  //     codes,
  //   });
  // });

  //
  socket.on("disconnecting", () => {
    const allRooms = [...socket.rooms];
    allRooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        userName: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

server.listen(PORT, () => {
  console.log(`server start ${PORT}`);
});
