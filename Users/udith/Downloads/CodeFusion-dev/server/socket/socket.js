import { Server } from "socket.io";
import http from "http";
import express from "express";

import ACTIONS from "../actions/Actions.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or restrict to your frontend URL for security
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => ({
      socketId,
      username: userSocketMap[socketId],
    })
  );
}

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

 socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
  socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code }); // ✅ sends to everyone except sender
});


  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    // Send code to specific socket (new joiner)
    io.to(socketId).emit(ACTIONS.SYNC_CODE, { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.to(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
  });
});

export { app, server, io };
