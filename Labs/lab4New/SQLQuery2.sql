create database lab4new
use lab4new

CREATE TABLE orchid (
orchid_id INT IDENTITY(1,1) PRIMARY KEY,
is_attractive BIT NULL,
is_natural BIT NULL,
name VARCHAR(255) NOT NULL,
orchid_category VARCHAR(255) NULL,
orchid_description NVARCHAR(MAX) NULL,
orchid_url NVARCHAR(1000) NULL
);

INSERT INTO orchid (
    is_attractive,
    is_natural,
    name,
    orchid_category,
    orchid_description,
    orchid_url
)
VALUES
(1, 1, 'Orchid A', 'Type A', N'Mo ta A', N'https://a.com'),
(0, 1, 'Orchid B', 'Type B', N'Mo ta B', N'https://b.com'),
(1, 0, 'Orchid C', 'Type C', N'Mo ta C', N'https://c.com'),
(0, 0, 'Orchid D', 'Type D', N'Mo ta D', N'https://d.com');
