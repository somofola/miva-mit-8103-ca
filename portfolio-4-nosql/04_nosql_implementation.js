// 00_db_connection_test.js
// Precursor: Database Connection and Test
// Validates MongoDB connectivity before executing NoSQL portfolio tasks

const { MongoClient } = require('mongodb');

// Define the MongoDB connection string (Local instance or MongoDB Atlas)
const uri = "mongodb://localhost:27017"; 

async function testConnection() {
    const client = new MongoClient(uri);

    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect();
        console.log("✅ Connection test successful: Connected to MongoDB server.");
        
        // Ping the database to verify operational status
        const db = client.db("ecommerce_db");
        const pingResult = await db.command({ ping: 1 });
        console.log("✅ Database ping successful:", pingResult);

    } catch (error) {
        console.error("❌ Connection test failed:", error);
    } finally {
        await client.close();
        console.log("Database connection closed.");
    }
}

testConnection();