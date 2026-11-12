// 04_nosql_implementation.js
// Validates MongoDB connectivity, then executes NoSQL portfolio tasks

const { MongoClient } = require('mongodb');

// Define the MongoDB connection string (Local instance or MongoDB Atlas)
const uri = "mongodb://localhost:27017"; 
// Example Cloud URI: "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority"

async function runNosqlImplementation() {
    const client = new MongoClient(uri);

    try {
        console.log("Attempting to connect to MongoDB...");
        // Establish connection to the database
        await client.connect();
        console.log("✅ Connection test successful: Connected to MongoDB server.");
        
        // Ping the database to verify operational status
        const db = client.db("ecommerce_db");
        const pingResult = await db.command({ ping: 1 });
        console.log("✅ Database ping successful:", pingResult);

        console.log("--- Starting NoSQL Operations ---");
        const productsCollection = db.collection("products_nosql");

        // Insert a product with varying/dynamic sub-attributes
        const insertResult = await productsCollection.insertOne({
            "product_id": 101,
            "name": "Wireless Noise-Cancelling Headphones",
            "category": "Electronics",
            "price": 150.00,
            "stock_quantity": 45,
            "attributes": {
                "color": "Black",
                "battery_life": "30 hours",
                "bluetooth_version": "5.0"
            },
            "tags": ["audio", "wireless", "over-ear"],
            "created_at": new Date()
        });
        
        console.log(`✅ Successfully inserted product with _id: ${insertResult.insertedId}`);

        // Query utilizing nested document attributes
        const queryResult = await productsCollection.find({
            "category": "Electronics",
            "attributes.battery_life": "30 hours"
        }).toArray();
        
        console.log("✅ Query Results:", JSON.stringify(queryResult, null, 2));

    } catch (error) {
        console.error("❌ Error executing database operations:", error);
    } finally {
        // Ensure the connection is closed after operations complete
        await client.close();
        console.log("Database connection closed.");
    }
}

runNosqlImplementation();