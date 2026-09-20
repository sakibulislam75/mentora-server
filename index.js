const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

const client = new MongoClient(
  "mongodb+srv://mentora:unSTuVOC9rFgR6zf@cluster0.mvh6hdg.mongodb.net/?appName=Cluster0",
);

app.get("/", (req, res) => {
  res.send("server is running successfully!");
});
const run = async () => {
  try {
    await client.connect();
    const db = await client.db("mentora");
    const courseCollections = await db.collection("courses");

    //fetch
    app.get("/course", async (req, res) => {
      try {
        const result = await courseCollections.find({}).toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: "Failed to get courses" });
      }
    });

    //single course
    app.get("/course/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await courseCollections.findOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: "Failed to get course" });
      }
    });
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
};

run();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
