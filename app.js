import cors from "cors";
import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";

import { DB } from "./db/conn.js";

const app = express();

var corsOptions = { origin: "*" };
app.use(cors(corsOptions));

app.use(bodyParser.json());

// app.use(UserRouters, BookRouters, AuctionRouters);
const httpServer = createServer(app);

// connecting to database
DB();

import userRoute from "./routes/user.route.js";
app.use("/api/user", userRoute);

import booksRoute from "./routes/books.route.js";
app.use("/api/book", booksRoute);

const PORT = process.env.PORT || 3050;

httpServer.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
