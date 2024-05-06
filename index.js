const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dujofhq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const skillsCollection = client.db("portfolio").collection("skills");
    const projectsCollection = client.db("portfolio").collection("projects");
    const blogCollection = client.db("portfolio").collection("blog");

    app.get("/skills", async (req, res) => {
      const result = await skillsCollection.find().toArray();
      res.send(result);
    });
    app.get("/projects", async (req, res) => {
      const result = await projectsCollection.find().toArray();
      res.send(result);
    });
    app.get("/projects", async (req, res) => {
      const result = await projectsCollection.find().toArray();
      res.send(result);
    });
    app.get("/blogs", async (req, res) => {
      const result = await blogCollection.find().toArray();
      res.send(result);
    });
    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const result = await projectsCollection.findOne({
        _id: new ObjectId(id),
      });
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("Project not found");
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My portfolio is running ");
});

app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
