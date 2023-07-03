const { MongoClient } = require("mongodb");

require("dotenv").config();
const password = process.env.MONGODB_PASSWORD;

// Replace the uri string with your connection string.
const uri = "mongodb+srv://Cluster17314:"+password+"@cluster17314.dse6u8f.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('Fruits');
    const collection = database.collection('test');

    collection.insertMany([
        {
            name: "apple",
            color: "green"
        },
        {
            name: "lime"
        },
        {
            name: "grape"
        }
    ])


    console.log(collection);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);