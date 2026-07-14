USE erdip_db;

CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20),
    gender ENUM('Male','Female','Other'),
    age INT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    membership_type VARCHAR(50),
    registration_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);