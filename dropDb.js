require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URI;
const dbName = 'eShop';

async function dropDatabase() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to server');

    // Get the database
    const db = client.db(dbName);

    // Drop the database
    const result = await db.dropDatabase();
    console.log(`Database dropped: ${result}`);
  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection
    await client.close();
  }
}

dropDatabase().catch(console.error);
