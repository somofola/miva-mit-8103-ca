-- Portfolio 3: Transactions and Concurrency
-- Transaction blocks demonstrating Commit, Rollback, and Isolation Control

-- Set strict isolation level to prevent Phantom Reads during financial/order processing
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

BEGIN;

-- Step 1: Check stock (Application logic assumes checking stock >= 2)

-- Step 2: Deduct stock safely (Concurrency control: Row-level locking)
UPDATE Products 
SET StockQuantity = StockQuantity - 2 
WHERE ProductID = 101 AND StockQuantity >= 2;

-- Step 3: Insert new Order record
INSERT INTO Orders (OrderID, CustomerID, TotalAmount, Status) 
VALUES (5001, 1, 300.00, 'Completed');

-- Step 4: Insert Order Items referencing the new Order
INSERT INTO OrderItems (OrderItemID, OrderID, ProductID, Quantity, UnitPrice)
VALUES (9001, 5001, 101, 2, 150.00);

-- If all steps succeed without constraints failing:
COMMIT;

-- Note: If any step fails (e.g., Stock update affects 0 rows due to insufficient stock),
-- the application must catch the error and execute:
-- ROLLBACK;
