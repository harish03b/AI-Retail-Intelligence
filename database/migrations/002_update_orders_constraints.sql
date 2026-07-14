USE erdip_db;

ALTER TABLE orders
MODIFY payment_method ENUM(
    'Cash',
    'Credit Card',
    'Debit Card',
    'UPI',
    'Net Banking',
    'Wallet'
);

ALTER TABLE orders
MODIFY order_status ENUM(
    'Pending',
    'Processing',
    'Completed',
    'Cancelled',
    'Returned'
);