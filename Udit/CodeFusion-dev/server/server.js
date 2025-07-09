import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // ✅ Add this
import Connect from "./db/connection.js";
import { app, server } from "./socket/socket.js";

import authRouter from './routes/authRouter.js';
import recordRouter from "./routes/recordRouter.js";

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());           // ✅ Parse cookies
app.use(express.static("public"));

// ✅ Routes
app.get("/", (req, res) => {
  res.json("Server is online");
});

app.use("/user", authRouter);
app.use("/record", recordRouter);

// ✅ Start server
server.listen(5000, () => {
  Connect();
  console.log("Server is running on port 5000");
});
