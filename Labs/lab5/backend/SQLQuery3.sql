create database lab5
use lab5
CREATE TABLE category (
category_id INT IDENTITY(1,1) PRIMARY KEY,
category_name NVARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE orchid (
orchid_id INT IDENTITY(1,1) PRIMARY KEY,
name NVARCHAR(255) NOT NULL,
is_attractive BIT NULL,
is_natural BIT NULL,
orchid_description NVARCHAR(MAX) NULL,
orchid_url NVARCHAR(1000) NULL,
category_id INT NOT NULL,

CONSTRAINT fk_orchid_category FOREIGN KEY (category_id) REFERENCES category(category_id)
);

INSERT INTO category (category_name)
VALUES
(N'Type A'),
(N'Type B'),
(N'Type C');

INSERT INTO orchid (
    name,
    is_attractive,
    is_natural,
    orchid_description,
    orchid_url,
    category_id
)
VALUES
(N'Orchid A', 1, 1, N'Mo ta A', N'https://a.com', 1),
(N'Orchid B', 0, 1, N'Mo ta B', N'https://b.com', 2),
(N'Orchid C', 1, 0, N'Mo ta C', N'https://c.com', 3),
(N'Orchid D', 0, 0, N'Mo ta D', N'https://d.com', 1);

