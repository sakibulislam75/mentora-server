const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("server is running successfully!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
