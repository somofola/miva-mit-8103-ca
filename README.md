**Student Details:**
* **Name:** Shola Omofola
* **Student ID:** 2026/A/MIT/0275
* **Email:** s.omofola8082@miva.edu.ng
* **Course:** MIT 8103 Advanced Database Systems

# Advanced Database Systems Portfolio

**Selected Case Study:** E-commerce Platform
**Nature of Business:** An online retail platform processing customer orders, payments, and tracking deliveries.
**Database Users:** Customers (shoppers), Admin (store managers).
**Major Data Stored:** Customer profiles, dynamic Product catalogs, Orders, and Items.
**Key Operations Supported:** Search products, place orders, update stock dynamically, log transactions, and distribute records for scaling.

## Folder Structure
The repository is organised into the following sections based on the assessment requirements:
* `portfolio-1-database-design/` - SQL DDL scripts creating the relational schema with keys/constraints.
* `portfolio-2-query-optimisation/` - SQL scripts displaying execution plans and indexing techniques.
* `portfolio-3-transactions-concurrency/` - SQL transaction blocks with commits, rollbacks, and isolation levels.
* `portfolio-4-nosql/` - MongoDB document model scripts managing dynamic product data.


## MongoDB Setup & Execution

### Prerequisites
1. **Node.js** installed on your system.
2. **MongoDB Database** running locally (default URI: `mongodb://localhost:27017`) or access to a MongoDB Atlas cluster.
3. The official MongoDB Node.js driver must be installed. Initialize your environment and install the driver by running:
   ```bash
   npm init -y
   npm install mongodb