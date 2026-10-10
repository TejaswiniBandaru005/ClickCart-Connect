
USE clickcart_connect;

-- Sample product categories
INSERT INTO categories (name, description)
VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Fashion', 'Clothing, shoes and accessories'),
    ('Home', 'Home essentials and decor'),
    ('Beauty', 'Beauty and personal care products')
ON DUPLICATE KEY UPDATE
    description = VALUES(description);

-- Sample products
-- These products do not belong to a seller yet.
INSERT INTO products
    (category_id, name, brand, description, price,
     original_price, stock, image_url, rating)
SELECT
    c.id,
    'Wireless Headphones',
    'SoundMax',
    'Wireless headphones for everyday listening.',
    1499.00,
    1999.00,
    25,
    'https://placehold.co/600x400?text=Headphones',
    4.3
FROM categories c
WHERE c.name = 'Electronics'
AND NOT EXISTS (
    SELECT 1 FROM products p
    WHERE p.name = 'Wireless Headphones'
);

INSERT INTO products
    (category_id, name, brand, description, price,
     original_price, stock, image_url, rating)
SELECT
    c.id,
    'Casual T-Shirt',
    'UrbanWear',
    'Comfortable casual cotton T-shirt.',
    499.00,
    799.00,
    40,
    'https://placehold.co/600x400?text=T-Shirt',
    4.1
FROM categories c
WHERE c.name = 'Fashion'
AND NOT EXISTS (
    SELECT 1 FROM products p
    WHERE p.name = 'Casual T-Shirt'
);

INSERT INTO products
    (category_id, name, brand, description, price,
     original_price, stock, image_url, rating)
SELECT
    c.id,
    'Table Lamp',
    'HomeGlow',
    'A modern lamp for your study or bedroom.',
    899.00,
    1199.00,
    15,
    'https://placehold.co/600x400?text=Lamp',
    4.2
FROM categories c
WHERE c.name = 'Home'
AND NOT EXISTS (
    SELECT 1 FROM products p
    WHERE p.name = 'Table Lamp'
);

INSERT INTO products
    (category_id, name, brand, description, price,
     original_price, stock, image_url, rating)
SELECT
    c.id,
    'Face Moisturizer',
    'GlowCare',
    'Daily moisturizer for skincare routines.',
    349.00,
    449.00,
    30,
    'https://placehold.co/600x400?text=Moisturizer',
    4.0
FROM categories c
WHERE c.name = 'Beauty'
AND NOT EXISTS (
    SELECT 1 FROM products p
    WHERE p.name = 'Face Moisturizer'
);
