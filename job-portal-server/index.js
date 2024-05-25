const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const router = require("./routes/route");

app.use(express.json());
app.use(cors());
app.use("/api/users", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

const uri = process.env.MONGO_URL;

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000, // Adjust the server selection timeout
  connectTimeoutMS: 10000,
  // Increase the connection timeout
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully!");
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
});

app.get("/", (req, res) => {
  res.send("Hello Developer!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
