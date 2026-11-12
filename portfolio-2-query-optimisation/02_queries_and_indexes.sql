-- Portfolio 2: Query Processing and Optimisation
-- Execution Plans and Indexing for E-commerce Platform

-- 1. Initial complex query (Total sales by product category)
EXPLAIN ANALYZE 
SELECT p.Category, SUM(oi.Quantity * oi.UnitPrice) AS TotalSales
FROM OrderItems oi
JOIN Products p ON oi.ProductID = p.ProductID
GROUP BY p.Category
ORDER BY TotalSales DESC;

-- 2. Creating indexes to optimize foreign key joins and aggregate queries
CREATE INDEX idx_orders_customer_id ON Orders(CustomerID);
CREATE INDEX idx_orderitems_order_id ON OrderItems(OrderID);
CREATE INDEX idx_orderitems_product_id ON OrderItems(ProductID);
CREATE INDEX idx_products_category ON Products(Category);

-- 3. Query after optimization (Run EXPLAIN ANALYZE again to compare execution costs)
EXPLAIN ANALYZE 
SELECT p.Category, SUM(oi.Quantity * oi.UnitPrice) AS TotalSales
FROM OrderItems oi
JOIN Products p ON oi.ProductID = p.ProductID
GROUP BY p.Category
ORDER BY TotalSales DESC;
