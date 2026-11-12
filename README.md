# Final Documentation: Advanced Database Systems Portfolio

**Student Details:**
* **Student Name:** Shola Omofola
* **Student ID:** 2026/A/MIT/0275
* **Course:** MIT 8103 Advanced Database Systems
* **Date:** November 2026
* **GitHub Repository:** [https://github.com/somofola/miva-mit-8103-ca](https://github.com/somofola/miva-mit-8103-ca)

## 1. Case Study Overview: E-commerce Platform

The selected case study for this portfolio is an **E-commerce Platform**. This simulates an online retail business that manages a dynamic catalog of products, processes customer orders, and tracks inventory levels and transactions.

* **Database Users:** Customers (shoppers) who interact with the front-end to place orders, and Admins (store managers) who monitor stock and fulfill orders.
* **Major Data Stored:** Customer profiles, product catalogs (with dynamic attributes), order details, and itemised transaction records.
* **Key Operations:** Product catalog search, transactional order placement, concurrent stock deduction, and geographically distributed sales querying.

## 2. Summary of Portfolio Activities

### Portfolio 1: Database Design and Modelling
The foundation of the platform was designed using a relational schema optimized to Third Normal Form (3NF). The entities (Customers, Products, Orders, OrderItems) were mapped with strict constraints. Primary Keys ensure entity integrity, while Foreign Keys maintain referential integrity between orders and the purchasing customer. CHECK constraints were employed on the `Products` and `OrderItems` tables to guarantee that stock quantities and prices cannot fall below zero, ensuring logical data consistency at the schema level.

### Portfolio 2: Query Processing and Optimisation
To support heavy read operations common in e-commerce (such as calculating total sales by category), complex aggregate SQL queries were authored. Initial query execution plans (via `EXPLAIN ANALYZE`) highlighted sequential scans on large tables. By introducing strategic B-Tree indexes on Foreign Keys (`CustomerID`, `OrderID`, `ProductID`) and frequently filtered columns (`Category`), query execution costs were significantly reduced. The execution plans in the GitHub repository demonstrate the transition from full table scans to efficient index scans.

### Portfolio 3: Transactions and Concurrency
Handling inventory correctly during concurrent purchases is critical. A transaction block was implemented to process new orders. The isolation level was set to `SERIALIZABLE` to prevent Phantom Reads and ensure consistency. The transaction explicitly updates the `StockQuantity` with a row-level lock (checking that stock is sufficient) before inserting the corresponding `Orders` and `OrderItems` records. A commit is issued only if all steps succeed, demonstrating robust ACID properties.

### Portfolio 4: NoSQL and Advanced Data Models
While strict schema is useful for financial transactions, it struggles with the varied attributes of modern e-commerce products (e.g., a laptop has RAM and CPU, while a shirt has size and color). A MongoDB document model was implemented to handle `products_nosql`. Using a JSON-like structure allowed the embedding of a dynamic `attributes` sub-document and a `tags` array. A Node.js precursor script was developed to validate database connectivity, ping the server, and successfully insert and query these nested document structures.

### Portfolio 5: Distributed and Cloud Database Exercise
To simulate scaling for a global audience, a distributed MongoDB architecture was configured. A compound shard key (`order_date`, `customer_id`) was chosen for the `orders_nosql` collection to prevent "jumbo chunks" and ensure even distribution. Furthermore, geographic zone tagging was implemented (e.g., Africa Zone vs. Europe Zone) to keep data close to the regional users, thereby decreasing read/write latency. Read preferences (`secondaryPreferred` vs. `primary`) were configured to balance high availability with strong consistency depending on the query context.

## 3. Evidence and Implementation Screenshots

All scripts and execution files are stored in the linked GitHub repository. Below is a summary of the visual evidence capturing the execution of the portfolio tasks (please refer to the LMS submission attachments for the high-resolution images):

| Portfolio Task | Evidence Provided | Location in Repo |
| :--- | :--- | :--- |
| 1. Database Design | ER Diagram output and successful DDL execution logs. | `portfolio-1-database-design/` |
| 2. Query Optimisation | Screenshots comparing `EXPLAIN ANALYZE` costs before and after indexing. | `portfolio-2-query-optimisation/` |
| 3. Transactions | Log showing successful COMMIT after stock deduction. | `portfolio-3-transactions-concurrency/` |
| 4. NoSQL Model | Terminal output of successful Node.js connection, ping, and nested query results. | `portfolio-4-nosql/` |
| 5. Distributed Cloud | `sh.status()` output showing active shards and chunk distribution. | `portfolio-5-distributed-cloud/` |

> *[Insert Screenshot 1: SQL EXPLAIN ANALYZE output before and after indexing]*
> 
> *[Insert Screenshot 2: Node.js Terminal Output for MongoDB Connection and Query]*

## 4. Individual Technical Reflection

Developing this portfolio provided practical insights into the trade-offs required when designing modern database architectures. One of the primary challenges was reconciling the need for strict ACID compliance in financial transactions with the flexibility required for product catalogs. In a purely relational system, handling variable product attributes leads to sparse tables or complex Entity-Attribute-Value (EAV) anti-patterns. Implementing a NoSQL solution for the product catalog alongside a relational system for orders demonstrated the value of polyglot persistence.

Furthermore, configuring the distributed database topology highlighted the realities of the CAP theorem. Designing the shard key for the orders collection required careful consideration; a monotonically increasing key like a simple timestamp would have caused write hotspots on a single shard. Using a compound key (`order_date` and `customer_id`) combined with geographic zoning provided a balanced approach to horizontal scaling. Ultimately, this assignment bridged the gap between theoretical database concepts and the pragmatic engineering decisions required to build resilient, scalable systems.

## 5. Academic Integrity and AI-Use Declaration

* **AI Tool Used:** Gemini (Google)
* **Purpose of Use:** The AI tool was utilized as a learning aid to troubleshoot syntax errors in the MongoDB driver connection scripts (Node.js) and to understand the specific command structure for configuring MongoDB sharding zone tags.
* **Verification Process:** All generated code snippets were manually reviewed against the official MongoDB documentation. The scripts were subsequently tested on a local database instance to verify their correctness and execution output. The database schema design, indexing strategy, and technical reflection represent my independent analytical work and understanding.

### References
* Silberschatz, A., Korth, H. F., & Sudarshan, S. (2019). Database System Concepts (7th ed.). McGraw-Hill Education.
* MongoDB Inc. (2026). MongoDB Manual: Sharding. Retrieved from official documentation.
* PostgreSQL Global Development Group. (2026). PostgreSQL Documentation: Using EXPLAIN.