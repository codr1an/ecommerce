-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2024 at 01:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lashop_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `total_price` double NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `description`, `image_url`, `name`, `price`, `type`) VALUES
(1, 'Iphone X, very cool thing\n', 'iPhone.png', 'iPhone X', 1299.99, 'phone'),
(2, 'Latest iPhone model with advanced features', 'iPhone.png', 'iPhone 11', 999.99, 'phone'),
(3, 'Apple\'s flagship phone with 5G capabilities', 'iPhone.png', 'iPhone 12', 1199.99, 'phone'),
(4, 'High-end Android smartphone from Samsung', 'iPhone.png', 'Samsung Galaxy S20', 899.99, 'phone'),
(5, 'Premium Android smartphone with S Pen', 'iPhone.png', 'Samsung Galaxy Note 20', 1099.99, 'phone'),
(6, 'Google\'s flagship smartphone with excellent camera', 'iPhone.png', 'Google Pixel 5', 799.99, 'phone'),
(7, 'Powerful Android smartphone with a smooth display', 'iPhone.png', 'OnePlus 8 Pro', 899.99, 'phone'),
(8, 'Thin and light tablet with powerful performance', 'iPad.png', 'iPad Air', 599.99, 'tablet'),
(9, 'Apple\'s premium tablet for professionals', 'iPad.png', 'iPad Pro', 1111, 'tablet'),
(10, 'Android tablet with stunning display and S Pen support', 'iPad.png', 'Samsung Galaxy Tab S7', 799.99, 'tablet'),
(11, 'Versatile tablet with laptop-class performance', 'iPad.png', 'Microsoft Surface Pro 7', 899.99, 'tablet'),
(12, 'Affordable tablet with vibrant display', 'iPad.png', 'Amazon Fire HD 10', 149.99, 'tablet'),
(13, 'Premium QLED TV with exceptional picture quality', 'tv.png', 'Samsung QLED Q90T', 1999.99, 'tv'),
(14, 'Ultra-thin OLED TV with perfect blacks and vibrant colors', 'tv.png', 'LG OLED CX', 1799.99, 'tv'),
(15, 'Feature-packed LED TV with immersive sound', 'tv.png', 'Sony BRAVIA X900H', 1499.99, 'tv'),
(16, 'Affordable 4K HDR TV with Roku smart platform', 'tv.png', 'TCL 6-Series', 799.99, 'tv'),
(17, 'Budget-friendly 4K TV with excellent picture quality', 'tv.png', 'Hisense H8G', 699.99, 'tv'),
(18, 'Powerful laptop with stunning Retina display', 'laptop.png', 'MacBook Pro', 1799.99, 'laptop'),
(19, 'Premium laptop with InfinityEdge display', 'laptop.png', 'Dell XPS 15', 1499.99, 'laptop'),
(20, 'Convertible laptop with sleek design and long battery life', 'laptop.png', 'HP Spectre x360', 1299.99, 'laptop'),
(21, 'Business-class laptop with durable build and security features', 'laptop.png', 'Lenovo ThinkPad X1 Carbon', 1699.99, 'laptop'),
(22, 'Gaming laptop with powerful performance in a compact design', 'laptop.png', 'Asus ROG Zephyrus G14', 1499.99, 'laptop'),
(23, '27-inch 4K monitor with USB-C connectivity', 'monitor.png', 'Dell Ultrasharp U2720Q', 599.99, 'monitor'),
(24, 'HDR10 IPS monitor with USB-C and FreeSync support', 'monitor.png', 'LG 27UK850-W', 499.99, 'monitor'),
(25, 'Professional 27-inch 4K monitor with extensive connectivity options', 'monitor.png', 'BenQ PD2700U', 599.99, 'monitor'),
(26, '27-inch 4K gaming monitor with G-Sync and HDR', 'monitor.png', 'Acer Predator XB273K', 799.99, 'monitor'),
(27, '27-inch QHD gaming monitor with overclockable refresh rate', 'monitor.png', 'Asus ROG Swift PG279Q', 699.99, 'monitor'),
(28, 'Compact yet powerful smartphone from Apple', 'iPhone.png', 'iPhone SE', 399.99, 'phone'),
(29, 'Latest flagship smartphone from Samsung', 'iPhone.png', 'Samsung Galaxy S21', 1199.99, 'phone'),
(30, 'Affordable Android smartphone with great camera', 'iPhone.png', 'Google Pixel 4a', 499.99, 'phone'),
(31, 'Compact and portable tablet from Apple', 'iPad.png', 'iPad Mini', 399.99, 'tablet'),
(32, 'Budget-friendly Android tablet with large display', 'iPad.png', 'Samsung Galaxy Tab A7', 2999.99, 'tablet'),
(33, 'Lightweight and versatile tablet for productivity', 'iPad.png', 'Microsoft Surface Go 2', 499.99, 'tablet'),
(34, 'Advanced LED TV with NanoCell technology', 'tv.png', 'LG NanoCell NANO85', 1299.99, 'tv'),
(35, 'Mid-range LED TV with Triluminos display', 'tv.png', 'Sony X800H', 999.99, 'tv'),
(50, 'Sony TV', 'tv.png', 'Sony UNBRAVIA 2022', 123.22, 'tv');

-- --------------------------------------------------------

--
-- Table structure for table `shopping_cart`
--

CREATE TABLE `shopping_cart` (
  `id` bigint(20) NOT NULL,
  `total_price` double NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shopping_cart`
--

INSERT INTO `shopping_cart` (`id`, `total_price`, `user_id`) VALUES
(1, 0, 1),
(2, 0, NULL),
(3, 0, 2),
(4, 0, NULL),
(5, 0, NULL),
(6, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shopping_cart_items`
--

CREATE TABLE `shopping_cart_items` (
  `shopping_cart_id` bigint(20) NOT NULL,
  `items_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`, `username`, `address`, `first_name`, `last_name`) VALUES
(1, 'admin@test.de', '$2a$10$xIYlYjl8LLxlPhNEgtJ/nu2N4GJpd9yp5xanbCicmOXISvT9Krg3W', 'admin', 'admin', 'Musterstr. 22, 68111 Monem', 'Cool', 'Admin'),
(2, 'user@test.de', '$2a$10$xIYlYjl8LLxlPhNEgtJ/nu2N4GJpd9yp5xanbCicmOXISvT9Krg3W', 'user', 'user', 'Musterstr. 22, 68121 Monem', 'Lel', 'User'),
(4, 'max@mustermann.de', '$2a$10$vtvw6.lBIs2uA5SC9HNOTuAuIsQNWaGrLhN0T8OlEOuQuQxHyOFlu', 'user', 'asdd', 'Musterstr. 1, 11111 zxc', 'Max', 'Mustermann');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjcyd5wv4igqnw413rgxbfu4nv` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKt4dc2r9nbvbujrljv3e23iibt` (`order_id`),
  ADD KEY `FK551losx9j75ss5d6bfsqvijna` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_qx5dh8nhlnh77h8im91vlqwdv` (`user_id`);

--
-- Indexes for table `shopping_cart_items`
--
ALTER TABLE `shopping_cart_items`
  ADD UNIQUE KEY `UK_ln84ylb54v72dt5hxftrtas48` (`items_id`),
  ADD KEY `FKn4ocuqbcv64d0pvyhv863l1y5` (`shopping_cart_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `shopping_cart`
--
ALTER TABLE `shopping_cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `FKjcyd5wv4igqnw413rgxbfu4nv` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `FK551losx9j75ss5d6bfsqvijna` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FKt4dc2r9nbvbujrljv3e23iibt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD CONSTRAINT `FK254qp5akhuaaj9n5co4jww3fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `shopping_cart_items`
--
ALTER TABLE `shopping_cart_items`
  ADD CONSTRAINT `FKb2m8eb1wsjsqb1ysdkmvnsieq` FOREIGN KEY (`items_id`) REFERENCES `cart_item` (`id`),
  ADD CONSTRAINT `FKn4ocuqbcv64d0pvyhv863l1y5` FOREIGN KEY (`shopping_cart_id`) REFERENCES `shopping_cart` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
