// Portfolio 5: Distributed and Cloud Database Exercise
// Setup for Sharding the Orders collection in a Distributed MongoDB Cluster

// Connect to mongos query router and enable sharding for the database
sh.enableSharding("ecommerce_db");

use ecommerce_db;
// Create an index on the proposed shard key (order_date and customer_id)
// This ensures horizontal data distribution is balanced across shards geographically or logically
db.orders_nosql.createIndex({ "order_date": 1, "customer_id": 1 });

// Execute shard collection command
sh.shardCollection("ecommerce_db.orders_nosql", { "order_date": 1, "customer_id": 1 });

// Verify the status of chunk distribution across the cluster
sh.status();
