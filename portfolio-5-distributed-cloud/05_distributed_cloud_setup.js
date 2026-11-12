// Portfolio 5: Distributed and Cloud Database Exercise
// Setup for Replication, Sharding, and High Availability in a Distributed MongoDB Cluster

// ============================================================================
// PART 1: REPLICATION & HIGH AVAILABILITY (Run on individual replica sets)
// ============================================================================
// Note: In a cloud environment (like Atlas or a Contabo/AWS cluster), replica sets 
// provide fault tolerance. The following demonstrates the underlying configuration.
/*
rs.initiate({
    _id: "shard1_rs",
    members: [
        { _id: 0, host: "mongo-shard1-node1:27018", priority: 2 }, // Primary (Handles writes)
        { _id: 1, host: "mongo-shard1-node2:27018", priority: 1 }, // Secondary (Handles failover/reads)
        { _id: 2, host: "mongo-shard1-node3:27018", arbiterOnly: true } // Arbiter (Tie-breaker)
    ]
});
*/

// ============================================================================
// PART 2: SHARDING SETUP (Run on mongos query router)
// ============================================================================

// Switch to admin database to configure sharding
use admin;

// Connect to mongos query router and enable sharding for the database
sh.enableSharding("ecommerce_db");

// Switch to the target database
use ecommerce_db;

// Create an index on the proposed shard key: { order_date: 1, customer_id: 1 }
// A compound key prevents jumbo chunks and balances read/write workloads across the cluster.
db.orders_nosql.createIndex({ "order_date": 1, "customer_id": 1 });

// Execute shard collection command
// Using Range-based sharding optimized for date-range analytics and specific customer lookups.
sh.shardCollection("ecommerce_db.orders_nosql", { "order_date": 1, "customer_id": 1 });

// ============================================================================
// PART 3: DATA DISTRIBUTION & ZONING (Geographic/Cloud Deployment)
// ============================================================================
// Assigning shards to specific geographic zones for data sovereignty and latency reduction.

use admin;
// Add zone tags to existing shards
sh.addShardTag("shard1_rs", "AFRICA_ZONE");
sh.addShardTag("shard2_rs", "EUROPE_ZONE");

// Route data to zones based on customer_id ranges (Example: IDs 1-5000 in Africa, 5001-10000 in Europe)
sh.addTagRange(
    "ecommerce_db.orders_nosql",
    { "order_date": MinKey, "customer_id": 1 },
    { "order_date": MaxKey, "customer_id": 5000 },
    "AFRICA_ZONE"
);

sh.addTagRange(
    "ecommerce_db.orders_nosql",
    { "order_date": MinKey, "customer_id": 5001 },
    { "order_date": MaxKey, "customer_id": 10000 },
    "EUROPE_ZONE"
);

// ============================================================================
// PART 4: AVAILABILITY VS. CONSISTENCY (Read Preferences)
// ============================================================================

use ecommerce_db;

// 1. Strong Consistency: Read only from the Primary node
// Suitable for real-time order payment validation.
db.orders_nosql.find({ "customer_id": 275 }).readPref("primary");

// 2. High Availability / Eventual Consistency: Read from nearest Secondary node
// Suitable for generating monthly sales reports or viewing historical orders.
db.orders_nosql.find({ 
    "order_date": { $gte: new ISODate("2026-11-01") } 
}).readPref("secondaryPreferred");

// ============================================================================
// PART 5: VERIFICATION
// ============================================================================

// Verify the status of chunk distribution, tags, and shard health across the cluster
sh.status();