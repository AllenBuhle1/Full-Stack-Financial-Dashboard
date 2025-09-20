CREATE DATABASE IF NOT EXISTS finance_app;

USE finance_app;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Financial records table
CREATE TABLE IF NOT EXISTS financial_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    year INT NOT NULL,
    month VARCHAR(20) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Insert dummy user
INSERT INTO users (name) VALUES ('John Doe');

-- Insert dummy financial records for John Doe (user_id = 1)
INSERT INTO financial_records (user_id, year, month, amount) VALUES
(1, 2025, 'January', 5000.00),
(1, 2025, 'February', 5200.50),
(1, 2025, 'March', 4800.75),
(1, 2025, 'April', 5100.00),
(1, 2025, 'May', 5300.20),
(1, 2025, 'June', 5500.00),
(1, 2025, 'July', 5600.50),
(1, 2025, 'August', 5700.00),
(1, 2025, 'September', 5800.75),
(1, 2025, 'October', 6000.00),
(1, 2025, 'November', 6200.25),
(1, 2025, 'December', 6300.00);
