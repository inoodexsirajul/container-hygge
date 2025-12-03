-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 01, 2025 at 11:29 PM
-- Server version: 11.4.8-MariaDB-cll-lve
-- PHP Version: 8.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hyggznzm_hyggecotton`
--

-- --------------------------------------------------------

--
-- Table structure for table `abouts`
--

CREATE TABLE `abouts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `abouts`
--

INSERT INTO `abouts` (`id`, `content`, `created_at`, `updated_at`) VALUES
(1, '<h2 style=\"margin-right: 0px; margin-bottom: 10px; margin-left: 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; color: rgb(0, 0, 0);\">What is Lorem Ipsum?</h2><h2 style=\"margin-right: 0px; margin-bottom: 10px; margin-left: 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; color: rgb(0, 0, 0);\"><strong style=\"font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify; margin: 0px; padding: 0px;\">Lorem Ipsum</strong><span style=\"font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">&nbsp;</span><span style=\"font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></h2><h2 style=\"border: 0px solid; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 0px; font-weight: inherit; color: rgb(0, 0, 0);\"><div style=\"margin: 0px 28.7969px 0px 14.3906px; padding: 0px; width: 436.797px; float: right;\" open=\"\" sans\",=\"\" arial,=\"\" sans-serif;\"=\"\"><font face=\"DauphinPlain\"><span style=\"font-size: 24px;\">&nbsp;</span></font></div></h2>', '2025-10-16 12:10:34', '2025-10-26 23:43:28');

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL DEFAULT '2025-11-09',
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`id`, `user_id`, `date`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES
(2, 11, '2025-10-10', '2025-11-09 22:09:29', '2025-11-09 23:16:52', '2025-11-09 22:09:29', '2025-11-09 23:16:52'),
(8, 12, '2025-11-08', '2025-11-07 22:09:29', '2025-11-08 04:00:00', '2025-11-09 22:09:29', '2025-11-09 22:09:29'),
(11, 11, '2025-11-07', '2025-11-06 22:00:00', '2025-11-07 04:00:00', '2025-10-09 22:00:29', '2025-10-09 22:00:29'),
(12, 11, '2025-11-08', '2025-11-07 22:00:00', '2025-11-08 04:00:00', '2025-10-09 22:00:29', '2025-10-09 22:00:29'),
(13, 11, '2025-11-09', '2025-11-08 22:00:00', '2025-11-09 04:00:00', '2025-10-09 22:00:29', '2025-10-09 22:00:29'),
(14, 11, '2025-11-10', '2025-11-09 22:09:29', '2025-11-09 23:16:52', '2025-11-09 22:09:29', '2025-11-09 23:16:52');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` varchar(255) DEFAULT NULL,
  `image` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location_url` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `description`, `location_url`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Shana Armstrong', 'Odio et ut officiis', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4990.042312150872!2d90.35098391202087!3d23.82359397853129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1006cb54f2d%3A0x970526e9c2b197c6!2sInoodex!5e1!3m2!1sen!2sbd!4v1761630224299!5m2!1sen!2sbd', 1, '2025-10-23 00:43:37', '2025-10-27 23:48:44'),
(3, 'Emi Parrish', 'Quod explicabo In v', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4990.042312150872!2d90.35098391202087!3d23.82359397853129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1006cb54f2d%3A0x970526e9c2b197c6!2sInoodex!5e1!3m2!1sen!2sbd!4v1761630224299!5m2!1sen!2sbd', 1, '2025-10-23 00:45:53', '2025-10-27 23:49:41');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `logo` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `logo`, `name`, `slug`, `is_featured`, `status`, `created_at`, `updated_at`) VALUES
(1, 'uploads/brand/1848396232916772.png', 'Hygge', 'hygge', 1, 1, '2025-11-10 03:46:57', '2025-11-10 03:46:57');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('hygge-cache-footer_create_page', 'O:29:\"Illuminate\\Support\\Collection\":2:{s:8:\"\0*\0items\";a:7:{i:0;a:5:{s:8:\"page_for\";s:7:\"f_about\";s:4:\"name\";s:11:\"About Hygee\";s:4:\"slug\";s:11:\"about-hygee\";s:5:\"title\";s:10:\"About Page\";s:11:\"description\";s:4265:\"<h2 data-start=\"268\" data-end=\"304\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span style=\"font-weight: bolder; color: inherit; font-family: inherit; font-size: 1.75rem;\"><br></span></h2><h2 data-start=\"268\" data-end=\"304\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span style=\"font-weight: bolder; color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ Introduction</span></h2><blockquote data-start=\"332\" data-end=\"676\"><p data-start=\"334\" data-end=\"676\">Welcome to&nbsp;<span data-start=\"345\" data-end=\"354\" style=\"font-weight: bolder;\">Hygge</span>, your ultimate destination for premium bags and custom t-shirts. We believe in combining style, comfort, and quality to create products that not only look great but also make your everyday life easier. At Hygge, every product is designed with love and attention to detail, ensuring that our customers always get the best.</p></blockquote><hr data-start=\"678\" data-end=\"681\"><h3 data-start=\"683\" data-end=\"712\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span data-start=\"687\" data-end=\"712\" style=\"font-weight: bolder;\">2️⃣ Mission Statement</span></h3><blockquote data-start=\"714\" data-end=\"1011\"><p data-start=\"716\" data-end=\"1011\">Our mission is to provide high-quality, customizable products that allow you to express your personality. Whether it’s a stylish bag for your daily use or a unique t-shirt with your personal design, we are committed to delivering products that meet your style, comfort, and quality expectations.</p></blockquote><hr data-start=\"1013\" data-end=\"1016\"><h3 data-start=\"1018\" data-end=\"1046\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span data-start=\"1022\" data-end=\"1046\" style=\"font-weight: bolder;\">3️⃣ Vision Statement</span></h3><blockquote data-start=\"1048\" data-end=\"1289\"><p data-start=\"1050\" data-end=\"1289\">We envision a world where everyone can showcase their creativity through the products they wear and carry. Our vision is to become a leading eCommerce platform for customizable fashion, inspiring people to make their style truly their own.</p></blockquote><hr data-start=\"1291\" data-end=\"1294\"><h3 data-start=\"1296\" data-end=\"1321\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span data-start=\"1300\" data-end=\"1321\" style=\"font-weight: bolder;\">4️⃣ Why Choose Us</span></h3><blockquote data-start=\"1323\" data-end=\"1710\"><ul data-start=\"1325\" data-end=\"1710\"><li data-start=\"1325\" data-end=\"1418\"><p data-start=\"1327\" data-end=\"1418\"><span data-start=\"1327\" data-end=\"1354\" style=\"font-weight: bolder;\">High Quality Materials:</span>&nbsp;All our bags and t-shirts are crafted with premium materials.</p></li><li data-start=\"1421\" data-end=\"1516\"><p data-start=\"1423\" data-end=\"1516\"><span data-start=\"1423\" data-end=\"1449\" style=\"font-weight: bolder;\">Customization Options:</span>&nbsp;From text to colors and images, personalize your product easily.</p></li><li data-start=\"1519\" data-end=\"1613\"><p data-start=\"1521\" data-end=\"1613\"><span data-start=\"1521\" data-end=\"1547\" style=\"font-weight: bolder;\">Customer Satisfaction:</span>&nbsp;We value our customers and strive to provide excellent service.</p></li><li data-start=\"1616\" data-end=\"1710\"><p data-start=\"1618\" data-end=\"1710\"><span data-start=\"1618\" data-end=\"1636\" style=\"font-weight: bolder;\">Fast Delivery:</span>&nbsp;Quick processing and shipping ensure you receive your products on time.</p></li></ul></blockquote><hr data-start=\"1712\" data-end=\"1715\"><h3 data-start=\"1717\" data-end=\"1755\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span data-start=\"1721\" data-end=\"1755\" style=\"font-weight: bolder;\">5️⃣ Call to Action / Shop Link</span></h3><p></p><blockquote data-start=\"1757\" data-end=\"1904\"><p data-start=\"1759\" data-end=\"1904\">Explore our wide range of bags and t-shirts and discover the joy of personalized products.&nbsp;<span data-start=\"1850\" data-end=\"1864\" style=\"font-weight: bolder;\">[Shop Now]</span>&nbsp;to create your unique style with Hygge!</p></blockquote>\";}i:1;a:5:{s:8:\"page_for\";s:7:\"f_about\";s:4:\"name\";s:7:\"Careers\";s:4:\"slug\";s:7:\"careers\";s:5:\"title\";s:12:\"Careers Page\";s:11:\"description\";s:4018:\"<h2 data-start=\"186\" data-end=\"224\"><strong data-start=\"230\" data-end=\"250\" style=\"color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ Introduction</strong></h2><h2 data-start=\"268\" data-end=\"304\">\r\n\r\n<blockquote data-start=\"252\" data-end=\"542\">\r\n<p data-start=\"254\" data-end=\"542\">Join the <strong data-start=\"263\" data-end=\"277\">Hygge team</strong> and be part of a fast-growing eCommerce brand that values creativity, innovation, and customer satisfaction. We are passionate about delivering premium bags and customizable t-shirts while creating a supportive and collaborative work environment for our employees.</p>\r\n</blockquote>\r\n<hr data-start=\"544\" data-end=\"547\">\r\n</h2><h3 data-start=\"549\" data-end=\"572\"><strong data-start=\"553\" data-end=\"572\">2️⃣ Our Mission</strong></h3><h2 data-start=\"268\" data-end=\"304\">\r\n<blockquote data-start=\"574\" data-end=\"875\">\r\n<p data-start=\"576\" data-end=\"875\">At Hygge, our mission is to empower individuals through quality products and excellent service. We believe that our team is the heart of our success. We are constantly looking for talented and motivated individuals who share our vision of creating unique and high-quality products for our customers.</p>\r\n</blockquote>\r\n<hr data-start=\"877\" data-end=\"880\">\r\n</h2><h3 data-start=\"882\" data-end=\"910\"><strong data-start=\"886\" data-end=\"910\">3️⃣ Why Work With Us</strong></h3><h2 data-start=\"268\" data-end=\"304\">\r\n<blockquote data-start=\"912\" data-end=\"1319\">\r\n<ul data-start=\"914\" data-end=\"1319\">\r\n<li data-start=\"914\" data-end=\"1011\">\r\n<p data-start=\"916\" data-end=\"1011\"><strong data-start=\"916\" data-end=\"943\">Innovative Environment:</strong> Work on exciting projects in eCommerce and product customization.</p>\r\n</li>\r\n<li data-start=\"1014\" data-end=\"1127\">\r\n<p data-start=\"1016\" data-end=\"1127\"><strong data-start=\"1016\" data-end=\"1041\">Growth Opportunities:</strong> We encourage professional development and provide career advancement opportunities.</p>\r\n</li>\r\n<li data-start=\"1130\" data-end=\"1233\">\r\n<p data-start=\"1132\" data-end=\"1233\"><strong data-start=\"1132\" data-end=\"1155\">Collaborative Team:</strong> Join a team that values collaboration, creativity, and ideas from everyone.</p>\r\n</li>\r\n<li data-start=\"1236\" data-end=\"1319\">\r\n<p data-start=\"1238\" data-end=\"1319\"><strong data-start=\"1238\" data-end=\"1264\">Flexible Work Culture:</strong> We support work-life balance and flexible schedules.</p>\r\n</li>\r\n</ul>\r\n</blockquote>\r\n<hr data-start=\"1321\" data-end=\"1324\">\r\n</h2><h3 data-start=\"1326\" data-end=\"1360\"><strong data-start=\"1330\" data-end=\"1360\">4️⃣ Current Open Positions</strong></h3><h2 data-start=\"268\" data-end=\"304\">\r\n<blockquote data-start=\"1362\" data-end=\"1555\">\r\n<p data-start=\"1364\" data-end=\"1429\">We are looking for talented individuals in the following areas:</p>\r\n<ul data-start=\"1432\" data-end=\"1555\">\r\n<li data-start=\"1432\" data-end=\"1464\">\r\n<p data-start=\"1434\" data-end=\"1464\">Product Design &amp; Development</p>\r\n</li>\r\n<li data-start=\"1467\" data-end=\"1495\">\r\n<p data-start=\"1469\" data-end=\"1495\">Marketing &amp; Social Media</p>\r\n</li>\r\n<li data-start=\"1498\" data-end=\"1528\">\r\n<p data-start=\"1500\" data-end=\"1528\">Customer Support &amp; Service</p>\r\n</li>\r\n<li data-start=\"1531\" data-end=\"1555\">\r\n<p data-start=\"1533\" data-end=\"1555\">Web Development &amp; IT</p>\r\n</li>\r\n</ul>\r\n</blockquote>\r\n<blockquote data-start=\"1557\" data-end=\"1682\">\r\n<p data-start=\"1559\" data-end=\"1682\">If you are passionate about eCommerce, fashion, and customization, Hygge is the place for you to grow and make an impact.</p>\r\n</blockquote>\r\n<hr data-start=\"1684\" data-end=\"1687\">\r\n</h2><h3 data-start=\"1689\" data-end=\"1715\"><strong data-start=\"1693\" data-end=\"1715\">5️⃣ Call to Action</strong></h3><h2 data-start=\"268\" data-end=\"304\">\r\n<blockquote data-start=\"1717\" data-end=\"1793\">\r\n<p data-start=\"1719\" data-end=\"1793\">Ready to join us? <strong data-start=\"1737\" data-end=\"1752\">[Apply Now]</strong> and become a part of the Hygge family!</p></blockquote></h2>\";}i:2;a:5:{s:8:\"page_for\";s:5:\"f_h_s\";s:4:\"name\";s:3:\"FAQ\";s:4:\"slug\";s:3:\"faq\";s:5:\"title\";s:3:\"FAQ\";s:11:\"description\";s:4538:\"<h2 data-start=\"183\" data-end=\"214\"><strong data-start=\"186\" data-end=\"214\">FAQ Page</strong></h2><h3 data-start=\"216\" data-end=\"246\"><strong data-start=\"220\" data-end=\"246\">1️⃣ Ordering &amp; Payment</strong></h3><p data-start=\"248\" data-end=\"282\"><strong data-start=\"248\" data-end=\"280\">Q1: How do I place an order?</strong></p><blockquote data-start=\"283\" data-end=\"457\">\r\n<p data-start=\"285\" data-end=\"457\">Simply browse our collection of bags and t-shirts, customize your product if you want, and click \"Add to Cart\". Then proceed to checkout and complete the payment process.</p>\r\n</blockquote><p data-start=\"459\" data-end=\"503\"><strong data-start=\"459\" data-end=\"501\">Q2: What payment methods are accepted?</strong></p><blockquote data-start=\"504\" data-end=\"600\">\r\n<p data-start=\"506\" data-end=\"600\">We accept all major credit and debit cards, PayPal, and other secure online payment methods.</p>\r\n</blockquote><hr data-start=\"602\" data-end=\"605\"><h3 data-start=\"607\" data-end=\"638\"><strong data-start=\"611\" data-end=\"638\">2️⃣ Shipping &amp; Delivery</strong></h3><p data-start=\"640\" data-end=\"678\"><strong data-start=\"640\" data-end=\"676\">Q3: How long does shipping take?</strong></p><blockquote data-start=\"679\" data-end=\"806\">\r\n<p data-start=\"681\" data-end=\"806\">Standard shipping usually takes 3–7 business days. Customized products may take a bit longer, typically 7–10 business days.</p>\r\n</blockquote><p data-start=\"808\" data-end=\"839\"><strong data-start=\"808\" data-end=\"837\">Q4: Can I track my order?</strong></p><blockquote data-start=\"840\" data-end=\"946\">\r\n<p data-start=\"842\" data-end=\"946\">Yes! Once your order is shipped, you will receive a tracking number via email to monitor your package.</p>\r\n</blockquote><hr data-start=\"948\" data-end=\"951\"><h3 data-start=\"953\" data-end=\"989\"><strong data-start=\"957\" data-end=\"989\">3️⃣ Customization &amp; Products</strong></h3><p data-start=\"991\" data-end=\"1035\"><strong data-start=\"991\" data-end=\"1033\">Q5: Can I customize my t-shirt or bag?</strong></p><blockquote data-start=\"1036\" data-end=\"1186\">\r\n<p data-start=\"1038\" data-end=\"1186\">Absolutely! You can add custom text, choose colors, and even upload your own images. Our preview feature lets you see your design before ordering.</p>\r\n</blockquote><p data-start=\"1188\" data-end=\"1250\"><strong data-start=\"1188\" data-end=\"1248\">Q6: How is the price calculated for customized products?</strong></p><blockquote data-start=\"1251\" data-end=\"1418\">\r\n<p data-start=\"1253\" data-end=\"1418\">The base price is for the default product. Any additional customizations (text, images, colors) may increase the price, which is updated automatically in the cart.</p>\r\n</blockquote><hr data-start=\"1420\" data-end=\"1423\"><h3 data-start=\"1425\" data-end=\"1454\"><strong data-start=\"1429\" data-end=\"1454\">4️⃣ Returns &amp; Refunds</strong></h3><p data-start=\"1456\" data-end=\"1500\"><strong data-start=\"1456\" data-end=\"1498\">Q7: Can I return a customized product?</strong></p><blockquote data-start=\"1501\" data-end=\"1646\">\r\n<p data-start=\"1503\" data-end=\"1646\">Unfortunately, customized products are non-returnable unless there is a defect. Standard products can be returned within 14 days of delivery.</p>\r\n</blockquote><p data-start=\"1648\" data-end=\"1684\"><strong data-start=\"1648\" data-end=\"1682\">Q8: How do I request a refund?</strong></p><blockquote data-start=\"1685\" data-end=\"1821\">\r\n<p data-start=\"1687\" data-end=\"1821\">Contact our customer support via email or chat with your order details. We will process your request according to our return policy.</p>\r\n</blockquote><hr data-start=\"1823\" data-end=\"1826\"><h3 data-start=\"1828\" data-end=\"1857\"><strong data-start=\"1832\" data-end=\"1857\">5️⃣ Account &amp; Support</strong></h3><p data-start=\"1859\" data-end=\"1908\"><strong data-start=\"1859\" data-end=\"1906\">Q9: Do I need an account to place an order?</strong></p><blockquote data-start=\"1909\" data-end=\"2034\">\r\n<p data-start=\"1911\" data-end=\"2034\">You can checkout as a guest, but creating an account helps you track orders, save addresses, and access exclusive offers.</p>\r\n</blockquote><p data-start=\"2036\" data-end=\"2082\"><strong data-start=\"2036\" data-end=\"2080\">Q10: How can I contact customer support?</strong></p><p>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n</p><blockquote data-start=\"2083\" data-end=\"2211\">\r\n<p data-start=\"2085\" data-end=\"2211\">You can reach us via the “Contact Us” page, email, or live chat during business hours. We strive to respond within 24 hours.</p></blockquote>\";}i:3;a:5:{s:8:\"page_for\";s:5:\"f_h_s\";s:4:\"name\";s:8:\"Shipping\";s:4:\"slug\";s:8:\"shipping\";s:5:\"title\";s:13:\"Shipping Page\";s:11:\"description\";s:5339:\"<h2 data-start=\"192\" data-end=\"228\"><strong data-start=\"234\" data-end=\"266\" style=\"color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ Shipping Policy Overview</strong></h2><blockquote data-start=\"268\" data-end=\"453\">\r\n<p data-start=\"270\" data-end=\"453\">At <strong data-start=\"273\" data-end=\"282\">Hygge</strong>, we strive to deliver your bags and t-shirts quickly and safely. Our shipping policy ensures transparency and reliability, so you always know when to expect your order.</p>\r\n</blockquote><hr data-start=\"455\" data-end=\"458\"><h3 data-start=\"460\" data-end=\"487\"><strong data-start=\"464\" data-end=\"487\">2️⃣ Processing Time</strong></h3><blockquote data-start=\"489\" data-end=\"726\">\r\n<p data-start=\"491\" data-end=\"560\">Once you place an order, our team begins processing it immediately.</p>\r\n<ul data-start=\"563\" data-end=\"726\">\r\n<li data-start=\"563\" data-end=\"625\">\r\n<p data-start=\"565\" data-end=\"625\"><strong data-start=\"565\" data-end=\"587\">Standard Products:</strong> Processed within 1–2 business days.</p>\r\n</li>\r\n<li data-start=\"628\" data-end=\"726\">\r\n<p data-start=\"630\" data-end=\"726\"><strong data-start=\"630\" data-end=\"654\">Customized Products:</strong> Since these are made-to-order, processing may take 3–5 business days.</p>\r\n</li>\r\n</ul>\r\n</blockquote><hr data-start=\"728\" data-end=\"731\"><h3 data-start=\"733\" data-end=\"777\"><strong data-start=\"737\" data-end=\"777\">3️⃣ Shipping Methods &amp; Delivery Time</strong></h3><div class=\"_tableContainer_1rjym_1\"><div tabindex=\"-1\" class=\"group _tableWrapper_1rjym_13 flex w-fit flex-col-reverse\"><table data-start=\"779\" data-end=\"1081\" class=\"w-fit min-w-(--thread-content-width)\"><thead data-start=\"779\" data-end=\"831\"><tr data-start=\"779\" data-end=\"831\"><th data-start=\"779\" data-end=\"797\" data-col-size=\"sm\">Shipping Method</th><th data-start=\"797\" data-end=\"823\" data-col-size=\"sm\">Estimated Delivery Time</th><th data-start=\"823\" data-end=\"831\" data-col-size=\"sm\">Cost</th></tr></thead><tbody data-start=\"883\" data-end=\"1081\"><tr data-start=\"883\" data-end=\"951\"><td data-start=\"883\" data-end=\"903\" data-col-size=\"sm\">Standard Shipping</td><td data-start=\"903\" data-end=\"923\" data-col-size=\"sm\">3–7 business days</td><td data-col-size=\"sm\" data-start=\"923\" data-end=\"951\">Free on orders above $50</td></tr><tr data-start=\"952\" data-end=\"1008\"><td data-start=\"952\" data-end=\"971\" data-col-size=\"sm\">Express Shipping</td><td data-col-size=\"sm\" data-start=\"971\" data-end=\"991\">1–3 business days</td><td data-col-size=\"sm\" data-start=\"991\" data-end=\"1008\">$10 flat rate</td></tr><tr data-start=\"1009\" data-end=\"1081\"><td data-start=\"1009\" data-end=\"1034\" data-col-size=\"sm\">International Shipping</td><td data-col-size=\"sm\" data-start=\"1034\" data-end=\"1055\">7–14 business days</td><td data-col-size=\"sm\" data-start=\"1055\" data-end=\"1081\">Calculated at checkout</td></tr></tbody></table></div></div><blockquote data-start=\"1083\" data-end=\"1170\">\r\n<p data-start=\"1085\" data-end=\"1170\">Delivery times may vary depending on location and customs for international orders.</p>\r\n</blockquote><hr data-start=\"1172\" data-end=\"1175\"><h3 data-start=\"1177\" data-end=\"1203\"><strong data-start=\"1181\" data-end=\"1203\">4️⃣ Order Tracking</strong></h3><blockquote data-start=\"1205\" data-end=\"1338\">\r\n<p data-start=\"1207\" data-end=\"1338\">After your order is shipped, you will receive a tracking number via email. Use this number to monitor your shipment in real-time.</p>\r\n</blockquote><hr data-start=\"1340\" data-end=\"1343\"><h3 data-start=\"1345\" data-end=\"1378\"><strong data-start=\"1349\" data-end=\"1378\">5️⃣ Shipping Restrictions</strong></h3><blockquote data-start=\"1380\" data-end=\"1554\">\r\n<ul data-start=\"1382\" data-end=\"1554\">\r\n<li data-start=\"1382\" data-end=\"1433\">\r\n<p data-start=\"1384\" data-end=\"1433\">Currently, we ship to most countries worldwide.</p>\r\n</li>\r\n<li data-start=\"1436\" data-end=\"1487\">\r\n<p data-start=\"1438\" data-end=\"1487\">Some regions may have limited shipping options.</p>\r\n</li>\r\n<li data-start=\"1490\" data-end=\"1554\">\r\n<p data-start=\"1492\" data-end=\"1554\">Customized products cannot be shipped via same-day delivery.</p>\r\n</li>\r\n</ul>\r\n</blockquote><hr data-start=\"1556\" data-end=\"1559\"><h3 data-start=\"1561\" data-end=\"1594\"><strong data-start=\"1565\" data-end=\"1594\">6️⃣ Lost or Damaged Items</strong></h3><blockquote data-start=\"1596\" data-end=\"1816\">\r\n<p data-start=\"1598\" data-end=\"1816\">If your order is lost or arrives damaged, please contact our customer support immediately. Provide your order number and details of the issue. We will work quickly to resolve the problem and ensure your satisfaction.</p>\r\n</blockquote><hr data-start=\"1818\" data-end=\"1821\"><h3 data-start=\"1823\" data-end=\"1861\"><strong data-start=\"1827\" data-end=\"1861\">7️⃣ Free Shipping &amp; Promotions</strong></h3><blockquote data-start=\"1863\" data-end=\"1985\">\r\n<ul data-start=\"1865\" data-end=\"1985\">\r\n<li data-start=\"1865\" data-end=\"1912\">\r\n<p data-start=\"1867\" data-end=\"1912\">Free shipping on domestic orders above $50.</p>\r\n</li>\r\n<li data-start=\"1915\" data-end=\"1985\">\r\n<p data-start=\"1917\" data-end=\"1985\">Check our homepage for seasonal promotions and shipping discounts.</p>\r\n</li>\r\n</ul>\r\n</blockquote><p>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n</p><p data-start=\"1992\" data-end=\"2024\"></p><hr data-start=\"1987\" data-end=\"1990\">\";}i:4;a:5:{s:8:\"page_for\";s:3:\"f_l\";s:4:\"name\";s:16:\"Privacy & Policy\";s:4:\"slug\";s:16:\"privacy-&-policy\";s:5:\"title\";s:16:\"Privacy & Policy\";s:11:\"description\";s:6637:\"<h2 data-start=\"208\" data-end=\"252\"><strong data-start=\"258\" data-end=\"278\" style=\"color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ Introduction</strong></h2><blockquote data-start=\"280\" data-end=\"557\">\r\n<p data-start=\"282\" data-end=\"557\">At <strong data-start=\"285\" data-end=\"294\">Hygge</strong>, your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services. We are committed to ensuring that your personal data is handled responsibly and transparently.</p>\r\n</blockquote><hr data-start=\"559\" data-end=\"562\"><h3 data-start=\"564\" data-end=\"598\"><strong data-start=\"568\" data-end=\"598\">2️⃣ Information We Collect</strong></h3><blockquote data-start=\"600\" data-end=\"1011\">\r\n<p data-start=\"602\" data-end=\"654\">We may collect the following types of information:</p>\r\n<ul data-start=\"657\" data-end=\"1011\">\r\n<li data-start=\"657\" data-end=\"751\">\r\n<p data-start=\"659\" data-end=\"751\"><strong data-start=\"659\" data-end=\"684\">Personal Information:</strong> Name, email address, phone number, shipping and billing address.</p>\r\n</li>\r\n<li data-start=\"754\" data-end=\"853\">\r\n<p data-start=\"756\" data-end=\"853\"><strong data-start=\"756\" data-end=\"780\">Payment Information:</strong> Credit/debit card details and other payment info (processed securely).</p>\r\n</li>\r\n<li data-start=\"856\" data-end=\"931\">\r\n<p data-start=\"858\" data-end=\"931\"><strong data-start=\"858\" data-end=\"882\">Account Information:</strong> Login credentials, order history, preferences.</p>\r\n</li>\r\n<li data-start=\"934\" data-end=\"1011\">\r\n<p data-start=\"936\" data-end=\"1011\"><strong data-start=\"936\" data-end=\"951\">Usage Data:</strong> Pages visited, products viewed, and website interactions.</p>\r\n</li>\r\n</ul>\r\n</blockquote><hr data-start=\"1013\" data-end=\"1016\"><h3 data-start=\"1018\" data-end=\"1057\"><strong data-start=\"1022\" data-end=\"1057\">3️⃣ How We Use Your Information</strong></h3><blockquote data-start=\"1059\" data-end=\"1310\">\r\n<p data-start=\"1061\" data-end=\"1102\">The information we collect is used for:</p>\r\n<ul data-start=\"1105\" data-end=\"1310\">\r\n<li data-start=\"1105\" data-end=\"1147\">\r\n<p data-start=\"1107\" data-end=\"1147\">Processing and fulfilling your orders.</p>\r\n</li>\r\n<li data-start=\"1150\" data-end=\"1210\">\r\n<p data-start=\"1152\" data-end=\"1210\">Communicating with you about your orders and promotions.</p>\r\n</li>\r\n<li data-start=\"1213\" data-end=\"1252\">\r\n<p data-start=\"1215\" data-end=\"1252\">Improving our website and services.</p>\r\n</li>\r\n<li data-start=\"1255\" data-end=\"1310\">\r\n<p data-start=\"1257\" data-end=\"1310\">Ensuring the security and integrity of our website.</p>\r\n</li>\r\n</ul>\r\n</blockquote><hr data-start=\"1312\" data-end=\"1315\"><h3 data-start=\"1317\" data-end=\"1344\"><strong data-start=\"1321\" data-end=\"1344\">4️⃣ Data Protection</strong></h3><blockquote data-start=\"1346\" data-end=\"1569\">\r\n<p data-start=\"1348\" data-end=\"1569\">We implement industry-standard measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. All payment information is handled securely via trusted payment gateways.</p>\r\n</blockquote><hr data-start=\"1571\" data-end=\"1574\"><h3 data-start=\"1576\" data-end=\"1612\"><strong data-start=\"1580\" data-end=\"1612\">5️⃣ Sharing Your Information</strong></h3><blockquote data-start=\"1614\" data-end=\"1888\">\r\n<p data-start=\"1616\" data-end=\"1716\">We do not sell, trade, or otherwise transfer your personal information to outside parties, except:</p>\r\n<ul data-start=\"1719\" data-end=\"1888\">\r\n<li data-start=\"1719\" data-end=\"1843\">\r\n<p data-start=\"1721\" data-end=\"1843\">To trusted third-party service providers who assist in operating our website, processing payments, or delivering orders.</p>\r\n</li>\r\n<li data-start=\"1846\" data-end=\"1888\">\r\n<p data-start=\"1848\" data-end=\"1888\">When required by law or legal process.</p>\r\n</li>\r\n</ul>\r\n</blockquote><hr data-start=\"1890\" data-end=\"1893\"><h3 data-start=\"1895\" data-end=\"1925\"><strong data-start=\"1899\" data-end=\"1925\">6️⃣ Cookies &amp; Tracking</strong></h3><blockquote data-start=\"1927\" data-end=\"2133\">\r\n<p data-start=\"1929\" data-end=\"2133\">Our website uses cookies and similar technologies to enhance your shopping experience, remember preferences, and analyze website traffic. You can manage your cookie preferences in your browser settings.</p>\r\n</blockquote><hr data-start=\"2135\" data-end=\"2138\"><h3 data-start=\"2140\" data-end=\"2163\"><strong data-start=\"2144\" data-end=\"2163\">7️⃣ Your Rights</strong></h3><blockquote data-start=\"2165\" data-end=\"2333\">\r\n<p data-start=\"2167\" data-end=\"2191\">You have the right to:</p>\r\n<ul data-start=\"2194\" data-end=\"2333\">\r\n<li data-start=\"2194\" data-end=\"2242\">\r\n<p data-start=\"2196\" data-end=\"2242\">Access and update your personal information.</p>\r\n</li>\r\n<li data-start=\"2245\" data-end=\"2290\">\r\n<p data-start=\"2247\" data-end=\"2290\">Request deletion of your account or data.</p>\r\n</li>\r\n<li data-start=\"2293\" data-end=\"2333\">\r\n<p data-start=\"2295\" data-end=\"2333\">Opt-out of marketing communications.</p>\r\n</li>\r\n</ul>\r\n</blockquote><blockquote data-start=\"2335\" data-end=\"2411\">\r\n<p data-start=\"2337\" data-end=\"2411\">For any privacy-related requests, contact us at <strong data-start=\"2385\" data-end=\"2408\">[<a class=\"decorated-link cursor-pointer\" rel=\"noopener\">support@hygge.com<span aria-hidden=\"true\" class=\"ms-0.5 inline-block align-middle leading-none\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" data-rtl-flip=\"\" class=\"block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75]\"><path d=\"M14.3349 13.3301V6.60645L5.47065 15.4707C5.21095 15.7304 4.78895 15.7304 4.52925 15.4707C4.26955 15.211 4.26955 14.789 4.52925 14.5293L13.3935 5.66504H6.66011C6.29284 5.66504 5.99507 5.36727 5.99507 5C5.99507 4.63273 6.29284 4.33496 6.66011 4.33496H14.9999L15.1337 4.34863C15.4369 4.41057 15.665 4.67857 15.665 5V13.3301C15.6649 13.6973 15.3672 13.9951 14.9999 13.9951C14.6327 13.9951 14.335 13.6973 14.3349 13.3301Z\"></path></svg></span></a>]</strong>.</p>\r\n</blockquote><hr data-start=\"2413\" data-end=\"2416\"><h3 data-start=\"2418\" data-end=\"2444\"><strong data-start=\"2422\" data-end=\"2444\">8️⃣ Policy Updates</strong></h3><p>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n</p><blockquote data-start=\"2446\" data-end=\"2671\">\r\n<p data-start=\"2448\" data-end=\"2671\">We may update this Privacy Policy from time to time. Changes will be posted on this page with the effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.</p></blockquote>\";}i:5;a:5:{s:8:\"page_for\";s:3:\"f_l\";s:4:\"name\";s:18:\"Ads & Cookies Page\";s:4:\"slug\";s:18:\"ads-&-cookies-page\";s:5:\"title\";s:18:\"Ads & Cookies Page\";s:11:\"description\";s:5153:\"<h2 data-start=\"192\" data-end=\"233\"><strong data-start=\"239\" data-end=\"259\" style=\"color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ </strong><strong data-start=\"239\" data-end=\"259\" style=\"font-family: inherit; font-size: 1.75rem; color: rgb(255, 0, 0);\">Introduction</strong></h2><blockquote data-start=\"261\" data-end=\"490\">\r\n<p data-start=\"263\" data-end=\"490\">At <strong data-start=\"266\" data-end=\"275\">Hygge</strong>, we use cookies and advertising technologies to improve your browsing experience and to deliver relevant marketing messages. This page explains how we use cookies and ads, and how you can manage your preferences.</p>\r\n</blockquote><hr data-start=\"492\" data-end=\"495\"><h3 data-start=\"497\" data-end=\"526\"><strong data-start=\"501\" data-end=\"526\">2️⃣ What Are Cookies?</strong></h3><blockquote data-start=\"528\" data-end=\"728\">\r\n<p data-start=\"530\" data-end=\"728\">Cookies are small text files stored on your device by your web browser. They help websites remember your actions and preferences, such as login details, shopping cart items, and language settings.</p>\r\n</blockquote><hr data-start=\"730\" data-end=\"733\"><h3 data-start=\"735\" data-end=\"770\"><strong data-start=\"739\" data-end=\"770\">3️⃣ Types of Cookies We Use</strong></h3><div class=\"_tableContainer_1rjym_1\"><div tabindex=\"-1\" class=\"group _tableWrapper_1rjym_13 flex w-fit flex-col-reverse\"><table data-start=\"772\" data-end=\"1223\" class=\"w-fit min-w-(--thread-content-width)\"><thead data-start=\"772\" data-end=\"797\"><tr data-start=\"772\" data-end=\"797\"><th data-start=\"772\" data-end=\"786\" data-col-size=\"sm\">Cookie Type</th><th data-start=\"786\" data-end=\"797\" data-col-size=\"md\">Purpose</th></tr></thead><tbody data-start=\"823\" data-end=\"1223\"><tr data-start=\"823\" data-end=\"923\"><td data-start=\"823\" data-end=\"847\" data-col-size=\"sm\"><strong data-start=\"825\" data-end=\"846\">Essential Cookies</strong></td><td data-start=\"847\" data-end=\"923\" data-col-size=\"md\">Required for website functionality, like login, shopping cart, checkout.</td></tr><tr data-start=\"924\" data-end=\"1023\"><td data-start=\"924\" data-end=\"950\" data-col-size=\"sm\"><strong data-start=\"926\" data-end=\"949\">Performance Cookies</strong></td><td data-start=\"950\" data-end=\"1023\" data-col-size=\"md\">Help us understand how visitors use our site and improve performance.</td></tr><tr data-start=\"1024\" data-end=\"1107\"><td data-start=\"1024\" data-end=\"1049\" data-col-size=\"sm\"><strong data-start=\"1026\" data-end=\"1048\">Functional Cookies</strong></td><td data-col-size=\"md\" data-start=\"1049\" data-end=\"1107\">Remember your preferences (language, location, theme).</td></tr><tr data-start=\"1108\" data-end=\"1223\"><td data-start=\"1108\" data-end=\"1144\" data-col-size=\"sm\"><strong data-start=\"1110\" data-end=\"1143\">Advertising/Marketing Cookies</strong></td><td data-start=\"1144\" data-end=\"1223\" data-col-size=\"md\">Deliver relevant ads on Hygge or third-party sites based on your interests.</td></tr></tbody></table></div></div><hr data-start=\"1225\" data-end=\"1228\"><h3 data-start=\"1230\" data-end=\"1253\"><strong data-start=\"1234\" data-end=\"1253\">4️⃣ Advertising</strong></h3><blockquote data-start=\"1255\" data-end=\"1468\">\r\n<p data-start=\"1257\" data-end=\"1468\">We use third-party advertising partners to display relevant ads. These partners may collect information about your browsing behavior on our site and across other websites to show ads that match your interests.</p>\r\n</blockquote><blockquote data-start=\"1470\" data-end=\"1612\">\r\n<p data-start=\"1472\" data-end=\"1612\">You may opt out of personalized advertising by adjusting your device/browser settings or using the links provided by advertising networks.</p>\r\n</blockquote><hr data-start=\"1614\" data-end=\"1617\"><h3 data-start=\"1619\" data-end=\"1647\"><strong data-start=\"1623\" data-end=\"1647\">5️⃣ Managing Cookies</strong></h3><blockquote data-start=\"1649\" data-end=\"1857\">\r\n<p data-start=\"1651\" data-end=\"1745\">You can control or delete cookies through your browser settings. Most browsers allow you to:</p>\r\n<ul data-start=\"1748\" data-end=\"1857\">\r\n<li data-start=\"1748\" data-end=\"1778\">\r\n<p data-start=\"1750\" data-end=\"1778\">Block or allow all cookies</p>\r\n</li>\r\n<li data-start=\"1781\" data-end=\"1808\">\r\n<p data-start=\"1783\" data-end=\"1808\">Delete specific cookies</p>\r\n</li>\r\n<li data-start=\"1811\" data-end=\"1857\">\r\n<p data-start=\"1813\" data-end=\"1857\">Receive notifications when a cookie is set</p>\r\n</li>\r\n</ul>\r\n</blockquote><blockquote data-start=\"1859\" data-end=\"1976\">\r\n<p data-start=\"1861\" data-end=\"1976\">Note: Disabling certain cookies may affect the functionality of the website, such as login or checkout processes.</p>\r\n</blockquote><hr data-start=\"1978\" data-end=\"1981\"><h3 data-start=\"1983\" data-end=\"2017\"><strong data-start=\"1987\" data-end=\"2017\">6️⃣ Updates to This Policy</strong></h3><p>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n</p><blockquote data-start=\"2019\" data-end=\"2197\">\r\n<p data-start=\"2021\" data-end=\"2197\">We may update this Ads &amp; Cookies Policy from time to time. All changes will be posted on this page with the effective date. We encourage you to review this page periodically.</p></blockquote>\";}i:6;a:5:{s:8:\"page_for\";s:3:\"f_l\";s:4:\"name\";s:17:\"Legal Notice Page\";s:4:\"slug\";s:17:\"legal-notice-page\";s:5:\"title\";s:17:\"Legal Notice Page\";s:11:\"description\";s:4948:\"<h2 data-start=\"190\" data-end=\"230\"><strong data-start=\"236\" data-end=\"256\" style=\"color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ Introduction</strong></h2><blockquote data-start=\"258\" data-end=\"463\">\r\n<p data-start=\"260\" data-end=\"463\">Welcome to <strong data-start=\"271\" data-end=\"280\">Hygge</strong>. This Legal Notice outlines the terms, conditions, and legal obligations of using our website and services. By accessing or using our website, you agree to comply with these terms.</p>\r\n</blockquote><hr data-start=\"465\" data-end=\"468\"><h3 data-start=\"470\" data-end=\"501\"><strong data-start=\"474\" data-end=\"501\">2️⃣ Company Information</strong></h3><blockquote data-start=\"503\" data-end=\"713\">\r\n<p data-start=\"505\" data-end=\"713\"><strong data-start=\"505\" data-end=\"514\">Hygge</strong><br data-start=\"514\" data-end=\"517\">\r\nAddress: Denmark<br data-start=\"550\" data-end=\"553\">\r\nEmail: <a class=\"decorated-link cursor-pointer\" rel=\"noopener\">support@hygge.com</a><br data-start=\"581\" data-end=\"584\">\r\nPhone: 0157848774<br data-start=\"613\" data-end=\"616\">\r\nRegistration Number:<br data-start=\"668\" data-end=\"671\">\r\nVAT Number:</p>\r\n</blockquote><hr data-start=\"715\" data-end=\"718\"><h3 data-start=\"720\" data-end=\"760\"><strong data-start=\"724\" data-end=\"760\">3️⃣ Intellectual Property Rights</strong></h3><blockquote data-start=\"762\" data-end=\"1033\">\r\n<p data-start=\"764\" data-end=\"1033\">All content on this website, including text, images, logos, product designs, and software, is the property of Hygge or its licensors and is protected by intellectual property laws. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.</p>\r\n</blockquote><hr data-start=\"1035\" data-end=\"1038\"><h3 data-start=\"1040\" data-end=\"1063\"><strong data-start=\"1044\" data-end=\"1063\">4️⃣ Website Use</strong></h3><blockquote data-start=\"1065\" data-end=\"1295\">\r\n<p data-start=\"1067\" data-end=\"1295\">Users are granted a limited, non-exclusive, and non-transferable license to access and use the website for personal purposes only. Misuse, unauthorized access, or attempts to disrupt website operations are strictly prohibited.</p>\r\n</blockquote><hr data-start=\"1297\" data-end=\"1300\"><h3 data-start=\"1302\" data-end=\"1345\"><strong data-start=\"1306\" data-end=\"1345\">5️⃣ Product Information &amp; Liability</strong></h3><blockquote data-start=\"1347\" data-end=\"1615\">\r\n<p data-start=\"1349\" data-end=\"1615\">We make every effort to provide accurate product descriptions, images, and pricing. However, minor errors or discrepancies may occur. Hygge is not liable for any direct or indirect damages arising from the use of the website or products, except as required by law.</p>\r\n</blockquote><hr data-start=\"1617\" data-end=\"1620\"><h3 data-start=\"1622\" data-end=\"1663\"><strong data-start=\"1626\" data-end=\"1663\">6️⃣ Links to Third-Party Websites</strong></h3><blockquote data-start=\"1665\" data-end=\"1921\">\r\n<p data-start=\"1667\" data-end=\"1921\">Our website may contain links to external websites. We are not responsible for the content, privacy practices, or terms of use of third-party sites. Users are advised to review the legal notices and privacy policies of any external websites they visit.</p>\r\n</blockquote><hr data-start=\"1923\" data-end=\"1926\"><h3 data-start=\"1928\" data-end=\"1963\"><strong data-start=\"1932\" data-end=\"1963\">7️⃣ Changes to Legal Notice</strong></h3><blockquote data-start=\"1965\" data-end=\"2179\">\r\n<p data-start=\"1967\" data-end=\"2179\">Hygge reserves the right to modify or update this Legal Notice at any time. Changes will be posted on this page with the effective date. Continued use of the website constitutes acceptance of the updated terms.</p>\r\n</blockquote><hr data-start=\"2181\" data-end=\"2184\"><h3 data-start=\"2186\" data-end=\"2217\"><strong data-start=\"2190\" data-end=\"2217\">8️⃣ Contact Information</strong></h3><p>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n</p><blockquote data-start=\"2219\" data-end=\"2315\">\r\n<p data-start=\"2221\" data-end=\"2315\">For any questions regarding this Legal Notice, please contact us at <strong data-start=\"2289\" data-end=\"2312\">[<a class=\"decorated-link cursor-pointer\" rel=\"noopener\">support@hygge.com<span aria-hidden=\"true\" class=\"ms-0.5 inline-block align-middle leading-none\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" data-rtl-flip=\"\" class=\"block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75]\"><path d=\"M14.3349 13.3301V6.60645L5.47065 15.4707C5.21095 15.7304 4.78895 15.7304 4.52925 15.4707C4.26955 15.211 4.26955 14.789 4.52925 14.5293L13.3935 5.66504H6.66011C6.29284 5.66504 5.99507 5.36727 5.99507 5C5.99507 4.63273 6.29284 4.33496 6.66011 4.33496H14.9999L15.1337 4.34863C15.4369 4.41057 15.665 4.67857 15.665 5V13.3301C15.6649 13.6973 15.3672 13.9951 14.9999 13.9951C14.6327 13.9951 14.335 13.6973 14.3349 13.3301Z\"></path></svg></span></a>]</strong>.</p></blockquote>\";}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}', 1764606074),
('hygge-cache-footer_data', 'a:5:{s:4:\"logo\";N;s:5:\"phone\";s:11:\"+4553713518\";s:5:\"email\";s:25:\"hyggecotton2025@gmail.com\";s:7:\"address\";s:30:\"Trommesalen 3, 1614 København\";s:9:\"copyright\";s:42:\"Hyggo Cotton || Ideation & Design Shahadat\";}', 1764606074),
('hygge-cache-footer_social', 'O:29:\"Illuminate\\Support\\Collection\":2:{s:8:\"\0*\0items\";a:3:{i:0;a:5:{s:4:\"icon\";s:17:\"fab fa-facebook-f\";s:10:\"icon_extra\";N;s:4:\"name\";s:8:\"Facebook\";s:3:\"url\";s:57:\"https://api.sandbox.africastalking.com/version1/messaging\";s:9:\"serial_no\";s:1:\"1\";}i:1;a:5:{s:4:\"icon\";s:16:\"fab fa-instagram\";s:10:\"icon_extra\";N;s:4:\"name\";s:10:\"Instragram\";s:3:\"url\";s:47:\"https://www.instagram.com/accounts/login/?hl=en\";s:9:\"serial_no\";s:1:\"2\";}i:2;a:5:{s:4:\"icon\";s:14:\"fab fa-twitter\";s:10:\"icon_extra\";N;s:4:\"name\";s:7:\"Twitter\";s:3:\"url\";s:22:\"https://x.com/?lang=en\";s:9:\"serial_no\";s:1:\"3\";}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}', 1764606074),
('hygge-cache-general_setting', 'O:25:\"App\\Models\\GeneralSetting\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:16:\"general_settings\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:2:\"id\";s:1:\"1\";s:9:\"site_name\";s:5:\"hygee\";s:13:\"contact_email\";s:15:\"hygee@gmail.com\";s:13:\"contact_phone\";s:11:\"01358796542\";s:15:\"contact_address\";s:5:\"Dhaka\";s:13:\"currency_name\";s:3:\"USD\";s:13:\"currency_icon\";s:3:\"€\";s:9:\"time_zone\";s:10:\"Asia/Dhaka\";s:3:\"map\";N;s:10:\"created_at\";N;s:10:\"updated_at\";s:19:\"2025-11-30 12:16:18\";}s:11:\"\0*\0original\";a:11:{s:2:\"id\";s:1:\"1\";s:9:\"site_name\";s:5:\"hygee\";s:13:\"contact_email\";s:15:\"hygee@gmail.com\";s:13:\"contact_phone\";s:11:\"01358796542\";s:15:\"contact_address\";s:5:\"Dhaka\";s:13:\"currency_name\";s:3:\"USD\";s:13:\"currency_icon\";s:3:\"€\";s:9:\"time_zone\";s:10:\"Asia/Dhaka\";s:3:\"map\";N;s:10:\"created_at\";N;s:10:\"updated_at\";s:19:\"2025-11-30 12:16:18\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:8:{i:0;s:9:\"site_name\";i:1;s:13:\"contact_email\";i:2;s:13:\"contact_phone\";i:3;s:15:\"contact_address\";i:4;s:13:\"currency_name\";i:5;s:13:\"currency_icon\";i:6;s:9:\"time_zone\";i:7;s:3:\"map\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}', 1764606073),
('hygge-cache-logo_fav', 'O:22:\"App\\Models\\LogoSetting\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"logo_settings\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:5:{s:2:\"id\";s:1:\"1\";s:4:\"logo\";s:33:\"uploads/logo/1847200410938061.svg\";s:7:\"favicon\";s:33:\"uploads/logo/1847200355288932.svg\";s:10:\"created_at\";s:19:\"2025-10-27 18:56:56\";s:10:\"updated_at\";s:19:\"2025-10-27 18:59:49\";}s:11:\"\0*\0original\";a:5:{s:2:\"id\";s:1:\"1\";s:4:\"logo\";s:33:\"uploads/logo/1847200410938061.svg\";s:7:\"favicon\";s:33:\"uploads/logo/1847200355288932.svg\";s:10:\"created_at\";s:19:\"2025-10-27 18:56:56\";s:10:\"updated_at\";s:19:\"2025-10-27 18:59:49\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:2:{i:0;s:4:\"logo\";i:1;s:7:\"favicon\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}', 1764606074),
('hygge-cache-sliders', 'O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:1:{i:0;O:17:\"App\\Models\\Slider\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:7:\"sliders\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:5:{s:2:\"id\";s:1:\"1\";s:6:\"banner\";s:38:\"uploads/slider/media_68f87a16f3cbb.png\";s:5:\"title\";s:88:\"Handcrafted with precision and timeless detail. Luxury materials meet modern minimalism.\";s:7:\"btn_url\";s:53:\"https://test.hyggecotton.dk/product-details/urbanease\";s:4:\"type\";s:32:\"“Where Craft Meets Elegance”\";}s:11:\"\0*\0original\";a:5:{s:2:\"id\";s:1:\"1\";s:6:\"banner\";s:38:\"uploads/slider/media_68f87a16f3cbb.png\";s:5:\"title\";s:88:\"Handcrafted with precision and timeless detail. Luxury materials meet modern minimalism.\";s:7:\"btn_url\";s:53:\"https://test.hyggecotton.dk/product-details/urbanease\";s:4:\"type\";s:32:\"“Where Craft Meets Elegance”\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:7:{i:0;s:5:\"title\";i:1;s:4:\"type\";i:2;s:14:\"starting_price\";i:3;s:7:\"btn_url\";i:4;s:6:\"serial\";i:5;s:6:\"status\";i:6;s:6:\"banner\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}', 1764606078);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `session_id`, `product_id`, `quantity`, `price`, `options`, `created_at`, `updated_at`) VALUES
(431, NULL, 'cart_MQAyqiB6RSDryEZj8fnyACgX2OsxUnJO', 20, 1, 120.00, '{\"image\":\"uploads\\/products\\/1847761581611157.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":\"5.00\",\"font_image\":\"uploads\\/customizations\\/front_1764060283.png\",\"back_image\":\"uploads\\/customizations\\/back_1764060283.png\",\"is_free_product\":false}', '2025-11-25 02:44:44', '2025-11-25 02:44:44'),
(439, NULL, 'cart_U2ZRhtqbzsh2sIV2mLcPNQ3fRWIlXt4w', 46, 1, 460.00, '{\"image\":\"uploads\\/products\\/media_692a58c749860.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', '2025-11-30 17:04:10', '2025-11-30 17:04:10'),
(440, NULL, 'cart_nQ7o5hYkEx0LU9JeObhc8gWgKSz2zkNe', 45, 1, 212.00, '{\"image\":\"uploads\\/products\\/1849765166878536.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', '2025-11-30 17:04:12', '2025-11-30 17:04:12'),
(441, NULL, 'cart_bKvX9mVIBDsZ9KwXZsiHLNyt9DawJdC8', 41, 1, 550.00, '{\"image\":\"uploads\\/products\\/media_692b39f6600a8.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', '2025-11-30 17:04:13', '2025-11-30 17:04:13'),
(442, NULL, 'cart_bKvX9mVIBDsZ9KwXZsiHLNyt9DawJdC8', 46, 1, 460.00, '{\"image\":\"uploads\\/products\\/media_692a58c749860.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', '2025-11-30 17:04:25', '2025-11-30 17:04:25');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `image` text DEFAULT NULL,
  `front_show` tinyint(1) NOT NULL DEFAULT 0,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `icon`, `image`, `front_show`, `meta_title`, `meta_description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Fashion', 'fashion', 'fab fa-accessible-icon', 'uploads/categories/media_6915bb003cfaf.png', 0, 'nnnnn', NULL, 1, '2025-10-15 10:54:48', '2025-11-13 05:03:28'),
(2, 'Big Bag', 'big-bag', 'empty', 'uploads/categories/media_692a54d6a48c2.jpg', 1, NULL, NULL, 1, '2025-10-22 22:47:39', '2025-11-29 07:05:10'),
(3, 'Mini bag', 'mini-bag', 'empty', 'uploads/categories/media_692bfa75f1ff5.jpg', 1, NULL, NULL, 1, '2025-10-23 05:43:03', '2025-11-30 13:04:05'),
(4, 'Pouch bag', 'pouch-bag', 'empty', 'uploads/categories/media_692bfab3e595b.jpg', 1, NULL, NULL, 1, '2025-10-23 05:43:50', '2025-11-30 13:05:07'),
(5, 'Apron', 'apron', 'empty', 'uploads/categories/media_692bfb794cfaa.jpg', 0, NULL, NULL, 1, '2025-10-23 05:44:00', '2025-11-30 13:08:51'),
(6, 'Hoddie', 'hoddie', 'empty', 'uploads/categories/media_6915bad4c035e.png', 1, NULL, NULL, 1, '2025-10-23 05:44:08', '2025-11-18 02:05:00'),
(7, 'T-shirt', 't-shirt', 'empty', 'uploads/categories/media_6915ba8af041a.png', 1, NULL, NULL, 1, '2025-10-23 05:44:19', '2025-11-13 05:01:30'),
(8, 'Logan', 'logan', 'empty', 'uploads/categories/media_6915a93feb2ff.jpg', 0, NULL, NULL, 0, '2025-11-13 03:47:43', '2025-11-30 13:03:29');

-- --------------------------------------------------------

--
-- Table structure for table `child_categories`
--

CREATE TABLE `child_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `child_categories`
--

INSERT INTO `child_categories` (`id`, `category_id`, `sub_category_id`, `name`, `slug`, `meta_title`, `meta_description`, `status`, `created_at`, `updated_at`) VALUES
(4, 7, 4, 'Child Cat 1', 'child-cat-1', NULL, NULL, 0, '2025-10-27 06:17:23', '2025-11-17 23:52:33'),
(6, 7, 4, 'ssss', 'ssss', NULL, NULL, 0, '2025-11-17 23:43:20', '2025-11-17 23:52:58'),
(7, 7, 4, 'dsfsdf', 'dsfsdf', NULL, NULL, 0, '2025-11-17 23:46:53', '2025-11-17 23:53:06');

-- --------------------------------------------------------

--
-- Table structure for table `cod_settings`
--

CREATE TABLE `cod_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cod_settings`
--

INSERT INTO `cod_settings` (`id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-10-15 10:46:23', '2025-11-11 22:58:46');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `color_name` varchar(255) DEFAULT NULL,
  `color_code` varchar(255) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color_name`, `color_code`, `price`, `is_default`, `status`, `created_at`, `updated_at`) VALUES
(1, 'red', '#ff0000', 0.00, 1, 1, '2025-10-16 07:09:42', '2025-10-16 07:09:42'),
(2, 'light redggg', '#d93030', 0.00, NULL, 0, '2025-10-18 09:36:15', '2025-10-18 09:37:42'),
(3, 'Yellow', '#effb46', 0.00, NULL, 1, '2025-10-25 06:04:19', '2025-10-25 06:04:19'),
(4, 'Blue', '#0621ef', 0.00, NULL, 1, '2025-10-25 06:04:31', '2025-10-25 06:04:31');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `max_use` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `discount_type` varchar(255) NOT NULL,
  `discount` double NOT NULL,
  `status` tinyint(1) NOT NULL,
  `total_used` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `name`, `code`, `quantity`, `max_use`, `start_date`, `end_date`, `discount_type`, `discount`, `status`, `total_used`, `created_at`, `updated_at`) VALUES
(2, 'max use', '2343', 20, 5, '2025-10-18 03:03:00', '2025-10-20 00:00:00', 'percentage', 10, 1, 0, '2025-10-18 09:58:55', '2025-10-18 10:11:26'),
(3, 'siraj', 'siraj', 10, 10, '2025-10-25 14:25:00', '2025-10-28 00:00:00', 'amount', 10, 1, 0, '2025-10-25 02:26:09', '2025-10-25 03:53:14');

-- --------------------------------------------------------

--
-- Table structure for table `create_pages`
--

CREATE TABLE `create_pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `page_for` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `create_pages`
--

INSERT INTO `create_pages` (`id`, `page_for`, `name`, `slug`, `title`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'f_about', 'About Hygee', 'about-hygee', 'About Page', '<h2 data-start=\"268\" data-end=\"304\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span style=\"font-weight: bolder; color: inherit; font-family: inherit; font-size: 1.75rem;\"><br></span></h2><h2 data-start=\"268\" data-end=\"304\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span style=\"font-weight: bolder; color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ Introduction</span></h2><blockquote data-start=\"332\" data-end=\"676\"><p data-start=\"334\" data-end=\"676\">Welcome to&nbsp;<span data-start=\"345\" data-end=\"354\" style=\"font-weight: bolder;\">Hygge</span>, your ultimate destination for premium bags and custom t-shirts. We believe in combining style, comfort, and quality to create products that not only look great but also make your everyday life easier. At Hygge, every product is designed with love and attention to detail, ensuring that our customers always get the best.</p></blockquote><hr data-start=\"678\" data-end=\"681\"><h3 data-start=\"683\" data-end=\"712\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span data-start=\"687\" data-end=\"712\" style=\"font-weight: bolder;\">2️⃣ Mission Statement</span></h3><blockquote data-start=\"714\" data-end=\"1011\"><p data-start=\"716\" data-end=\"1011\">Our mission is to provide high-quality, customizable products that allow you to express your personality. Whether it’s a stylish bag for your daily use or a unique t-shirt with your personal design, we are committed to delivering products that meet your style, comfort, and quality expectations.</p></blockquote><hr data-start=\"1013\" data-end=\"1016\"><h3 data-start=\"1018\" data-end=\"1046\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span data-start=\"1022\" data-end=\"1046\" style=\"font-weight: bolder;\">3️⃣ Vision Statement</span></h3><blockquote data-start=\"1048\" data-end=\"1289\"><p data-start=\"1050\" data-end=\"1289\">We envision a world where everyone can showcase their creativity through the products they wear and carry. Our vision is to become a leading eCommerce platform for customizable fashion, inspiring people to make their style truly their own.</p></blockquote><hr data-start=\"1291\" data-end=\"1294\"><h3 data-start=\"1296\" data-end=\"1321\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span data-start=\"1300\" data-end=\"1321\" style=\"font-weight: bolder;\">4️⃣ Why Choose Us</span></h3><blockquote data-start=\"1323\" data-end=\"1710\"><ul data-start=\"1325\" data-end=\"1710\"><li data-start=\"1325\" data-end=\"1418\"><p data-start=\"1327\" data-end=\"1418\"><span data-start=\"1327\" data-end=\"1354\" style=\"font-weight: bolder;\">High Quality Materials:</span>&nbsp;All our bags and t-shirts are crafted with premium materials.</p></li><li data-start=\"1421\" data-end=\"1516\"><p data-start=\"1423\" data-end=\"1516\"><span data-start=\"1423\" data-end=\"1449\" style=\"font-weight: bolder;\">Customization Options:</span>&nbsp;From text to colors and images, personalize your product easily.</p></li><li data-start=\"1519\" data-end=\"1613\"><p data-start=\"1521\" data-end=\"1613\"><span data-start=\"1521\" data-end=\"1547\" style=\"font-weight: bolder;\">Customer Satisfaction:</span>&nbsp;We value our customers and strive to provide excellent service.</p></li><li data-start=\"1616\" data-end=\"1710\"><p data-start=\"1618\" data-end=\"1710\"><span data-start=\"1618\" data-end=\"1636\" style=\"font-weight: bolder;\">Fast Delivery:</span>&nbsp;Quick processing and shipping ensure you receive your products on time.</p></li></ul></blockquote><hr data-start=\"1712\" data-end=\"1715\"><h3 data-start=\"1717\" data-end=\"1755\" style=\"font-family: Nunito, \" segoe=\"\" ui\",=\"\" arial;=\"\" color:=\"\" rgb(0,=\"\" 0,=\"\" 0);\"=\"\"><span data-start=\"1721\" data-end=\"1755\" style=\"font-weight: bolder;\">5️⃣ Call to Action / Shop Link</span></h3><p></p><blockquote data-start=\"1757\" data-end=\"1904\"><p data-start=\"1759\" data-end=\"1904\">Explore our wide range of bags and t-shirts and discover the joy of personalized products.&nbsp;<span data-start=\"1850\" data-end=\"1864\" style=\"font-weight: bolder;\">[Shop Now]</span>&nbsp;to create your unique style with Hygge!</p></blockquote>', 1, '2025-10-18 07:45:16', '2025-10-18 08:18:47'),
(2, 'f_about', 'Careers', 'careers', 'Careers Page', '<h2 data-start=\"186\" data-end=\"224\"><strong data-start=\"230\" data-end=\"250\" style=\"color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ Introduction</strong></h2><h2 data-start=\"268\" data-end=\"304\">\r\n\r\n<blockquote data-start=\"252\" data-end=\"542\">\r\n<p data-start=\"254\" data-end=\"542\">Join the <strong data-start=\"263\" data-end=\"277\">Hygge team</strong> and be part of a fast-growing eCommerce brand that values creativity, innovation, and customer satisfaction. We are passionate about delivering premium bags and customizable t-shirts while creating a supportive and collaborative work environment for our employees.</p>\r\n</blockquote>\r\n<hr data-start=\"544\" data-end=\"547\">\r\n</h2><h3 data-start=\"549\" data-end=\"572\"><strong data-start=\"553\" data-end=\"572\">2️⃣ Our Mission</strong></h3><h2 data-start=\"268\" data-end=\"304\">\r\n<blockquote data-start=\"574\" data-end=\"875\">\r\n<p data-start=\"576\" data-end=\"875\">At Hygge, our mission is to empower individuals through quality products and excellent service. We believe that our team is the heart of our success. We are constantly looking for talented and motivated individuals who share our vision of creating unique and high-quality products for our customers.</p>\r\n</blockquote>\r\n<hr data-start=\"877\" data-end=\"880\">\r\n</h2><h3 data-start=\"882\" data-end=\"910\"><strong data-start=\"886\" data-end=\"910\">3️⃣ Why Work With Us</strong></h3><h2 data-start=\"268\" data-end=\"304\">\r\n<blockquote data-start=\"912\" data-end=\"1319\">\r\n<ul data-start=\"914\" data-end=\"1319\">\r\n<li data-start=\"914\" data-end=\"1011\">\r\n<p data-start=\"916\" data-end=\"1011\"><strong data-start=\"916\" data-end=\"943\">Innovative Environment:</strong> Work on exciting projects in eCommerce and product customization.</p>\r\n</li>\r\n<li data-start=\"1014\" data-end=\"1127\">\r\n<p data-start=\"1016\" data-end=\"1127\"><strong data-start=\"1016\" data-end=\"1041\">Growth Opportunities:</strong> We encourage professional development and provide career advancement opportunities.</p>\r\n</li>\r\n<li data-start=\"1130\" data-end=\"1233\">\r\n<p data-start=\"1132\" data-end=\"1233\"><strong data-start=\"1132\" data-end=\"1155\">Collaborative Team:</strong> Join a team that values collaboration, creativity, and ideas from everyone.</p>\r\n</li>\r\n<li data-start=\"1236\" data-end=\"1319\">\r\n<p data-start=\"1238\" data-end=\"1319\"><strong data-start=\"1238\" data-end=\"1264\">Flexible Work Culture:</strong> We support work-life balance and flexible schedules.</p>\r\n</li>\r\n</ul>\r\n</blockquote>\r\n<hr data-start=\"1321\" data-end=\"1324\">\r\n</h2><h3 data-start=\"1326\" data-end=\"1360\"><strong data-start=\"1330\" data-end=\"1360\">4️⃣ Current Open Positions</strong></h3><h2 data-start=\"268\" data-end=\"304\">\r\n<blockquote data-start=\"1362\" data-end=\"1555\">\r\n<p data-start=\"1364\" data-end=\"1429\">We are looking for talented individuals in the following areas:</p>\r\n<ul data-start=\"1432\" data-end=\"1555\">\r\n<li data-start=\"1432\" data-end=\"1464\">\r\n<p data-start=\"1434\" data-end=\"1464\">Product Design &amp; Development</p>\r\n</li>\r\n<li data-start=\"1467\" data-end=\"1495\">\r\n<p data-start=\"1469\" data-end=\"1495\">Marketing &amp; Social Media</p>\r\n</li>\r\n<li data-start=\"1498\" data-end=\"1528\">\r\n<p data-start=\"1500\" data-end=\"1528\">Customer Support &amp; Service</p>\r\n</li>\r\n<li data-start=\"1531\" data-end=\"1555\">\r\n<p data-start=\"1533\" data-end=\"1555\">Web Development &amp; IT</p>\r\n</li>\r\n</ul>\r\n</blockquote>\r\n<blockquote data-start=\"1557\" data-end=\"1682\">\r\n<p data-start=\"1559\" data-end=\"1682\">If you are passionate about eCommerce, fashion, and customization, Hygge is the place for you to grow and make an impact.</p>\r\n</blockquote>\r\n<hr data-start=\"1684\" data-end=\"1687\">\r\n</h2><h3 data-start=\"1689\" data-end=\"1715\"><strong data-start=\"1693\" data-end=\"1715\">5️⃣ Call to Action</strong></h3><h2 data-start=\"268\" data-end=\"304\">\r\n<blockquote data-start=\"1717\" data-end=\"1793\">\r\n<p data-start=\"1719\" data-end=\"1793\">Ready to join us? <strong data-start=\"1737\" data-end=\"1752\">[Apply Now]</strong> and become a part of the Hygge family!</p></blockquote></h2>', 1, '2025-10-18 08:14:12', '2025-10-18 08:19:06'),
(3, 'f_h_s', 'FAQ', 'faq', 'FAQ', '<h2 data-start=\"183\" data-end=\"214\"><strong data-start=\"186\" data-end=\"214\">FAQ Page</strong></h2><h3 data-start=\"216\" data-end=\"246\"><strong data-start=\"220\" data-end=\"246\">1️⃣ Ordering &amp; Payment</strong></h3><p data-start=\"248\" data-end=\"282\"><strong data-start=\"248\" data-end=\"280\">Q1: How do I place an order?</strong></p><blockquote data-start=\"283\" data-end=\"457\">\r\n<p data-start=\"285\" data-end=\"457\">Simply browse our collection of bags and t-shirts, customize your product if you want, and click \"Add to Cart\". Then proceed to checkout and complete the payment process.</p>\r\n</blockquote><p data-start=\"459\" data-end=\"503\"><strong data-start=\"459\" data-end=\"501\">Q2: What payment methods are accepted?</strong></p><blockquote data-start=\"504\" data-end=\"600\">\r\n<p data-start=\"506\" data-end=\"600\">We accept all major credit and debit cards, PayPal, and other secure online payment methods.</p>\r\n</blockquote><hr data-start=\"602\" data-end=\"605\"><h3 data-start=\"607\" data-end=\"638\"><strong data-start=\"611\" data-end=\"638\">2️⃣ Shipping &amp; Delivery</strong></h3><p data-start=\"640\" data-end=\"678\"><strong data-start=\"640\" data-end=\"676\">Q3: How long does shipping take?</strong></p><blockquote data-start=\"679\" data-end=\"806\">\r\n<p data-start=\"681\" data-end=\"806\">Standard shipping usually takes 3–7 business days. Customized products may take a bit longer, typically 7–10 business days.</p>\r\n</blockquote><p data-start=\"808\" data-end=\"839\"><strong data-start=\"808\" data-end=\"837\">Q4: Can I track my order?</strong></p><blockquote data-start=\"840\" data-end=\"946\">\r\n<p data-start=\"842\" data-end=\"946\">Yes! Once your order is shipped, you will receive a tracking number via email to monitor your package.</p>\r\n</blockquote><hr data-start=\"948\" data-end=\"951\"><h3 data-start=\"953\" data-end=\"989\"><strong data-start=\"957\" data-end=\"989\">3️⃣ Customization &amp; Products</strong></h3><p data-start=\"991\" data-end=\"1035\"><strong data-start=\"991\" data-end=\"1033\">Q5: Can I customize my t-shirt or bag?</strong></p><blockquote data-start=\"1036\" data-end=\"1186\">\r\n<p data-start=\"1038\" data-end=\"1186\">Absolutely! You can add custom text, choose colors, and even upload your own images. Our preview feature lets you see your design before ordering.</p>\r\n</blockquote><p data-start=\"1188\" data-end=\"1250\"><strong data-start=\"1188\" data-end=\"1248\">Q6: How is the price calculated for customized products?</strong></p><blockquote data-start=\"1251\" data-end=\"1418\">\r\n<p data-start=\"1253\" data-end=\"1418\">The base price is for the default product. Any additional customizations (text, images, colors) may increase the price, which is updated automatically in the cart.</p>\r\n</blockquote><hr data-start=\"1420\" data-end=\"1423\"><h3 data-start=\"1425\" data-end=\"1454\"><strong data-start=\"1429\" data-end=\"1454\">4️⃣ Returns &amp; Refunds</strong></h3><p data-start=\"1456\" data-end=\"1500\"><strong data-start=\"1456\" data-end=\"1498\">Q7: Can I return a customized product?</strong></p><blockquote data-start=\"1501\" data-end=\"1646\">\r\n<p data-start=\"1503\" data-end=\"1646\">Unfortunately, customized products are non-returnable unless there is a defect. Standard products can be returned within 14 days of delivery.</p>\r\n</blockquote><p data-start=\"1648\" data-end=\"1684\"><strong data-start=\"1648\" data-end=\"1682\">Q8: How do I request a refund?</strong></p><blockquote data-start=\"1685\" data-end=\"1821\">\r\n<p data-start=\"1687\" data-end=\"1821\">Contact our customer support via email or chat with your order details. We will process your request according to our return policy.</p>\r\n</blockquote><hr data-start=\"1823\" data-end=\"1826\"><h3 data-start=\"1828\" data-end=\"1857\"><strong data-start=\"1832\" data-end=\"1857\">5️⃣ Account &amp; Support</strong></h3><p data-start=\"1859\" data-end=\"1908\"><strong data-start=\"1859\" data-end=\"1906\">Q9: Do I need an account to place an order?</strong></p><blockquote data-start=\"1909\" data-end=\"2034\">\r\n<p data-start=\"1911\" data-end=\"2034\">You can checkout as a guest, but creating an account helps you track orders, save addresses, and access exclusive offers.</p>\r\n</blockquote><p data-start=\"2036\" data-end=\"2082\"><strong data-start=\"2036\" data-end=\"2080\">Q10: How can I contact customer support?</strong></p><p>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n</p><blockquote data-start=\"2083\" data-end=\"2211\">\r\n<p data-start=\"2085\" data-end=\"2211\">You can reach us via the “Contact Us” page, email, or live chat during business hours. We strive to respond within 24 hours.</p></blockquote>', 1, '2025-10-18 08:16:30', '2025-10-18 08:16:30'),
(4, 'f_h_s', 'Shipping', 'shipping', 'Shipping Page', '<h2 data-start=\"192\" data-end=\"228\"><strong data-start=\"234\" data-end=\"266\" style=\"color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ Shipping Policy Overview</strong></h2><blockquote data-start=\"268\" data-end=\"453\">\r\n<p data-start=\"270\" data-end=\"453\">At <strong data-start=\"273\" data-end=\"282\">Hygge</strong>, we strive to deliver your bags and t-shirts quickly and safely. Our shipping policy ensures transparency and reliability, so you always know when to expect your order.</p>\r\n</blockquote><hr data-start=\"455\" data-end=\"458\"><h3 data-start=\"460\" data-end=\"487\"><strong data-start=\"464\" data-end=\"487\">2️⃣ Processing Time</strong></h3><blockquote data-start=\"489\" data-end=\"726\">\r\n<p data-start=\"491\" data-end=\"560\">Once you place an order, our team begins processing it immediately.</p>\r\n<ul data-start=\"563\" data-end=\"726\">\r\n<li data-start=\"563\" data-end=\"625\">\r\n<p data-start=\"565\" data-end=\"625\"><strong data-start=\"565\" data-end=\"587\">Standard Products:</strong> Processed within 1–2 business days.</p>\r\n</li>\r\n<li data-start=\"628\" data-end=\"726\">\r\n<p data-start=\"630\" data-end=\"726\"><strong data-start=\"630\" data-end=\"654\">Customized Products:</strong> Since these are made-to-order, processing may take 3–5 business days.</p>\r\n</li>\r\n</ul>\r\n</blockquote><hr data-start=\"728\" data-end=\"731\"><h3 data-start=\"733\" data-end=\"777\"><strong data-start=\"737\" data-end=\"777\">3️⃣ Shipping Methods &amp; Delivery Time</strong></h3><div class=\"_tableContainer_1rjym_1\"><div tabindex=\"-1\" class=\"group _tableWrapper_1rjym_13 flex w-fit flex-col-reverse\"><table data-start=\"779\" data-end=\"1081\" class=\"w-fit min-w-(--thread-content-width)\"><thead data-start=\"779\" data-end=\"831\"><tr data-start=\"779\" data-end=\"831\"><th data-start=\"779\" data-end=\"797\" data-col-size=\"sm\">Shipping Method</th><th data-start=\"797\" data-end=\"823\" data-col-size=\"sm\">Estimated Delivery Time</th><th data-start=\"823\" data-end=\"831\" data-col-size=\"sm\">Cost</th></tr></thead><tbody data-start=\"883\" data-end=\"1081\"><tr data-start=\"883\" data-end=\"951\"><td data-start=\"883\" data-end=\"903\" data-col-size=\"sm\">Standard Shipping</td><td data-start=\"903\" data-end=\"923\" data-col-size=\"sm\">3–7 business days</td><td data-col-size=\"sm\" data-start=\"923\" data-end=\"951\">Free on orders above $50</td></tr><tr data-start=\"952\" data-end=\"1008\"><td data-start=\"952\" data-end=\"971\" data-col-size=\"sm\">Express Shipping</td><td data-col-size=\"sm\" data-start=\"971\" data-end=\"991\">1–3 business days</td><td data-col-size=\"sm\" data-start=\"991\" data-end=\"1008\">$10 flat rate</td></tr><tr data-start=\"1009\" data-end=\"1081\"><td data-start=\"1009\" data-end=\"1034\" data-col-size=\"sm\">International Shipping</td><td data-col-size=\"sm\" data-start=\"1034\" data-end=\"1055\">7–14 business days</td><td data-col-size=\"sm\" data-start=\"1055\" data-end=\"1081\">Calculated at checkout</td></tr></tbody></table></div></div><blockquote data-start=\"1083\" data-end=\"1170\">\r\n<p data-start=\"1085\" data-end=\"1170\">Delivery times may vary depending on location and customs for international orders.</p>\r\n</blockquote><hr data-start=\"1172\" data-end=\"1175\"><h3 data-start=\"1177\" data-end=\"1203\"><strong data-start=\"1181\" data-end=\"1203\">4️⃣ Order Tracking</strong></h3><blockquote data-start=\"1205\" data-end=\"1338\">\r\n<p data-start=\"1207\" data-end=\"1338\">After your order is shipped, you will receive a tracking number via email. Use this number to monitor your shipment in real-time.</p>\r\n</blockquote><hr data-start=\"1340\" data-end=\"1343\"><h3 data-start=\"1345\" data-end=\"1378\"><strong data-start=\"1349\" data-end=\"1378\">5️⃣ Shipping Restrictions</strong></h3><blockquote data-start=\"1380\" data-end=\"1554\">\r\n<ul data-start=\"1382\" data-end=\"1554\">\r\n<li data-start=\"1382\" data-end=\"1433\">\r\n<p data-start=\"1384\" data-end=\"1433\">Currently, we ship to most countries worldwide.</p>\r\n</li>\r\n<li data-start=\"1436\" data-end=\"1487\">\r\n<p data-start=\"1438\" data-end=\"1487\">Some regions may have limited shipping options.</p>\r\n</li>\r\n<li data-start=\"1490\" data-end=\"1554\">\r\n<p data-start=\"1492\" data-end=\"1554\">Customized products cannot be shipped via same-day delivery.</p>\r\n</li>\r\n</ul>\r\n</blockquote><hr data-start=\"1556\" data-end=\"1559\"><h3 data-start=\"1561\" data-end=\"1594\"><strong data-start=\"1565\" data-end=\"1594\">6️⃣ Lost or Damaged Items</strong></h3><blockquote data-start=\"1596\" data-end=\"1816\">\r\n<p data-start=\"1598\" data-end=\"1816\">If your order is lost or arrives damaged, please contact our customer support immediately. Provide your order number and details of the issue. We will work quickly to resolve the problem and ensure your satisfaction.</p>\r\n</blockquote><hr data-start=\"1818\" data-end=\"1821\"><h3 data-start=\"1823\" data-end=\"1861\"><strong data-start=\"1827\" data-end=\"1861\">7️⃣ Free Shipping &amp; Promotions</strong></h3><blockquote data-start=\"1863\" data-end=\"1985\">\r\n<ul data-start=\"1865\" data-end=\"1985\">\r\n<li data-start=\"1865\" data-end=\"1912\">\r\n<p data-start=\"1867\" data-end=\"1912\">Free shipping on domestic orders above $50.</p>\r\n</li>\r\n<li data-start=\"1915\" data-end=\"1985\">\r\n<p data-start=\"1917\" data-end=\"1985\">Check our homepage for seasonal promotions and shipping discounts.</p>\r\n</li>\r\n</ul>\r\n</blockquote><p>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n</p><p data-start=\"1992\" data-end=\"2024\"></p><hr data-start=\"1987\" data-end=\"1990\">', 1, '2025-10-18 08:18:31', '2025-10-18 08:18:31'),
(6, 'f_l', 'Privacy & Policy', 'privacy-&-policy', 'Privacy & Policy', '<h2 data-start=\"208\" data-end=\"252\"><strong data-start=\"258\" data-end=\"278\" style=\"color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ Introduction</strong></h2><blockquote data-start=\"280\" data-end=\"557\">\r\n<p data-start=\"282\" data-end=\"557\">At <strong data-start=\"285\" data-end=\"294\">Hygge</strong>, your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services. We are committed to ensuring that your personal data is handled responsibly and transparently.</p>\r\n</blockquote><hr data-start=\"559\" data-end=\"562\"><h3 data-start=\"564\" data-end=\"598\"><strong data-start=\"568\" data-end=\"598\">2️⃣ Information We Collect</strong></h3><blockquote data-start=\"600\" data-end=\"1011\">\r\n<p data-start=\"602\" data-end=\"654\">We may collect the following types of information:</p>\r\n<ul data-start=\"657\" data-end=\"1011\">\r\n<li data-start=\"657\" data-end=\"751\">\r\n<p data-start=\"659\" data-end=\"751\"><strong data-start=\"659\" data-end=\"684\">Personal Information:</strong> Name, email address, phone number, shipping and billing address.</p>\r\n</li>\r\n<li data-start=\"754\" data-end=\"853\">\r\n<p data-start=\"756\" data-end=\"853\"><strong data-start=\"756\" data-end=\"780\">Payment Information:</strong> Credit/debit card details and other payment info (processed securely).</p>\r\n</li>\r\n<li data-start=\"856\" data-end=\"931\">\r\n<p data-start=\"858\" data-end=\"931\"><strong data-start=\"858\" data-end=\"882\">Account Information:</strong> Login credentials, order history, preferences.</p>\r\n</li>\r\n<li data-start=\"934\" data-end=\"1011\">\r\n<p data-start=\"936\" data-end=\"1011\"><strong data-start=\"936\" data-end=\"951\">Usage Data:</strong> Pages visited, products viewed, and website interactions.</p>\r\n</li>\r\n</ul>\r\n</blockquote><hr data-start=\"1013\" data-end=\"1016\"><h3 data-start=\"1018\" data-end=\"1057\"><strong data-start=\"1022\" data-end=\"1057\">3️⃣ How We Use Your Information</strong></h3><blockquote data-start=\"1059\" data-end=\"1310\">\r\n<p data-start=\"1061\" data-end=\"1102\">The information we collect is used for:</p>\r\n<ul data-start=\"1105\" data-end=\"1310\">\r\n<li data-start=\"1105\" data-end=\"1147\">\r\n<p data-start=\"1107\" data-end=\"1147\">Processing and fulfilling your orders.</p>\r\n</li>\r\n<li data-start=\"1150\" data-end=\"1210\">\r\n<p data-start=\"1152\" data-end=\"1210\">Communicating with you about your orders and promotions.</p>\r\n</li>\r\n<li data-start=\"1213\" data-end=\"1252\">\r\n<p data-start=\"1215\" data-end=\"1252\">Improving our website and services.</p>\r\n</li>\r\n<li data-start=\"1255\" data-end=\"1310\">\r\n<p data-start=\"1257\" data-end=\"1310\">Ensuring the security and integrity of our website.</p>\r\n</li>\r\n</ul>\r\n</blockquote><hr data-start=\"1312\" data-end=\"1315\"><h3 data-start=\"1317\" data-end=\"1344\"><strong data-start=\"1321\" data-end=\"1344\">4️⃣ Data Protection</strong></h3><blockquote data-start=\"1346\" data-end=\"1569\">\r\n<p data-start=\"1348\" data-end=\"1569\">We implement industry-standard measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. All payment information is handled securely via trusted payment gateways.</p>\r\n</blockquote><hr data-start=\"1571\" data-end=\"1574\"><h3 data-start=\"1576\" data-end=\"1612\"><strong data-start=\"1580\" data-end=\"1612\">5️⃣ Sharing Your Information</strong></h3><blockquote data-start=\"1614\" data-end=\"1888\">\r\n<p data-start=\"1616\" data-end=\"1716\">We do not sell, trade, or otherwise transfer your personal information to outside parties, except:</p>\r\n<ul data-start=\"1719\" data-end=\"1888\">\r\n<li data-start=\"1719\" data-end=\"1843\">\r\n<p data-start=\"1721\" data-end=\"1843\">To trusted third-party service providers who assist in operating our website, processing payments, or delivering orders.</p>\r\n</li>\r\n<li data-start=\"1846\" data-end=\"1888\">\r\n<p data-start=\"1848\" data-end=\"1888\">When required by law or legal process.</p>\r\n</li>\r\n</ul>\r\n</blockquote><hr data-start=\"1890\" data-end=\"1893\"><h3 data-start=\"1895\" data-end=\"1925\"><strong data-start=\"1899\" data-end=\"1925\">6️⃣ Cookies &amp; Tracking</strong></h3><blockquote data-start=\"1927\" data-end=\"2133\">\r\n<p data-start=\"1929\" data-end=\"2133\">Our website uses cookies and similar technologies to enhance your shopping experience, remember preferences, and analyze website traffic. You can manage your cookie preferences in your browser settings.</p>\r\n</blockquote><hr data-start=\"2135\" data-end=\"2138\"><h3 data-start=\"2140\" data-end=\"2163\"><strong data-start=\"2144\" data-end=\"2163\">7️⃣ Your Rights</strong></h3><blockquote data-start=\"2165\" data-end=\"2333\">\r\n<p data-start=\"2167\" data-end=\"2191\">You have the right to:</p>\r\n<ul data-start=\"2194\" data-end=\"2333\">\r\n<li data-start=\"2194\" data-end=\"2242\">\r\n<p data-start=\"2196\" data-end=\"2242\">Access and update your personal information.</p>\r\n</li>\r\n<li data-start=\"2245\" data-end=\"2290\">\r\n<p data-start=\"2247\" data-end=\"2290\">Request deletion of your account or data.</p>\r\n</li>\r\n<li data-start=\"2293\" data-end=\"2333\">\r\n<p data-start=\"2295\" data-end=\"2333\">Opt-out of marketing communications.</p>\r\n</li>\r\n</ul>\r\n</blockquote><blockquote data-start=\"2335\" data-end=\"2411\">\r\n<p data-start=\"2337\" data-end=\"2411\">For any privacy-related requests, contact us at <strong data-start=\"2385\" data-end=\"2408\">[<a class=\"decorated-link cursor-pointer\" rel=\"noopener\">support@hygge.com<span aria-hidden=\"true\" class=\"ms-0.5 inline-block align-middle leading-none\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" data-rtl-flip=\"\" class=\"block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75]\"><path d=\"M14.3349 13.3301V6.60645L5.47065 15.4707C5.21095 15.7304 4.78895 15.7304 4.52925 15.4707C4.26955 15.211 4.26955 14.789 4.52925 14.5293L13.3935 5.66504H6.66011C6.29284 5.66504 5.99507 5.36727 5.99507 5C5.99507 4.63273 6.29284 4.33496 6.66011 4.33496H14.9999L15.1337 4.34863C15.4369 4.41057 15.665 4.67857 15.665 5V13.3301C15.6649 13.6973 15.3672 13.9951 14.9999 13.9951C14.6327 13.9951 14.335 13.6973 14.3349 13.3301Z\"></path></svg></span></a>]</strong>.</p>\r\n</blockquote><hr data-start=\"2413\" data-end=\"2416\"><h3 data-start=\"2418\" data-end=\"2444\"><strong data-start=\"2422\" data-end=\"2444\">8️⃣ Policy Updates</strong></h3><p>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n</p><blockquote data-start=\"2446\" data-end=\"2671\">\r\n<p data-start=\"2448\" data-end=\"2671\">We may update this Privacy Policy from time to time. Changes will be posted on this page with the effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.</p></blockquote>', 1, '2025-10-18 08:20:27', '2025-10-18 08:20:27'),
(7, 'f_l', 'Ads & Cookies Page', 'ads-&-cookies-page', 'Ads & Cookies Page', '<h2 data-start=\"192\" data-end=\"233\"><strong data-start=\"239\" data-end=\"259\" style=\"color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ </strong><strong data-start=\"239\" data-end=\"259\" style=\"font-family: inherit; font-size: 1.75rem; color: rgb(255, 0, 0);\">Introduction</strong></h2><blockquote data-start=\"261\" data-end=\"490\">\r\n<p data-start=\"263\" data-end=\"490\">At <strong data-start=\"266\" data-end=\"275\">Hygge</strong>, we use cookies and advertising technologies to improve your browsing experience and to deliver relevant marketing messages. This page explains how we use cookies and ads, and how you can manage your preferences.</p>\r\n</blockquote><hr data-start=\"492\" data-end=\"495\"><h3 data-start=\"497\" data-end=\"526\"><strong data-start=\"501\" data-end=\"526\">2️⃣ What Are Cookies?</strong></h3><blockquote data-start=\"528\" data-end=\"728\">\r\n<p data-start=\"530\" data-end=\"728\">Cookies are small text files stored on your device by your web browser. They help websites remember your actions and preferences, such as login details, shopping cart items, and language settings.</p>\r\n</blockquote><hr data-start=\"730\" data-end=\"733\"><h3 data-start=\"735\" data-end=\"770\"><strong data-start=\"739\" data-end=\"770\">3️⃣ Types of Cookies We Use</strong></h3><div class=\"_tableContainer_1rjym_1\"><div tabindex=\"-1\" class=\"group _tableWrapper_1rjym_13 flex w-fit flex-col-reverse\"><table data-start=\"772\" data-end=\"1223\" class=\"w-fit min-w-(--thread-content-width)\"><thead data-start=\"772\" data-end=\"797\"><tr data-start=\"772\" data-end=\"797\"><th data-start=\"772\" data-end=\"786\" data-col-size=\"sm\">Cookie Type</th><th data-start=\"786\" data-end=\"797\" data-col-size=\"md\">Purpose</th></tr></thead><tbody data-start=\"823\" data-end=\"1223\"><tr data-start=\"823\" data-end=\"923\"><td data-start=\"823\" data-end=\"847\" data-col-size=\"sm\"><strong data-start=\"825\" data-end=\"846\">Essential Cookies</strong></td><td data-start=\"847\" data-end=\"923\" data-col-size=\"md\">Required for website functionality, like login, shopping cart, checkout.</td></tr><tr data-start=\"924\" data-end=\"1023\"><td data-start=\"924\" data-end=\"950\" data-col-size=\"sm\"><strong data-start=\"926\" data-end=\"949\">Performance Cookies</strong></td><td data-start=\"950\" data-end=\"1023\" data-col-size=\"md\">Help us understand how visitors use our site and improve performance.</td></tr><tr data-start=\"1024\" data-end=\"1107\"><td data-start=\"1024\" data-end=\"1049\" data-col-size=\"sm\"><strong data-start=\"1026\" data-end=\"1048\">Functional Cookies</strong></td><td data-col-size=\"md\" data-start=\"1049\" data-end=\"1107\">Remember your preferences (language, location, theme).</td></tr><tr data-start=\"1108\" data-end=\"1223\"><td data-start=\"1108\" data-end=\"1144\" data-col-size=\"sm\"><strong data-start=\"1110\" data-end=\"1143\">Advertising/Marketing Cookies</strong></td><td data-start=\"1144\" data-end=\"1223\" data-col-size=\"md\">Deliver relevant ads on Hygge or third-party sites based on your interests.</td></tr></tbody></table></div></div><hr data-start=\"1225\" data-end=\"1228\"><h3 data-start=\"1230\" data-end=\"1253\"><strong data-start=\"1234\" data-end=\"1253\">4️⃣ Advertising</strong></h3><blockquote data-start=\"1255\" data-end=\"1468\">\r\n<p data-start=\"1257\" data-end=\"1468\">We use third-party advertising partners to display relevant ads. These partners may collect information about your browsing behavior on our site and across other websites to show ads that match your interests.</p>\r\n</blockquote><blockquote data-start=\"1470\" data-end=\"1612\">\r\n<p data-start=\"1472\" data-end=\"1612\">You may opt out of personalized advertising by adjusting your device/browser settings or using the links provided by advertising networks.</p>\r\n</blockquote><hr data-start=\"1614\" data-end=\"1617\"><h3 data-start=\"1619\" data-end=\"1647\"><strong data-start=\"1623\" data-end=\"1647\">5️⃣ Managing Cookies</strong></h3><blockquote data-start=\"1649\" data-end=\"1857\">\r\n<p data-start=\"1651\" data-end=\"1745\">You can control or delete cookies through your browser settings. Most browsers allow you to:</p>\r\n<ul data-start=\"1748\" data-end=\"1857\">\r\n<li data-start=\"1748\" data-end=\"1778\">\r\n<p data-start=\"1750\" data-end=\"1778\">Block or allow all cookies</p>\r\n</li>\r\n<li data-start=\"1781\" data-end=\"1808\">\r\n<p data-start=\"1783\" data-end=\"1808\">Delete specific cookies</p>\r\n</li>\r\n<li data-start=\"1811\" data-end=\"1857\">\r\n<p data-start=\"1813\" data-end=\"1857\">Receive notifications when a cookie is set</p>\r\n</li>\r\n</ul>\r\n</blockquote><blockquote data-start=\"1859\" data-end=\"1976\">\r\n<p data-start=\"1861\" data-end=\"1976\">Note: Disabling certain cookies may affect the functionality of the website, such as login or checkout processes.</p>\r\n</blockquote><hr data-start=\"1978\" data-end=\"1981\"><h3 data-start=\"1983\" data-end=\"2017\"><strong data-start=\"1987\" data-end=\"2017\">6️⃣ Updates to This Policy</strong></h3><p>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n</p><blockquote data-start=\"2019\" data-end=\"2197\">\r\n<p data-start=\"2021\" data-end=\"2197\">We may update this Ads &amp; Cookies Policy from time to time. All changes will be posted on this page with the effective date. We encourage you to review this page periodically.</p></blockquote>', 1, '2025-10-18 08:23:02', '2025-10-27 23:23:56'),
(8, 'f_l', 'Legal Notice Page', 'legal-notice-page', 'Legal Notice Page', '<h2 data-start=\"190\" data-end=\"230\"><strong data-start=\"236\" data-end=\"256\" style=\"color: inherit; font-family: inherit; font-size: 1.75rem;\">1️⃣ Introduction</strong></h2><blockquote data-start=\"258\" data-end=\"463\">\r\n<p data-start=\"260\" data-end=\"463\">Welcome to <strong data-start=\"271\" data-end=\"280\">Hygge</strong>. This Legal Notice outlines the terms, conditions, and legal obligations of using our website and services. By accessing or using our website, you agree to comply with these terms.</p>\r\n</blockquote><hr data-start=\"465\" data-end=\"468\"><h3 data-start=\"470\" data-end=\"501\"><strong data-start=\"474\" data-end=\"501\">2️⃣ Company Information</strong></h3><blockquote data-start=\"503\" data-end=\"713\">\r\n<p data-start=\"505\" data-end=\"713\"><strong data-start=\"505\" data-end=\"514\">Hygge</strong><br data-start=\"514\" data-end=\"517\">\r\nAddress: Denmark<br data-start=\"550\" data-end=\"553\">\r\nEmail: <a class=\"decorated-link cursor-pointer\" rel=\"noopener\">support@hygge.com</a><br data-start=\"581\" data-end=\"584\">\r\nPhone: 0157848774<br data-start=\"613\" data-end=\"616\">\r\nRegistration Number:<br data-start=\"668\" data-end=\"671\">\r\nVAT Number:</p>\r\n</blockquote><hr data-start=\"715\" data-end=\"718\"><h3 data-start=\"720\" data-end=\"760\"><strong data-start=\"724\" data-end=\"760\">3️⃣ Intellectual Property Rights</strong></h3><blockquote data-start=\"762\" data-end=\"1033\">\r\n<p data-start=\"764\" data-end=\"1033\">All content on this website, including text, images, logos, product designs, and software, is the property of Hygge or its licensors and is protected by intellectual property laws. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.</p>\r\n</blockquote><hr data-start=\"1035\" data-end=\"1038\"><h3 data-start=\"1040\" data-end=\"1063\"><strong data-start=\"1044\" data-end=\"1063\">4️⃣ Website Use</strong></h3><blockquote data-start=\"1065\" data-end=\"1295\">\r\n<p data-start=\"1067\" data-end=\"1295\">Users are granted a limited, non-exclusive, and non-transferable license to access and use the website for personal purposes only. Misuse, unauthorized access, or attempts to disrupt website operations are strictly prohibited.</p>\r\n</blockquote><hr data-start=\"1297\" data-end=\"1300\"><h3 data-start=\"1302\" data-end=\"1345\"><strong data-start=\"1306\" data-end=\"1345\">5️⃣ Product Information &amp; Liability</strong></h3><blockquote data-start=\"1347\" data-end=\"1615\">\r\n<p data-start=\"1349\" data-end=\"1615\">We make every effort to provide accurate product descriptions, images, and pricing. However, minor errors or discrepancies may occur. Hygge is not liable for any direct or indirect damages arising from the use of the website or products, except as required by law.</p>\r\n</blockquote><hr data-start=\"1617\" data-end=\"1620\"><h3 data-start=\"1622\" data-end=\"1663\"><strong data-start=\"1626\" data-end=\"1663\">6️⃣ Links to Third-Party Websites</strong></h3><blockquote data-start=\"1665\" data-end=\"1921\">\r\n<p data-start=\"1667\" data-end=\"1921\">Our website may contain links to external websites. We are not responsible for the content, privacy practices, or terms of use of third-party sites. Users are advised to review the legal notices and privacy policies of any external websites they visit.</p>\r\n</blockquote><hr data-start=\"1923\" data-end=\"1926\"><h3 data-start=\"1928\" data-end=\"1963\"><strong data-start=\"1932\" data-end=\"1963\">7️⃣ Changes to Legal Notice</strong></h3><blockquote data-start=\"1965\" data-end=\"2179\">\r\n<p data-start=\"1967\" data-end=\"2179\">Hygge reserves the right to modify or update this Legal Notice at any time. Changes will be posted on this page with the effective date. Continued use of the website constitutes acceptance of the updated terms.</p>\r\n</blockquote><hr data-start=\"2181\" data-end=\"2184\"><h3 data-start=\"2186\" data-end=\"2217\"><strong data-start=\"2190\" data-end=\"2217\">8️⃣ Contact Information</strong></h3><p>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n</p><blockquote data-start=\"2219\" data-end=\"2315\">\r\n<p data-start=\"2221\" data-end=\"2315\">For any questions regarding this Legal Notice, please contact us at <strong data-start=\"2289\" data-end=\"2312\">[<a class=\"decorated-link cursor-pointer\" rel=\"noopener\">support@hygge.com<span aria-hidden=\"true\" class=\"ms-0.5 inline-block align-middle leading-none\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\" data-rtl-flip=\"\" class=\"block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75]\"><path d=\"M14.3349 13.3301V6.60645L5.47065 15.4707C5.21095 15.7304 4.78895 15.7304 4.52925 15.4707C4.26955 15.211 4.26955 14.789 4.52925 14.5293L13.3935 5.66504H6.66011C6.29284 5.66504 5.99507 5.36727 5.99507 5C5.99507 4.63273 6.29284 4.33496 6.66011 4.33496H14.9999L15.1337 4.34863C15.4369 4.41057 15.665 4.67857 15.665 5V13.3301C15.6649 13.6973 15.3672 13.9951 14.9999 13.9951C14.6327 13.9951 14.335 13.6973 14.3349 13.3301Z\"></path></svg></span></a>]</strong>.</p></blockquote>', 1, '2025-10-18 08:24:24', '2025-10-18 08:24:24');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `address` varchar(256) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `username`, `phone`, `image`, `email`, `status`, `address`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'us', NULL, '01547896548', 'uploads/user_profile_update/media_68fdaa8cb1a59.jpg', 'uer110@gmail.com', 'active', NULL, NULL, '$2y$12$UUQmiETSlvFE7ZhRJd.LYOWI4TDIYpCN2u3jPB0XXrVnXgl5L.wie', NULL, '2025-10-15 10:49:04', '2025-10-25 23:59:19'),
(12, 'guru', 'sial vai', '017967624566', 'uploads/user_profile_update/media_690856b18db59.jpeg', 'user@gmail.com', 'active', 'pallabi , mirpur 11', NULL, '$2y$12$97tmriPJ.rCKxSdun8QxL.paTdmII.cbW7MU6F6QaD6VTJakd0IbG', NULL, '2025-10-26 00:02:46', '2025-11-03 12:16:01'),
(13, 'user-47', 'user-111000', '01930705309', NULL, 'user1234@gmail.com', 'active', 'dhaka', NULL, '$2y$12$eawRVhB4PhAZDfTUrnooBeI9Wd.9mv52SSZMfdqixocF.Ecjc.foS', NULL, '2025-10-26 00:02:54', '2025-10-27 05:07:55'),
(14, 'user', NULL, NULL, 'uploads/user_profile_update/media_690876bfbdde8.png', '11user@gmail.com', 'active', NULL, NULL, '$2y$12$S2Ak/q9rQhFO176L32Gx6.WbWl/cCu3NnhEGwdRYE9Z4Zf1XGXvqq', NULL, '2025-10-28 12:24:34', '2025-11-03 14:32:47'),
(15, 'user', NULL, NULL, NULL, '12user@gmail.com', 'active', NULL, NULL, '$2y$12$FhH0xk2F/iuzpt/3E0mMLefKo6360N0pOv9r1jTf77sr/52OfvVVO', NULL, '2025-10-28 13:34:58', '2025-10-28 13:34:58'),
(16, 'Sirajul Islam', NULL, '01796762456', 'uploads/user_profile_update/media_6901a8c0da722.png', 'sirajul@gmail.com', 'active', NULL, NULL, '$2y$12$nhlJyEWlmZ2OFliGrukPEeF18bKxsRqVeQ8s9DpK6pJeDPh2vSwdO', NULL, '2025-10-28 13:37:42', '2025-10-29 09:40:16'),
(27, 'user', 'user', '01567891011', 'uploads/user_profile_update/media_69146569f12d1.png', 'user11@gmail.com', 'active', 'Mirput', '2025-11-10 22:49:48', '$2y$12$q76utHqn5U5vlapV.yB2heCPUSu1E9NiSxj2Fzag2AmKvibqFwEB2', NULL, '2025-11-10 22:48:59', '2025-11-12 04:46:01'),
(28, 'user22', NULL, NULL, NULL, 'user22@gmail.com', 'active', NULL, NULL, '$2y$12$sT.X5tWgt9JhRAFWPkl1QesmC7gjIwZLeUpYHHH3zJv.pd8gKpD4G', NULL, '2025-11-11 03:25:56', '2025-11-11 03:25:56'),
(33, 'Sirajul Islam', NULL, '017967624560', 'uploads/user_profile_update/media_692846b480b4c.jpg', 'inoodexsirajul@gmail.com', 'active', 'pallabi', '2025-11-16 02:36:25', '$2y$12$VX6Pvv/Lb3arYsYj8g5.cuSddu.PLmFqrWNKTj/L/ePjFjpLvPXdW', NULL, '2025-11-16 02:35:49', '2025-11-27 17:40:20');

-- --------------------------------------------------------

--
-- Table structure for table `customer_addresses`
--

CREATE TABLE `customer_addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_addresses`
--

INSERT INTO `customer_addresses` (`id`, `customer_id`, `name`, `email`, `phone`, `country`, `state`, `city`, `zip`, `address`, `created_at`, `updated_at`) VALUES
(1, 27, 'check', 'user@gmail.com', '1234567890', 'USA', 'California', 'Los Angeles', '90001', '123 Main St', '2025-11-11 00:42:28', '2025-11-11 01:36:27'),
(2, 27, 'user', 'user@gmail.com', '1234567890', 'USA', 'California', 'Los Angeles', '90001', '123 Main St', '2025-11-11 01:16:53', '2025-11-11 01:16:53');

-- --------------------------------------------------------

--
-- Table structure for table `customer_customizations`
--

CREATE TABLE `customer_customizations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `session_id` char(64) DEFAULT NULL COMMENT 'For guest user',
  `custom_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`custom_data`)),
  `front_image` varchar(255) DEFAULT NULL,
  `back_image` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_customizations`
--

INSERT INTO `customer_customizations` (`id`, `product_id`, `user_id`, `session_id`, `custom_data`, `front_image`, `back_image`, `price`, `created_at`, `updated_at`) VALUES
(35, 20, NULL, 'cart_MQAyqiB6RSDryEZj8fnyACgX2OsxUnJO', '\"{\\\"text_front\\\":\\\"[{\\\\\\\"title\\\\\\\":\\\\\\\"test\\\\\\\",\\\\\\\"x_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"y_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"72px\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"red\\\\\\\",\\\\\\\"font_family\\\\\\\":\\\\\\\"Story Script\\\\\\\"}]\\\",\\\"text_back\\\":\\\"[{\\\\\\\"title\\\\\\\":\\\\\\\"tst\\\\\\\",\\\\\\\"x_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"y_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"72px\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"blue\\\\\\\",\\\\\\\"font_family\\\\\\\":\\\\\\\"Story Script\\\\\\\"}]\\\",\\\"container_front\\\":\\\"{\\\\\\\"x_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"y_position\\\\\\\":\\\\\\\"50%\\\\\\\"}\\\",\\\"container_back\\\":\\\"{\\\\\\\"x_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"y_position\\\\\\\":\\\\\\\"50%\\\\\\\"}\\\",\\\"image_front\\\":null,\\\"image_back\\\":null,\\\"_prevent_duplicate\\\":1764060282381}\"', 'uploads/customizations/front_1764060283.png', 'uploads/customizations/back_1764060283.png', 5.00, '2025-11-25 02:44:43', '2025-11-25 02:44:43'),
(38, 20, 33, NULL, '\"{\\\"text_front\\\":\\\"[{\\\\\\\"title\\\\\\\":\\\\\\\"wheres\\\\\\\",\\\\\\\"x_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"y_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"39px\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"black\\\\\\\",\\\\\\\"font_family\\\\\\\":\\\\\\\"quicksand\\\\\\\"}]\\\",\\\"text_back\\\":\\\"[{\\\\\\\"title\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"x_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"y_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"18px\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"black\\\\\\\",\\\\\\\"font_family\\\\\\\":\\\\\\\"Glamour Absolute Condensed\\\\\\\"}]\\\",\\\"container_front\\\":\\\"{\\\\\\\"x_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"y_position\\\\\\\":\\\\\\\"50%\\\\\\\"}\\\",\\\"container_back\\\":\\\"{\\\\\\\"x_position\\\\\\\":\\\\\\\"50%\\\\\\\",\\\\\\\"y_position\\\\\\\":\\\\\\\"50%\\\\\\\"}\\\",\\\"image_front\\\":null,\\\"image_back\\\":null,\\\"_prevent_duplicate\\\":1764247178134}\"', 'uploads/customizations/front_1764247183.png', NULL, 2.00, '2025-11-27 17:39:43', '2025-11-27 17:39:52');

-- --------------------------------------------------------

--
-- Table structure for table `email_configurations`
--

CREATE TABLE `email_configurations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `host` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `port` varchar(255) NOT NULL,
  `encryption` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `email_configurations`
--

INSERT INTO `email_configurations` (`id`, `email`, `host`, `username`, `password`, `port`, `encryption`, `created_at`, `updated_at`) VALUES
(1, 'mdjewel20172017@gmail.com', 'smtp.gmail.com', 'mdjewel20172017@gmail.com', 'blkv vrcc uxrh szus', '587', 'tls', '2025-10-18 06:33:35', '2025-11-15 23:59:33');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `role_name` varchar(256) NOT NULL DEFAULT 'employee',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `user_id`, `name`, `designation`, `role_name`, `created_at`, `updated_at`) VALUES
(3, 11, 'test', 'Employee', 'employee', '2025-11-09 01:06:24', '2025-11-09 01:06:24'),
(4, 12, NULL, 'Employee', 'employee', '2025-11-09 02:50:46', '2025-11-09 02:50:46');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flash_sales`
--

CREATE TABLE `flash_sales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flash_sale_items`
--

CREATE TABLE `flash_sale_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `flash_sale_id` int(11) NOT NULL,
  `show_at_home` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `footer_infos`
--

CREATE TABLE `footer_infos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `logo` text DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `copyright` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `footer_infos`
--

INSERT INTO `footer_infos` (`id`, `logo`, `phone`, `email`, `address`, `copyright`, `created_at`, `updated_at`) VALUES
(1, NULL, '+4553713518', 'hyggecotton2025@gmail.com', 'Trommesalen 3, 1614 København', 'Hyggo Cotton || Ideation & Design Shahadat', '2025-10-16 08:23:14', '2025-11-26 18:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `footer_socials`
--

CREATE TABLE `footer_socials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `icon_extra` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `serial_no` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `footer_socials`
--

INSERT INTO `footer_socials` (`id`, `icon`, `icon_extra`, `name`, `url`, `serial_no`, `status`, `created_at`, `updated_at`) VALUES
(2, 'fab fa-facebook-f', NULL, 'Facebook', 'https://api.sandbox.africastalking.com/version1/messaging', 1, 1, '2025-10-16 09:27:21', '2025-10-16 09:50:20'),
(3, 'fab fa-instagram', NULL, 'Instragram', 'https://www.instagram.com/accounts/login/?hl=en', 2, 1, '2025-10-18 08:25:35', '2025-10-18 08:25:35'),
(4, 'fab fa-twitter', NULL, 'Twitter', 'https://x.com/?lang=en', 3, 1, '2025-10-18 08:26:14', '2025-10-18 08:26:14');

-- --------------------------------------------------------

--
-- Table structure for table `general_settings`
--

CREATE TABLE `general_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `site_name` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `contact_address` varchar(255) DEFAULT NULL,
  `currency_name` varchar(255) NOT NULL,
  `currency_icon` varchar(255) NOT NULL,
  `time_zone` varchar(255) NOT NULL,
  `map` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `general_settings`
--

INSERT INTO `general_settings` (`id`, `site_name`, `contact_email`, `contact_phone`, `contact_address`, `currency_name`, `currency_icon`, `time_zone`, `map`, `created_at`, `updated_at`) VALUES
(1, 'hygee', 'hygee@gmail.com', '01358796542', 'Dhaka', 'USD', '€', 'Asia/Dhaka', NULL, NULL, '2025-11-30 17:16:18');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `resume` varchar(255) NOT NULL,
  `cover_letter` text DEFAULT NULL,
  `video_cv` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_applications`
--

INSERT INTO `job_applications` (`id`, `name`, `email`, `phone`, `position`, `resume`, `cover_letter`, `video_cv`, `created_at`, `updated_at`) VALUES
(4, 'Hasan vai', 'hassan@gmail.com', '01796762456', 'companir malik', 'uploads/applications/1762943124_buying-house.pdf', 'asdfasdfasdfasdfasdfasdddddddddddddddddddddddddddddddddddddddddddddddddddddd\r\nasdfasdfasdfasdfasdfasdddddddddddddddddddddddddddddddddddddddddddddddddddddd\r\nasdfasdfasdfasdfasdfasdddddddddddddddddddddddddddddddddddddddddddddddddddddd\r\nasdfasdfasdfasdfasdfasdddddddddddddddddddddddddddddddddddddddddddddddddddddd', '', '2025-11-12 04:25:24', '2025-11-12 04:25:24'),
(5, 'Sirajul', 'sirajul@gmail.com', '01796762456', 'front end developer', 'uploads/applications/1762943467_buying-house.pdf', 'asdfasfdasdfasdfasfdasdfasdfasfdasdfasdfasfdasdfasdfasfdasdfasdfasfdasdfasdfasfdasdfasdfasfdasdfasdfasfdasdfasdfasfdasdfasdfasfdasdfasdfasfdasdfasdfasfdasdfasdfasfdasdf', '', '2025-11-12 04:31:07', '2025-11-12 04:31:07'),
(6, 'Hassan vai', 'hassan@gmail.com', '+8801796762456', 'Full Stack Developer', 'uploads/applications/1763289061_buying-house.pdf', 'zsdgfsdddddddddddddddddd', '', '2025-11-16 04:31:01', '2025-11-16 04:31:01'),
(7, 'Hassan vai', 'hassans@gmail.com', '+8801796762456', 'Full Stack Developer', 'uploads/applications/1763377905_buying-house.pdf', 'asdfasdfasdfasdfasdf asdf asdfasdfsdaf', '', '2025-11-17 05:11:45', '2025-11-17 05:11:45'),
(16, 'Faith Saunders', 'kijyxulab@mailinator.com', '+1 (122) 571-4887', 'Voluptate pariatur', 'uploads/applications/1763883118_Employee.pdf', 'Est voluptas ea omn', 'uploads/video_cvs/1763883118_6922b86eae948.mp4', '2025-11-23 01:31:58', '2025-11-23 01:31:58'),
(18, 'momo', 'momofo1614@aikunkun.com', '01228382912', 'devleoper', 'uploads/applications/1763884004_Employee.pdf', 'sdfsdfsdfsd', 'uploads/video_cvs/1763884004_6922bbe4a8721.mp4', '2025-11-23 01:46:44', '2025-11-23 01:46:44'),
(19, 'Ori Johnston', 'momofo1614@aikunkun.com', '+1 (377) 625-7481', 'Sit in earum culpa', 'uploads/applications/1763884088_Employee.pdf', 'Corporis a consequat', 'uploads/video_cvs/1763884088_6922bc380f5ac.mp4', '2025-11-23 01:48:08', '2025-11-23 01:48:08'),
(20, 'Kaden Mccormick', 'mdjewel20172017@gmail.com', '+1 (516) 379-9452', 'Tempora quas vel et', 'uploads/applications/1763884125_Employee.pdf', 'Quod lorem atque non', 'uploads/video_cvs/1763884125_6922bc5dcbcd7.mp4', '2025-11-23 01:48:45', '2025-11-23 01:48:45');

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `logo_settings`
--

CREATE TABLE `logo_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `logo` text DEFAULT NULL,
  `favicon` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `logo_settings`
--

INSERT INTO `logo_settings` (`id`, `logo`, `favicon`, `created_at`, `updated_at`) VALUES
(1, 'uploads/logo/1847200410938061.svg', 'uploads/logo/1847200355288932.svg', '2025-10-27 22:56:56', '2025-10-27 22:59:49');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(71, '0001_01_01_000000_create_users_table', 1),
(72, '0001_01_01_000001_create_cache_table', 1),
(73, '0001_01_01_000002_create_jobs_table', 1),
(74, '2025_08_12_131017_create_permission_tables', 1),
(75, '2025_09_09_083931_create_categories_table', 1),
(76, '2025_09_13_113042_create_sub_categories_table', 1),
(77, '2025_09_14_045626_create_child_categories_table', 1),
(78, '2025_09_14_064718_create_brands_table', 1),
(79, '2025_09_14_072324_create_profiles_table', 1),
(80, '2025_09_14_083447_create_sliders_table', 1),
(81, '2025_09_15_041947_create_products_table', 1),
(82, '2025_09_15_095335_create_product_image_galleries_table', 1),
(83, '2025_09_15_110153_create_product_variants_table', 1),
(84, '2025_09_16_040006_create_product_variant_items_table', 1),
(85, '2025_09_16_045920_create_sizes_table', 1),
(86, '2025_09_16_055935_create_colors_table', 1),
(87, '2025_09_16_092245_create_product_sizes_table', 1),
(88, '2025_09_16_092331_create_product_colors_table', 1),
(89, '2025_09_17_055526_create_general_settings_table', 1),
(90, '2025_09_17_055820_create_email_configurations_table', 1),
(91, '2025_09_17_055834_create_logo_settings_table', 1),
(92, '2025_09_17_074109_create_coupons_table', 1),
(93, '2025_09_17_094605_create_shipping_rules_table', 1),
(94, '2025_09_24_060919_create_paypal_settings_table', 1),
(95, '2025_09_24_062106_create_cod_settings_table', 1),
(96, '2025_09_24_082710_create_flash_sales_table', 1),
(97, '2025_09_24_082809_create_flash_sale_items_table', 1),
(98, '2025_09_24_090140_create_blog_categories_table', 1),
(99, '2025_09_24_092500_create_blogs_table', 1),
(100, '2025_09_24_103922_create_personal_access_tokens_table', 1),
(101, '2025_09_28_102020_create_product_reviews_table', 1),
(102, '2025_10_08_102543_create_carts_table', 1),
(103, '2025_10_11_052933_create_countries_table', 1),
(104, '2025_10_11_052934_create_states_table', 1),
(105, '2025_10_11_053015_create_shipping_methods_table', 1),
(106, '2025_10_11_053021_create_shipping_charges_table', 1),
(107, '2025_10_11_053027_create_product_shippings_table', 1),
(108, '2025_10_13_071653_create_order_statuses_table', 1),
(109, '2025_10_13_083241_create_customers_table', 1),
(110, '2025_10_13_103959_create_orders_table', 1),
(111, '2025_10_14_061439_create_order_products_table', 1),
(112, '2025_10_14_061735_create_transactions_table', 1),
(113, '2025_10_15_110631_create_promotions_table', 1),
(114, '2025_10_16_132020_create_footer_infos_table', 2),
(115, '2025_10_16_143941_create_footer_socials_table', 3),
(116, '2025_10_16_174201_create_abouts_table', 4),
(117, '2025_10_16_174213_create_terms_and_conditions_table', 4),
(118, '2025_10_18_123507_create_create_pages_table', 5),
(119, '2025_10_20_042323_create_product_customizations_table', 6),
(122, '2025_10_23_055831_create_branches_table', 8),
(126, '2025_10_23_073512_create_payoneer_settings_table', 9),
(127, '2024_01_01_000001_create_vipps_payments_table', 10),
(128, '2024_01_01_000002_create_vipps_recurring_agreements_table', 10),
(129, '2024_01_01_000003_create_vipps_recurring_charges_table', 10),
(130, '2025_10_23_125633_create_vipps_settings_table', 11),
(131, '2025_10_25_043243_create_mobile_pay_transactions_table', 12),
(132, '2025_10_20_065807_create_customer_customizations_table', 13),
(133, '2025_11_02_073336_add_session_id_to_customer_customizations_table', 14),
(134, '2025_11_09_054545_create_employees_table', 15),
(135, '2025_11_09_061305_create_attendances_table', 15),
(136, '2025_11_11_054204_create_customer_addresses_table', 16),
(138, '2025_11_11_084545_create_job_applications_table', 17),
(139, '2025_11_11_114458_create_pickup_shipping_methods_table', 18),
(140, '2025_11_12_044038_add_store_id_to_orders_table', 19),
(141, '2025_11_12_065439_add_personal_info_to_orders_table', 20);

-- --------------------------------------------------------

--
-- Table structure for table `mobile_pay_transactions`
--

CREATE TABLE `mobile_pay_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`response`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(3, 'App\\Models\\Customer', 4),
(3, 'App\\Models\\Customer', 5),
(2, 'App\\Models\\User', 5),
(3, 'App\\Models\\Customer', 6),
(3, 'App\\Models\\Customer', 7),
(3, 'App\\Models\\Customer', 8),
(8, 'App\\Models\\User', 8),
(3, 'App\\Models\\Customer', 9),
(3, 'App\\Models\\Customer', 10),
(3, 'App\\Models\\Customer', 11),
(8, 'App\\Models\\User', 11),
(3, 'App\\Models\\Customer', 12),
(8, 'App\\Models\\User', 12),
(3, 'App\\Models\\Customer', 13),
(3, 'App\\Models\\Customer', 14),
(3, 'App\\Models\\Customer', 15),
(3, 'App\\Models\\Customer', 16),
(3, 'App\\Models\\Customer', 17),
(3, 'App\\Models\\Customer', 18),
(3, 'App\\Models\\Customer', 19),
(3, 'App\\Models\\Customer', 20),
(3, 'App\\Models\\Customer', 21),
(3, 'App\\Models\\Customer', 22),
(3, 'App\\Models\\Customer', 23),
(3, 'App\\Models\\Customer', 24),
(3, 'App\\Models\\Customer', 25),
(3, 'App\\Models\\Customer', 26),
(3, 'App\\Models\\Customer', 27),
(3, 'App\\Models\\Customer', 28),
(3, 'App\\Models\\Customer', 29),
(3, 'App\\Models\\Customer', 30),
(3, 'App\\Models\\Customer', 31),
(3, 'App\\Models\\Customer', 32),
(3, 'App\\Models\\Customer', 33);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` varchar(255) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `sub_total` double NOT NULL,
  `amount` double NOT NULL,
  `currency_name` varchar(255) NOT NULL,
  `currency_icon` varchar(255) NOT NULL,
  `product_qty` int(11) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_status` int(11) NOT NULL,
  `order_address` text DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `shipping_method` text NOT NULL,
  `store_id` bigint(20) UNSIGNED DEFAULT NULL,
  `coupon` text NOT NULL,
  `order_status_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `personal_info` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `invoice_id`, `customer_id`, `sub_total`, `amount`, `currency_name`, `currency_icon`, `product_qty`, `payment_method`, `payment_status`, `order_address`, `order_status`, `shipping_method`, `store_id`, `coupon`, `order_status_id`, `created_at`, `updated_at`, `personal_info`) VALUES
(53, '449546', 33, 80, 80, 'USD', '$', 1, 'COD', 0, NULL, NULL, '{\"id\":4,\"name\":\"pickup\",\"store_name\":\"Raymond Kirk\",\"type\":\"pickup\",\"cost\":0,\"address\":\"Fuga Officia dolore\",\"phone\":\"+1 (809) 186-2999\",\"email\":\"wuzo@mailinator.com\",\"map_location\":\"Eiusmod quasi corpor\"}', NULL, '[]', NULL, '2025-11-16 02:55:31', '2025-11-16 02:55:31', '{\"name\":\"Hassan vai\",\"email\":\"hassan@gmail.com\",\"phone\":\"01796762456\",\"address\":\"pallabi\",\"city\":\"dhaka\",\"state\":\"dhaka\",\"zip\":\"1216\",\"country\":\"Bangladesh\"}'),
(54, '778791', 33, 50, 250, 'USD', '$', 1, 'COD', 0, '{\"name\":\"Hassan vai\",\"email\":\"hassan@gmail.com\",\"phone\":\"01796762456\",\"address\":\"pallabi\",\"city\":\"dhaka\",\"state\":\"dhaka\",\"zip\":\"1216\",\"country\":\"Bangladesh\"}', NULL, '{\"id\":1,\"name\":\"Express Delivery 1-2 day\",\"type\":\"flat_cost\",\"cost\":200}', NULL, '[]', NULL, '2025-11-16 03:12:44', '2025-11-16 03:12:44', '{\"name\":\"Hassan vai\",\"email\":\"hassan@gmail.com\",\"phone\":\"01796762456\",\"address\":\"pallabi\",\"city\":\"dhaka\",\"state\":\"dhaka\",\"zip\":\"1216\",\"country\":\"Bangladesh\"}'),
(55, '829157', 33, 360, 560, 'USD', '$', 1, 'COD', 0, '{\"name\":\"Hassan vai\",\"email\":\"hassan@gmail.com\",\"phone\":\"01796762456\",\"address\":\"pallabi\",\"city\":\"dhaka\",\"state\":\"dhaka\",\"zip\":\"1216\",\"country\":\"Bangladesh\"}', NULL, '{\"id\":1,\"name\":\"Express Delivery 1-2 day\",\"type\":\"flat_cost\",\"cost\":200}', NULL, '[]', NULL, '2025-11-16 04:32:25', '2025-11-16 04:32:25', '{\"name\":\"Hassan vai\",\"email\":\"hassan@gmail.com\",\"phone\":\"01796762456\",\"address\":\"pallabi\",\"city\":\"dhaka\",\"state\":\"dhaka\",\"zip\":\"1216\",\"country\":\"Bangladesh\"}'),
(56, '563749', 33, 1550, 1750, 'USD', '$', 2, 'COD', 0, '{\"name\":\"Hassan vai\",\"email\":\"hassan@gmail.com\",\"phone\":\"01796762456\",\"address\":\"pallabi\",\"city\":\"dhaka\",\"state\":\"dhaka\",\"zip\":\"1216\",\"country\":\"Bangladesh\"}', NULL, '{\"id\":1,\"name\":\"Express Delivery 1-2 day\",\"type\":\"flat_cost\",\"cost\":200}', NULL, '[]', NULL, '2025-11-16 07:55:27', '2025-11-16 07:55:27', '{\"name\":\"Hassan vai\",\"email\":\"hassan@gmail.com\",\"phone\":\"01796762456\",\"address\":\"pallabi\",\"city\":\"dhaka\",\"state\":\"dhaka\",\"zip\":\"1216\",\"country\":\"Bangladesh\"}'),
(57, '587574', 33, 122, 322, 'USD', '$', 1, 'COD', 0, '{\"name\":\"Hassan vai\",\"email\":\"hassan@gmail.com\",\"phone\":\"01796762456\",\"address\":\"pallabi\",\"city\":\"dhaka\",\"state\":\"dhaka\",\"zip\":\"1216\",\"country\":\"Bangladesh\"}', NULL, '{\"id\":1,\"name\":\"Express Delivery 1-2 day\",\"type\":\"flat_cost\",\"cost\":200}', NULL, '[]', NULL, '2025-11-27 17:40:00', '2025-11-27 17:40:00', '{\"name\":\"Hassan vai\",\"email\":\"hassan@gmail.com\",\"phone\":\"01796762456\",\"address\":\"pallabi\",\"city\":\"dhaka\",\"state\":\"dhaka\",\"zip\":\"1216\",\"country\":\"Bangladesh\"}');

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `variants` text NOT NULL,
  `variants_total` int(11) DEFAULT NULL,
  `unit_price` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `extra_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `front_image` text DEFAULT NULL,
  `back_image` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`id`, `order_id`, `product_id`, `product_name`, `variants`, `variants_total`, `unit_price`, `qty`, `extra_price`, `front_image`, `back_image`, `created_at`, `updated_at`) VALUES
(21, 23, 11, 'Logan Allen', '{\"image\":\"uploads\\/products\\/1846478306413865.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '517.00', 1, 0.00, NULL, NULL, '2025-10-26 06:17:33', '2025-10-26 06:17:33'),
(22, 24, 11, 'Logan Allen', '{\"image\":\"uploads\\/products\\/1846478306413865.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '517.00', 1, 0.00, NULL, NULL, '2025-10-28 14:09:09', '2025-10-28 14:09:09'),
(23, 25, 4, 'Yasir Potter', '{\"image\":\"uploads\\/products\\/1846395030152674.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '651.00', 1, 0.00, NULL, NULL, '2025-10-28 14:10:08', '2025-10-28 14:10:08'),
(24, 26, 4, 'Yasir Potter', '{\"image\":\"uploads\\/products\\/1846395030152674.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '651.00', 1, 0.00, NULL, NULL, '2025-10-28 14:42:53', '2025-10-28 14:42:53'),
(25, 27, 7, 'Adena Gray', '{\"image\":\"uploads\\/products\\/1846403380521163.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":\"2.00\",\"font_image\":\"uploads\\/customizations\\/front_1761715062.png\",\"back_image\":null,\"is_free_product\":false}', 0, '746.00', 1, 2.00, 'uploads/customizations/front_1761715062.png', NULL, '2025-10-29 09:17:54', '2025-10-29 09:17:54'),
(26, 28, 11, 'Logan Allen', '{\"image\":\"uploads\\/products\\/1846478306413865.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":\"0.00\",\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '517.00', 1, 0.00, NULL, NULL, '2025-10-29 14:00:04', '2025-10-29 14:00:04'),
(27, 29, 11, 'Logan Allen', '{\"image\":\"uploads\\/products\\/1846478306413865.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":\"4.00\",\"font_image\":\"uploads\\/customizations\\/front_1761986740.png\",\"back_image\":null,\"is_free_product\":false}', 0, '517.00', 1, 4.00, 'uploads/customizations/front_1761986740.png', NULL, '2025-11-01 12:46:24', '2025-11-01 12:46:24'),
(28, 30, 18, 'Logan Allen', '{\"image\":\"uploads\\/products\\/1847751224318375.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":\"4.00\",\"font_image\":\"uploads\\/customizations\\/front_1762154236.png\",\"back_image\":null,\"is_free_product\":false}', 0, '150.00', 1, 4.00, 'uploads/customizations/front_1762154236.png', NULL, '2025-11-03 13:07:54', '2025-11-03 13:07:54'),
(29, 31, 19, 'Logan Allen', '{\"image\":\"uploads\\/products\\/1847756074327296.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":\"5.00\",\"font_image\":\"uploads\\/customizations\\/front_1762157561.png\",\"back_image\":\"uploads\\/customizations\\/back_1762157561.png\",\"is_free_product\":false}', 0, '121.00', 1, 5.00, 'uploads/customizations/front_1762157561.png', 'uploads/customizations/back_1762157561.png', '2025-11-03 13:13:25', '2025-11-03 13:13:25'),
(30, 32, 20, 'Logan allen', '{\"image\":\"uploads\\/products\\/1847761581611157.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '800.00', 1, 0.00, NULL, NULL, '2025-11-03 14:42:26', '2025-11-03 14:42:26'),
(32, 34, 20, 'Logan allen', '[]', 0, '100', 2, 0.00, NULL, NULL, '2025-11-11 23:08:41', '2025-11-11 23:08:41'),
(39, 40, 28, 'UrbanEase', '{\"image\":\"uploads\\/products\\/1847768054822992.jpeg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '120.00', 1, 0.00, NULL, NULL, '2025-11-12 01:18:08', '2025-11-12 01:18:08'),
(40, 41, 22, 'ZipMate Pouch', '{\"image\":\"uploads\\/products\\/1847766651905312.jpeg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '120.00', 1, 0.00, NULL, NULL, '2025-11-12 21:52:18', '2025-11-12 21:52:18'),
(41, 42, 30, 'T-Shirts - Men', '{\"image\":\"uploads\\/products\\/1847768718542644.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '55.00', 1, 0.00, NULL, NULL, '2025-11-12 23:24:33', '2025-11-12 23:24:33'),
(42, 43, 39, 'Men\'s Premium Hoodie', '{\"image\":\"uploads\\/products\\/1847774818885953.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '1050.00', 1, 0.00, NULL, NULL, '2025-11-13 00:16:49', '2025-11-13 00:16:49'),
(43, 44, 38, 'Yellow Cotton Full Sleeve Hoodie For Men - Hoodie For Men', '{\"image\":\"uploads\\/products\\/1847774235706292.png\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '500.00', 1, 0.00, NULL, NULL, '2025-11-13 02:27:11', '2025-11-13 02:27:11'),
(44, 45, 39, 'Men\'s Premium Hoodie', '{\"image\":\"uploads\\/products\\/1847774818885953.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '1050.00', 1, 0.00, NULL, NULL, '2025-11-13 02:30:24', '2025-11-13 02:30:24'),
(45, 46, 38, 'Yellow Cotton Full Sleeve Hoodie For Men - Hoodie For Men', '{\"image\":\"uploads\\/products\\/1847774235706292.png\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '500.00', 1, 0.00, NULL, NULL, '2025-11-13 02:35:13', '2025-11-13 02:35:13'),
(46, 47, 39, 'Men\'s Premium Hoodie', '{\"image\":\"uploads\\/products\\/1847774818885953.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '1050.00', 1, 0.00, NULL, NULL, '2025-11-13 03:02:47', '2025-11-13 03:02:47'),
(47, 48, 28, 'UrbanEase', '{\"image\":\"uploads\\/products\\/1847768054822992.jpeg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '120.00', 1, 0.00, NULL, NULL, '2025-11-13 03:40:45', '2025-11-13 03:40:45'),
(48, 49, 38, 'Yellow Cotton Full Sleeve Hoodie For Men - Hoodie For Men', '{\"image\":\"uploads\\/products\\/1847774235706292.png\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '500.00', 1, 0.00, NULL, NULL, '2025-11-16 00:03:30', '2025-11-16 00:03:30'),
(49, 50, 39, 'Men\'s Premium Hoodie', '{\"image\":\"uploads\\/products\\/1847774818885953.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '1050.00', 1, 0.00, NULL, NULL, '2025-11-16 00:16:32', '2025-11-16 00:16:32'),
(50, 50, 32, 'Premium Lycra Cotton Round Neck T-Shirt', '{\"image\":\"uploads\\/products\\/1847771076903662.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '80.00', 1, 0.00, NULL, NULL, '2025-11-16 00:16:32', '2025-11-16 00:16:32'),
(51, 50, 20, 'Logan allen', '{\"image\":\"uploads\\/products\\/1847761581611157.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '120.00', 1, 0.00, NULL, NULL, '2025-11-16 00:16:32', '2025-11-16 00:16:32'),
(52, 50, 31, 'Custom Next Level Tri-Blend T-Shirt', '{\"image\":\"uploads\\/products\\/1847768825556313.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '50.00', 1, 0.00, NULL, NULL, '2025-11-16 00:16:32', '2025-11-16 00:16:32'),
(53, 51, 39, 'Men\'s Premium Hoodie', '{\"image\":\"uploads\\/products\\/1847774818885953.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '1050.00', 1, 0.00, NULL, NULL, '2025-11-16 02:48:33', '2025-11-16 02:48:33'),
(54, 52, 32, 'Premium Lycra Cotton Round Neck T-Shirt', '{\"image\":\"uploads\\/products\\/1847771076903662.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '80.00', 1, 0.00, NULL, NULL, '2025-11-16 02:51:20', '2025-11-16 02:51:20'),
(55, 53, 32, 'Premium Lycra Cotton Round Neck T-Shirt', '{\"image\":\"uploads\\/products\\/1847771076903662.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '80.00', 1, 0.00, NULL, NULL, '2025-11-16 02:55:31', '2025-11-16 02:55:31'),
(56, 54, 31, 'Custom Next Level Tri-Blend T-Shirt', '{\"image\":\"uploads\\/products\\/1847768825556313.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '50.00', 1, 0.00, NULL, NULL, '2025-11-16 03:12:44', '2025-11-16 03:12:44'),
(57, 55, 20, 'Logan allen', '{\"image\":\"uploads\\/products\\/1847761581611157.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '120.00', 3, 0.00, NULL, NULL, '2025-11-16 04:32:25', '2025-11-16 04:32:25'),
(58, 56, 39, 'Men\'s Premium Hoodie', '{\"image\":\"uploads\\/products\\/1847774818885953.jpg\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '1050.00', 1, 0.00, NULL, NULL, '2025-11-16 07:55:27', '2025-11-16 07:55:27'),
(59, 56, 38, 'Yellow Cotton Full Sleeve Hoodie For Men - Hoodie For Men', '{\"image\":\"uploads\\/products\\/1847774235706292.png\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":0,\"font_image\":null,\"back_image\":null,\"is_free_product\":false}', 0, '500.00', 1, 0.00, NULL, NULL, '2025-11-16 07:55:27', '2025-11-16 07:55:27'),
(60, 57, 20, 'Logan allen', '{\"image\":\"uploads\\/products\\/1847761581611157.webp\",\"size_id\":null,\"size_name\":null,\"size_price\":0,\"color_id\":null,\"color_name\":null,\"color_price\":0,\"variant_total\":0,\"extra_price\":\"2.00\",\"font_image\":\"uploads\\/customizations\\/front_1764247183.png\",\"back_image\":null,\"is_free_product\":false}', 0, '120.00', 1, 2.00, 'uploads/customizations/front_1764247183.png', NULL, '2025-11-27 17:40:00', '2025-11-27 17:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `order_statuses`
--

CREATE TABLE `order_statuses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_statuses`
--

INSERT INTO `order_statuses` (`id`, `name`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Pending', 'pending', 1, '2025-10-15 11:14:37', '2025-10-15 11:14:37'),
(3, 'Processed', 'processed', 1, '2025-10-16 05:57:17', '2025-10-16 06:51:33'),
(4, 'Delivered', 'delivered', 0, '2025-10-16 05:57:43', '2025-10-16 06:51:21');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('admin@example.com', '$2y$12$kGhJQTC2Hcp.39ikWcAoc.Rplp.xMrjLP3afL1kwMbAKpLydee9GO', '2025-10-20 22:24:31'),
('hasan@example.com', '$2y$12$qidiAvFp3M8WFRGDDcyaueYz3R03bQaD5iD.d.1sOnaH127ZEpOEu', '2025-11-10 05:08:34'),
('inoodexsirajul@gmail.com', '$2y$12$3o15yoQINnrmo20d3HyG4eNOUjW64d1WJD.ySVXUFe/wc8Am6VKeq', '2025-12-01 11:41:58'),
('user@gmail.com', '$2y$12$Irdq5cvbhdCes1cbtASYmOVwqSM5FyQi5xSCJjbASZh6oX177HnJ6', '2025-11-03 13:16:49');

-- --------------------------------------------------------

--
-- Table structure for table `payoneer_settings`
--

CREATE TABLE `payoneer_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `account_mode` tinyint(1) NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `api_secret_key` varchar(255) NOT NULL,
  `program_id` varchar(255) NOT NULL,
  `currency_name` varchar(255) NOT NULL,
  `country_name` varchar(255) NOT NULL,
  `api_url` varchar(255) DEFAULT NULL,
  `token_url` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payoneer_settings`
--

INSERT INTO `payoneer_settings` (`id`, `account_mode`, `api_key`, `api_secret_key`, `program_id`, `currency_name`, `country_name`, `api_url`, `token_url`, `status`, `created_at`, `updated_at`) VALUES
(1, 0, 'atsk_e83271dadd34b2a023b638c9d9d3308ffed8cf2d49fa808a702ed929dcc62d588ed6e734', 'atsk_e83271dadd34b2a023b638c9d9d3308ffed8cf2d49fa808a702ed929dcc62d588ed6e734', 'atsk_e83271dadd34b2a023b638c9d9d3308ffed8cf2d49fa808a702ed929dcc62d588ed6e734', 'DKK', 'Denmark', 'https://api.sandbox.payoneer.com/v4', 'https://api.sandbox.payoneer.com/PartnerAPI/oauth2/token', 1, '2025-10-23 05:55:32', '2025-10-23 05:55:32');

-- --------------------------------------------------------

--
-- Table structure for table `paypal_settings`
--

CREATE TABLE `paypal_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `status` tinyint(1) NOT NULL,
  `account_mode` tinyint(1) NOT NULL,
  `country_name` varchar(255) NOT NULL,
  `currency_name` varchar(255) NOT NULL,
  `currency_rate` double NOT NULL,
  `client_id` text NOT NULL,
  `secret_key` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `paypal_settings`
--

INSERT INTO `paypal_settings` (`id`, `status`, `account_mode`, `country_name`, `currency_name`, `currency_rate`, `client_id`, `secret_key`, `created_at`, `updated_at`) VALUES
(1, 1, 0, 'United States', 'USD', 1, 'AbFXF28It6lTljSaVAFxaM2m4dYMadHSzeweTBTY81C4q5JkiNo6p0LpV1yADMVtdHqK4ryjFXbTIli2', 'EMx-E5seOTyHnkmK9fBbD8hhvsOiTgf62RfueKTf1rhbCNesdzijWc2et2ltzNXoMCyiRgMTWEE05ngh', NULL, '2025-10-21 05:15:55');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Administration', 'web', '2025-11-06 04:31:48', '2025-11-06 04:31:48'),
(2, 'Manage Categories', 'web', '2025-11-06 04:31:57', '2025-11-06 04:31:57'),
(3, 'Manage Products', 'web', '2025-11-06 04:32:06', '2025-11-06 04:32:06'),
(4, 'Manage Orders', 'web', '2025-11-06 04:32:21', '2025-11-06 04:32:21'),
(5, 'Manage Ecommerce', 'web', '2025-11-06 04:32:36', '2025-11-06 04:32:36'),
(6, 'Manage Transaction', 'web', '2025-11-06 04:32:57', '2025-11-06 04:32:57'),
(7, 'Manage Website', 'web', '2025-11-06 04:33:08', '2025-11-06 04:33:08'),
(8, 'Manage Setting & More', 'web', '2025-11-06 04:33:31', '2025-11-06 04:33:31'),
(9, 'Manage Blog', 'web', '2025-11-06 04:33:51', '2025-11-06 04:33:51'),
(10, 'Manage Employee', 'web', '2025-11-06 04:35:15', '2025-11-06 04:35:15'),
(21, 'Manage Job Application', 'web', '2025-11-11 03:29:17', '2025-11-11 04:54:56');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(12, 'App\\Models\\Customer', 4, 'API Token', 'f36fef212cdc23e5d48aa59f3f6d0a34c5e9e4cbf1e5b55a9598cb385939c2cf', '[\"*\"]', NULL, NULL, '2025-10-21 23:00:57', '2025-10-21 23:00:57'),
(17, 'App\\Models\\Customer', 5, 'API Token', 'baa17f8127e5049825befdd9d457c72a8c993f57add45d5daafdf32da0ccbc7d', '[\"*\"]', '2025-10-21 23:33:25', NULL, '2025-10-21 23:29:27', '2025-10-21 23:33:25'),
(30, 'App\\Models\\Customer', 7, 'API Token', '7695a5b0ded6033935e46373ba6148391741a90666f1f57c5037d31bcb013b34', '[\"*\"]', NULL, NULL, '2025-10-22 04:32:19', '2025-10-22 04:32:19'),
(31, 'App\\Models\\Customer', 8, 'API Token', '7c4d1490267985d71e39f97535c0cccf6c0e1b721b9731d73a16b63c01be0cfe', '[\"*\"]', NULL, NULL, '2025-10-22 04:33:05', '2025-10-22 04:33:05'),
(34, 'App\\Models\\Customer', 9, 'API Token', 'ca34f5687470369350ef1244c3525376e41bfe59b6254320a7a74b3d66a0e661', '[\"*\"]', NULL, NULL, '2025-10-22 05:46:28', '2025-10-22 05:46:28'),
(35, 'App\\Models\\Customer', 10, 'API Token', '3103553080dd18b441997a8d296a3c48e6f28a9b55130ed1a3fd4e36ca796ae3', '[\"*\"]', NULL, NULL, '2025-10-22 05:51:59', '2025-10-22 05:51:59'),
(36, 'App\\Models\\Customer', 11, 'API Token', '7c74bd113dca94ff79490bc9fbb675c6092252629117dcbb26dd3848f23fdfdf', '[\"*\"]', NULL, NULL, '2025-10-22 05:53:28', '2025-10-22 05:53:28'),
(90, 'App\\Models\\Customer', 6, 'API Token', 'bb8361276fb1b9f0e76b7a8c61111afd7b1f05c0033c27264116ec6110d25767', '[\"*\"]', '2025-10-26 00:01:39', NULL, '2025-10-26 00:01:24', '2025-10-26 00:01:39'),
(116, 'App\\Models\\Customer', 13, 'API Token', '7a8057e14fdbf6bc0d50e80c6728820c68811239bd3334564c24610287d3f77c', '[\"*\"]', '2025-10-27 05:07:55', NULL, '2025-10-27 04:50:49', '2025-10-27 05:07:55'),
(148, 'App\\Models\\Customer', 15, 'API Token', 'a7d81046101ce6b8349dfdb6ba885a4f0453ccb428178b9f050ce3324836af04', '[\"*\"]', NULL, NULL, '2025-10-29 14:57:26', '2025-10-29 14:57:26'),
(169, 'App\\Models\\Customer', 17, 'API Token', '4b96b0e6c1346697329dcaf31532d54823606dd418cc8795a5d7e549630fc9cf', '[\"*\"]', NULL, NULL, '2025-11-03 11:42:17', '2025-11-03 11:42:17'),
(175, 'App\\Models\\Customer', 18, 'API Token', '7d5d7c3b05f30b779a7e406c2a50e842d8ec603dfa116f017960278864513d48', '[\"*\"]', NULL, NULL, '2025-11-03 14:59:31', '2025-11-03 14:59:31'),
(182, 'App\\Models\\Customer', 20, 'API Token', 'ef63bd0104209bbb78f68fa2adacbb5fea7931fc7845a964fb66b859215f7f5d', '[\"*\"]', NULL, NULL, '2025-11-10 04:47:16', '2025-11-10 04:47:16'),
(183, 'App\\Models\\Customer', 21, 'API Token', 'fa1aa13f8221118e90a4ce08ea1fbe2db73178246e3ee425fe3dfeafe063a292', '[\"*\"]', NULL, NULL, '2025-11-10 05:36:06', '2025-11-10 05:36:06'),
(184, 'App\\Models\\Customer', 22, 'API Token', 'faf9edfe4df023695a642cdfad987e29f28b399a4764d2bcbb4f28002fbcc600', '[\"*\"]', NULL, NULL, '2025-11-10 05:48:33', '2025-11-10 05:48:33'),
(185, 'App\\Models\\Customer', 23, 'API Token', '08979845a21cc2423a0873ec561f70f7ba15e95705c6d0c006f7e88026e9656f', '[\"*\"]', NULL, NULL, '2025-11-10 05:50:56', '2025-11-10 05:50:56'),
(186, 'App\\Models\\Customer', 24, 'API Token', 'f37fc78d51d54a2ea6e435983e11fcb303923095c298f2784370ac124f7a299d', '[\"*\"]', NULL, NULL, '2025-11-10 06:20:49', '2025-11-10 06:20:49'),
(187, 'App\\Models\\Customer', 25, 'API Token', '261600d803c8e9f22f04eb981454b9a6a7660477f55c55fc36aeb2ed50270c0a', '[\"*\"]', NULL, NULL, '2025-11-10 22:16:41', '2025-11-10 22:16:41'),
(188, 'App\\Models\\Customer', 26, 'API Token', 'a0cbd6d3c35766ca2a356750e2d39892560968b99021a2443bdf41ed1613c813', '[\"*\"]', NULL, NULL, '2025-11-10 22:39:28', '2025-11-10 22:39:28'),
(193, 'App\\Models\\Customer', 28, 'API Token', '5a3d236e07ed56d5387f3b2ad94b53d02f85bf918f8bc86325c64eab25ff8a65', '[\"*\"]', NULL, NULL, '2025-11-11 03:25:56', '2025-11-11 03:25:56'),
(200, 'App\\Models\\Customer', 29, 'API Token', 'c6d00d8ad6a3e602aa265287b28b6f5abcf70bcf459a60b28aa8458272f1358f', '[\"*\"]', NULL, NULL, '2025-11-13 05:57:48', '2025-11-13 05:57:48'),
(201, 'App\\Models\\Customer', 30, 'API Token', 'ff7cdc6c649bcd4b1813008edf876a0deb943daa87c5d8cff274c38a126c56fb', '[\"*\"]', NULL, NULL, '2025-11-15 23:54:15', '2025-11-15 23:54:15'),
(205, 'App\\Models\\Customer', 32, 'API Token', 'ee14aba4b781be368b183cbf9d68dccd7a2844a335885aea313dca3328e90024', '[\"*\"]', NULL, NULL, '2025-11-16 02:34:42', '2025-11-16 02:34:42'),
(219, 'App\\Models\\Customer', 27, 'API Token', '20a3b04bc5df7085cd26adb15b614af2468d7f99a4223d1dce8e13dcbf3eed4c', '[\"*\"]', '2025-11-16 04:59:47', NULL, '2025-11-16 04:58:51', '2025-11-16 04:59:47'),
(276, 'App\\Models\\Customer', 33, 'API Token', '4f0784ca7138545ef8a6f4f90e1a7d2d7789d1f645a019eed78fd34a18f7e10a', '[\"*\"]', '2025-11-27 17:40:20', NULL, '2025-11-27 17:39:52', '2025-11-27 17:40:20');

-- --------------------------------------------------------

--
-- Table structure for table `pickup_shipping_methods`
--

CREATE TABLE `pickup_shipping_methods` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `map_location` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `cost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pickup_shipping_methods`
--

INSERT INTO `pickup_shipping_methods` (`id`, `name`, `store_name`, `address`, `map_location`, `phone`, `email`, `cost`, `status`, `created_at`, `updated_at`) VALUES
(4, 'pickup', 'Raymond Kirk', 'Fuga Officia dolore', 'Eiusmod quasi corpor', '+1 (809) 186-2999', 'wuzo@mailinator.com', 0.00, 1, '2025-11-11 06:34:52', '2025-11-12 05:24:18'),
(10, 'pickup', 'Raymond Kirk', 'Fuga Officia dolore', 'Eiusmod quasi corpor', '+1 (809) 186-2999', 'wuzo@mailinator.com', 0.00, 1, '2025-11-11 06:39:26', '2025-11-11 06:45:24');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `thumb_image` text NOT NULL,
  `img_alt_text` varchar(255) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `child_category_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `short_description` text NOT NULL,
  `long_description` text NOT NULL,
  `video_link` text DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `product_code` varchar(255) DEFAULT NULL,
  `purchase_price` int(11) DEFAULT NULL,
  `price` double NOT NULL,
  `offer_price` double DEFAULT NULL,
  `offer_start_date` datetime DEFAULT NULL,
  `offer_end_date` datetime DEFAULT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `is_approved` int(11) NOT NULL DEFAULT 0,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `thumb_image`, `img_alt_text`, `category_id`, `sub_category_id`, `child_category_id`, `brand_id`, `qty`, `short_description`, `long_description`, `video_link`, `sku`, `product_code`, `purchase_price`, `price`, `offer_price`, `offer_start_date`, `offer_end_date`, `product_type`, `status`, `is_approved`, `created_by`, `updated_by`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
(20, 'Logan allen', 'logan-allen', 'uploads/products/1847761581611157.webp', NULL, 6, NULL, NULL, 1, 42, 'Stay cozy and stylish with our premium hoodie — soft, durable, and perfect for everyday wear.', '<p>Our classic hoodie blends comfort and style in one essential piece. Made from ultra-soft cotton fleece, it offers warmth without bulk and a relaxed fit that suits any occasion. Featuring a front kangaroo pocket, adjustable drawstrings, and durable stitching, this hoodie is your go-to for casual outings, workouts, or lounging in style.</p>', NULL, 'HY-11202', 'P0001', 800, 120, NULL, NULL, NULL, 'new_arrival', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 14:39:23', '2025-11-27 17:40:00'),
(21, 'Sunflower Cat Pouch Bag', 'sunflower-cat-pouch-bag', 'uploads/products/media_692be00dcc49c.webp', NULL, 4, NULL, NULL, NULL, 15, 'Compact, clean, and crafted for your daily essentials.', '<p>The PocketEase Pouch keeps your small items organized in style. Made from durable material with a smooth zip closure, it’s ideal for holding coins, cards, or makeup — perfect for on-the-go convenience.</p>', NULL, 'sk-1001', 'P0021', 150, 220, NULL, NULL, NULL, 'best_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 15:57:40', '2025-11-30 11:11:25'),
(22, 'Cat Flower Vase Pouch Bag', 'cat-flower-vase-pouch-bag', 'uploads/products/media_692be7de9681f.jpg', NULL, 4, NULL, NULL, NULL, 10, 'Simple, secure, and easy to carry anywhere.', '<p data-start=\"912\" data-end=\"1133\">Designed for everyday use, the ZipMate Pouch offers a minimalist look with maximum utility. Its soft yet sturdy fabric keeps your essentials safe and organized, whether in your bag or on its own.</p>', NULL, 'sk-102', 'P0022', 70, 120, NULL, NULL, NULL, 'featured_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 15:59:59', '2025-11-30 11:44:46'),
(23, 'Leaf Face Pouch Bag', 'leaf-face-pouch-bag', 'uploads/products/media_692bec161ec11.webp', NULL, 4, NULL, NULL, NULL, 11, 'Your essentials, neatly packed and easy to reach.', '<p>Keep it simple and stylish with the SnapCarry Pouch. Designed with a secure snap closure and soft inner lining, it’s perfect for storing makeup, cards, or earbuds — a must-have inside every bag.</p>', NULL, 'sk-103', 'P0023', 12, 55, NULL, NULL, NULL, 'featured_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 16:01:29', '2025-11-30 12:02:46'),
(24, 'Flower Pouch Bag', 'flower-pouch-bag', 'uploads/products/media_692be9f216457.webp', NULL, 4, NULL, NULL, NULL, 15, 'Soft, simple, and ready to go wherever you do.', '<p data-start=\"1329\" data-end=\"1556\">Lightweight and functional, the CloudZip Mini Pouch offers just enough room for your everyday must-haves. Its cloud-soft texture and clean design make it perfect for minimalists who love a modern look.</p>', NULL, 'sk-105', 'P0024', 25, 80, NULL, NULL, NULL, 'best_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 16:02:38', '2025-11-30 11:53:38'),
(25, 'Sunflower Cat Mini Bag', 'sunflower-cat-mini-bag', 'uploads/products/media_692bc3364ba21.webp', NULL, 3, NULL, NULL, NULL, 15, 'Small in size, big on style.', '<p data-start=\"592\" data-end=\"803\">The MiniChic Bag adds a trendy touch to any look. Featuring a sleek design, adjustable strap, and secure zip pocket, it’s perfect for carrying your phone, cash, and keys — day or night.</p>', NULL, 'sk-106', 'P0025', 57, 80, NULL, NULL, NULL, 'featured_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 16:05:20', '2025-11-30 09:08:22'),
(26, 'TinyTote Mini Bag', 'tinytote-mini-bag', 'uploads/products/media_692bbfd2056e2.webp', NULL, 3, NULL, NULL, NULL, 24, 'Cute, convenient, and effortlessly chic.', '<p data-start=\"1243\" data-end=\"1454\">The TinyTote Mini Bag brings function and fashion together. With its mini handle design and roomy interior for small must-haves, it’s perfect for quick errands, parties, or travel days.</p>', NULL, 'sk-123', 'P0026', 20, 150, NULL, NULL, NULL, 'featured_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 16:16:58', '2025-11-30 08:53:54'),
(27, 'Cats Mini bag', 'cats-mini-bag', 'uploads/products/media_692b46034228c.webp', NULL, 3, NULL, NULL, NULL, 4, 'Compact. Lightweight. Effortlessly stylish.', '<p data-start=\"1380\" data-end=\"1611\">The CloudCarry Mini Pack is perfect for those who travel light. With minimalist design and smooth zippers, it holds just what you need — phone, wallet, and keys — while adding a modern touch to any outfit.</p>', NULL, 'sk-208', 'P0027', 10, 50, NULL, NULL, NULL, 'featured_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 16:18:34', '2025-11-30 00:14:11'),
(28, 'Big bags flower style', 'big-bags-flower-style', 'uploads/products/media_692a5b76a8dfe.jpg', NULL, 2, NULL, NULL, NULL, 10, 'Your go-to everyday tote — sleek, spacious, and built for life on the move.', '<p data-start=\"272\" data-end=\"550\">The UrbanEase Tote combines modern design with daily practicality. Crafted from durable canvas and finished with reinforced handles, it offers plenty of room for essentials, laptops, or gym gear. Perfect for commutes, shopping trips, or casual outings.</p>', NULL, '578', 'P0028', 15, 120, NULL, NULL, NULL, 'top_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 16:22:17', '2025-11-29 07:33:26'),
(29, 'New Mini Tote Bag', 'new-mini-tote-bag', 'uploads/products/media_692bc1555ca07.webp', NULL, 3, NULL, NULL, NULL, 12, 'Adventure-ready comfort meets smart storage.', '<p data-start=\"665\" data-end=\"911\">Designed for explorers, the TrailFlex Backpack features multiple compartments, padded straps, and a water-resistant exterior. Whether for travel, school, or outdoor adventures, it keeps your gear organized and protected.</p>', NULL, 'sk-809', 'P0029', 50, 150, NULL, NULL, NULL, 'featured_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 16:23:33', '2025-11-30 09:00:55'),
(30, 'T-Shirts - Blue', 't-shirts-blue', 'uploads/products/media_692bee3b09c2a.jpg', NULL, 7, NULL, NULL, NULL, 7, 'Adventure-ready comfort meets smart storage.', '<p data-start=\"665\" data-end=\"911\">Designed for explorers, the TrailFlex Backpack features multiple compartments, padded straps, and a water-resistant exterior. Whether for travel, school, or outdoor adventures, it keeps your gear organized and protected.</p>', NULL, 'fsa', 'P0030', 10, 55, NULL, NULL, NULL, 'best_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 16:32:49', '2025-11-30 12:11:55'),
(31, 'Custom Next Level Tri-Blend T-Shirt', 'custom-next-level-tri-blend-t-shirt', 'uploads/products/media_692bf996c9e0f.jpg', NULL, 7, 4, NULL, NULL, 12, 'Adventure-ready comfort meets smart storage.', '<p data-start=\"665\" data-end=\"911\">Designed for explorers, the TrailFlex Backpack features multiple compartments, padded straps, and a water-resistant exterior. Whether for travel, school, or outdoor adventures, it keeps your gear organized and protected.</p>', NULL, 'vsdsdf', 'P0031', 10, 50, NULL, NULL, NULL, 'best_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 16:34:31', '2025-11-30 13:00:22'),
(32, 'Premium Lycra Cotton Round Neck T-Shirt', 'premium-lycra-cotton-round-neck-t-shirt', 'uploads/products/media_692bf7d92a0eb.jpg', NULL, 7, NULL, NULL, NULL, 22, 'Lightweight and functional.', '<p data-start=\"1329\" data-end=\"1556\">Lightweight and functional, the CloudZip Mini Pouch offers just enough room for your everyday must-haves. Its cloud-soft texture and clean design make it perfect for minimalists who love a modern look.</p>', NULL, 'sk-1038', 'P0032', 20, 80, NULL, NULL, NULL, 'new_arrival', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 17:10:19', '2025-11-30 13:01:35'),
(33, 'Classic Fit T-Shirt', 'classic-fit-t-shirt', 'uploads/products/media_692bf67669a3f.jpg', NULL, 7, NULL, NULL, NULL, 5, 'Soft, comfortable, and perfect for everyday style.', '<p data-start=\"238\" data-end=\"556\">Our classic T-shirt is designed for comfort and versatility. Made from premium, breathable cotton, it offers a relaxed fit that moves with you. With durable stitching and a smooth finish, it’s ideal for casual outings, layering, or lounging in style. Available in multiple colors to match your wardrobe effortlessly.</p>', NULL, 'sk-089', 'P0033', 22, 60, 40, NULL, NULL, 'new_arrival', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 17:19:22', '2025-11-30 13:02:15'),
(36, 'Copenhagen Big bag', 'copenhagen-big-bag', 'uploads/products/media_692a80b82aa8e.jpg', NULL, 2, NULL, NULL, NULL, 55, 'Copenhagen Big bag', '<p>Copenhagen Big bag&nbsp;Copenhagen Big bag</p>', NULL, 'sk-034', 'P0036', 500, 800, NULL, NULL, NULL, 'featured_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 17:27:42', '2025-11-29 10:12:24'),
(37, 'Mens Premium Hoodie Sweatshirt', 'mens-premium-hoodie-sweatshirt', 'uploads/products/media_692b3fd43e84f.webp', NULL, 6, NULL, NULL, NULL, 11, 'Our classic T-shirt is designed for comfort and versatility.', '<p data-start=\"238\" data-end=\"556\">Our classic T-shirt is designed for comfort and versatility. Made from premium, breathable cotton, it offers a relaxed fit that moves with you. With durable stitching and a smooth finish, it’s ideal for casual outings, layering, or lounging in style. Available in multiple colors to match your wardrobe effortlessly.</p>', NULL, 'sdfsdf', 'P0037', 350, 500, NULL, NULL, NULL, 'best_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 17:58:32', '2025-11-29 23:49:17'),
(38, 'Cotton Full Sleeve Hoodie', 'cotton-full-sleeve-hoodie', 'uploads/products/media_692b42139db85.webp', NULL, 6, NULL, NULL, NULL, 29, 'Our classic T-shirt is designed for comfort and versatility. Made from premium, breathable cotton, it offers a relaxed fit that moves with you. With durable stitching and a smooth finish, it’s ideal for casual outings, layering, or lounging in style. Available in multiple colors to match your wardrobe effortlessly.', '<p data-start=\"238\" data-end=\"556\">Our classic T-shirt is designed for comfort and versatility. Made from premium, breathable cotton, it offers a relaxed fit that moves with you. With durable stitching and a smooth finish, it’s ideal for casual outings, layering, or lounging in style. Available in multiple colors to match your wardrobe effortlessly.</p>', NULL, 'sdfsd', 'P0038', 223, 500, NULL, NULL, NULL, 'featured_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 18:00:31', '2025-11-29 23:57:23'),
(39, 'Men\'s Premium Hoodie', 'mens-premium-hoodie', 'uploads/products/media_692b3c63b030e.webp', NULL, 6, NULL, NULL, NULL, 16, 'Our classic T-shirt is designed for comfort and versatility. Made from premium.', '<p data-start=\"238\" data-end=\"556\">Our classic T-shirt is designed for comfort and versatility. Made from premium, breathable cotton, it offers a relaxed fit that moves with you. With durable stitching and a smooth finish, it’s ideal for casual outings, layering, or lounging in style. Available in multiple colors to match your wardrobe effortlessly.</p>', NULL, 'sdfsdf', 'P0039', 555, 1050, 1000, NULL, NULL, 'best_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-03 18:09:47', '2025-11-29 23:33:07'),
(40, 'Big Bag Cats style', 'big-bag-cats-style', 'uploads/products/media_692a904fae059.jpg', NULL, 2, NULL, NULL, 1, 23, 'Big Bag Cats style', '<p>Big Bag Cats style</p>', NULL, 'fdfd', 'P0040', NULL, 34, NULL, NULL, NULL, 'new_arrival', 1, 1, 1, NULL, NULL, NULL, '2025-11-18 00:28:23', '2025-11-29 11:18:55'),
(41, 'Black stylish Hoodie', 'black-stylish-hoodie', 'uploads/products/media_692b39f6600a8.jpg', NULL, 6, NULL, NULL, 1, 50, 'Black stylish Hoodie', '<p>Black stylish Hoodie</p>', 'Quis sit aliqua Au', 'hoodie1', 'P0041', NULL, 550, NULL, '2008-09-23 07:41:00', '1989-11-22 17:16:00', 'best_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-25 04:24:47', '2025-11-29 23:22:46'),
(45, 'Mallory Richardson', 'mallory-richardson', 'uploads/products/1849765166878536.webp', NULL, 5, NULL, NULL, NULL, 284, 'Repellendus Omnis d', '<p>Repellendus Omnis d</p>', 'In voluptatibus alia', 'Et enim anim necessi', 'P0045', NULL, 141, 212, '2018-09-25 20:57:00', '1986-03-21 14:16:00', NULL, 1, 1, 1, NULL, 'Omnis quisquam ut ea', 'Ea ea vitae reprehen', '2025-11-25 06:25:31', '2025-11-25 06:25:31'),
(46, 'New Tote Bag Stylish', 'new-tote-bag-stylish', 'uploads/products/media_692a58c749860.jpg', NULL, 2, NULL, NULL, NULL, 5, 'New Tote Bag Stylish', '<p>New Tote Bag Stylish New Tote Bag StylishNew Tote Bag Stylish New Tote Bag StylishNew Tote Bag Stylish New Tote Bag StylishNew Tote Bag Stylish New Tote Bag Stylish</p>', NULL, 'tbfh23', 'P0046', 350, 460, NULL, NULL, NULL, 'featured_product', 1, 1, 1, NULL, NULL, NULL, '2025-11-26 19:11:30', '2025-11-30 16:33:01');

-- --------------------------------------------------------

--
-- Table structure for table `product_colors`
--

CREATE TABLE `product_colors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `color_id` bigint(20) UNSIGNED NOT NULL,
  `color_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_customizations`
--

CREATE TABLE `product_customizations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `is_customizable` tinyint(1) NOT NULL DEFAULT 0,
  `front_image` varchar(255) DEFAULT NULL,
  `back_image` varchar(255) DEFAULT NULL,
  `front_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `back_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `both_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_customizations`
--

INSERT INTO `product_customizations` (`id`, `product_id`, `is_customizable`, `front_image`, `back_image`, `front_price`, `back_price`, `both_price`, `created_at`, `updated_at`) VALUES
(10, 20, 1, 'uploads/customize/1847761581779608.webp', 'uploads/customize/media_692a806cf2c4b.png', 2.00, 2.00, 5.00, '2025-11-03 14:39:23', '2025-11-29 10:11:08'),
(11, 21, 1, 'uploads/customize/media_692be00dce188.webp', 'uploads/customize/media_692be00dce3db.webp', 0.00, 2.00, 0.00, '2025-11-03 15:58:33', '2025-11-30 11:11:25'),
(12, 28, 1, 'uploads/customize/1850090304748533.jpg', 'uploads/customize/1850090304849568.jpg', 0.00, 2.00, 0.00, '2025-11-03 18:17:40', '2025-11-29 07:33:26'),
(13, 40, 1, 'uploads/customize/media_692a904fb1daf.jpg', 'uploads/customize/media_692a904fb2237.jpg', 0.00, 2.00, 0.00, '2025-11-18 01:41:55', '2025-11-29 11:18:55'),
(14, 46, 1, 'uploads/customize/1850089583998113.jpg', 'uploads/customize/1850089584089917.jpg', 0.00, 2.00, 0.00, '2025-11-26 19:11:31', '2025-11-29 07:21:59'),
(15, 36, 1, 'uploads/customize/media_692a80b82cb23.jpg', 'uploads/customize/media_692a80b82ceac.jpg', 0.00, 2.00, 0.00, '2025-11-29 10:12:24', '2025-11-29 10:12:24'),
(16, 41, 1, 'uploads/customize/media_692b39f6666fa.jpg', 'uploads/customize/media_692b39f666aa6.jpg', 2.00, 2.00, 4.00, '2025-11-29 23:22:46', '2025-11-29 23:22:46'),
(17, 39, 1, 'uploads/customize/media_692b3c63b360d.webp', 'uploads/customize/media_692b3c63b37e4.webp', 2.00, 2.00, 4.00, '2025-11-29 23:33:07', '2025-11-29 23:33:07'),
(18, 37, 1, 'uploads/customize/media_692b3fd4440d2.webp', 'uploads/customize/media_692b3fd444296.webp', 2.00, 2.00, 4.00, '2025-11-29 23:47:48', '2025-11-29 23:47:48'),
(19, 38, 1, 'uploads/customize/media_692b4213a2148.webp', 'uploads/customize/media_692b4213a22e3.webp', 2.00, 2.00, 4.00, '2025-11-29 23:57:23', '2025-11-29 23:57:23'),
(20, 27, 1, 'uploads/customize/media_692b460346644.webp', 'uploads/customize/media_692b4603467e5.webp', 0.00, 2.00, 0.00, '2025-11-30 00:14:11', '2025-11-30 00:14:11'),
(21, 26, 1, 'uploads/customize/media_692bbfd207f65.webp', 'uploads/customize/media_692bbfd208511.webp', 0.00, 2.00, 0.00, '2025-11-30 08:53:54', '2025-11-30 08:53:54'),
(22, 29, 1, 'uploads/customize/media_692bc155615a0.webp', 'uploads/customize/media_692bc15561800.webp', 0.00, 2.00, 0.00, '2025-11-30 09:00:21', '2025-11-30 09:00:21'),
(23, 25, 1, 'uploads/customize/media_692bc3364f006.webp', 'uploads/customize/media_692bc3364f1de.webp', 0.00, 2.00, 0.00, '2025-11-30 09:08:22', '2025-11-30 09:08:22'),
(24, 22, 1, 'uploads/customize/media_692be7de991d3.jpg', 'uploads/customize/media_692be7de9957f.jpg', 0.00, 2.00, 0.00, '2025-11-30 11:44:46', '2025-11-30 11:44:46'),
(25, 24, 1, 'uploads/customize/media_692be9f21a50a.webp', 'uploads/customize/media_692be9f21a6e9.webp', 0.00, 2.00, 0.00, '2025-11-30 11:53:38', '2025-11-30 11:53:38'),
(26, 23, 1, 'uploads/customize/media_692bec162380a.webp', 'uploads/customize/media_692bec16239e8.webp', 0.00, 2.00, 0.00, '2025-11-30 12:02:46', '2025-11-30 12:02:46'),
(27, 30, 1, 'uploads/customize/media_692bee3b0d22a.jpg', 'uploads/customize/media_692bee3b0d4a7.jpg', 2.00, 2.00, 4.00, '2025-11-30 12:11:55', '2025-11-30 12:11:55'),
(28, 33, 1, 'uploads/customize/media_692bf6766b990.jpg', 'uploads/customize/media_692bf6766bb85.jpg', 2.00, 2.00, 4.00, '2025-11-30 12:47:02', '2025-11-30 12:47:02'),
(29, 32, 1, 'uploads/customize/media_692bf7d92d2a3.jpg', 'uploads/customize/media_692bf7d92d497.jpg', 2.00, 2.00, 4.00, '2025-11-30 12:52:57', '2025-11-30 12:52:57'),
(30, 31, 1, 'uploads/customize/media_692bf996cdcf4.jpg', 'uploads/customize/media_692bf996ce1f5.jpg', 2.00, 2.00, 4.00, '2025-11-30 13:00:22', '2025-11-30 13:00:22');

-- --------------------------------------------------------

--
-- Table structure for table `product_image_galleries`
--

CREATE TABLE `product_image_galleries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `color_id` int(11) DEFAULT NULL,
  `image` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_image_galleries`
--

INSERT INTO `product_image_galleries` (`id`, `product_id`, `color_id`, `image`, `created_at`, `updated_at`) VALUES
(36, 45, 3, 'uploads/image-gallery/1849765167224085.webp', '2025-11-25 06:25:31', '2025-11-25 06:25:31'),
(42, 20, 1, 'uploads/image-gallery/media_692a834d4baa2.jpg', '2025-11-29 10:23:25', '2025-11-29 10:23:25');

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review` varchar(255) NOT NULL,
  `rating` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_reviews`
--

INSERT INTO `product_reviews` (`id`, `product_id`, `user_id`, `review`, `rating`, `status`, `created_at`, `updated_at`) VALUES
(1, 11, 6, '\"This is a test review from API 33\"', '3', 1, '2025-10-22 02:00:30', '2025-10-22 02:00:30'),
(2, 11, 6, '\"I use this tote for work and grocery runs. It’s sturdy, roomy, and still looks stylish with every outfit. Totally worth it!\"', '5', 1, '2025-10-22 02:01:01', '2025-10-22 02:01:01'),
(3, 11, 6, '\"best products ever\"', '5', 1, '2025-10-22 02:01:19', '2025-10-22 02:01:19'),
(4, 11, 6, '\"best products ever\"', '5', 1, '2025-10-22 02:03:05', '2025-10-22 02:03:05'),
(5, 11, 1, '\"This is a test review from API 33\"', '5', 1, '2025-10-22 02:07:21', '2025-10-22 02:11:47'),
(6, 11, 6, 'sdfgsdfg', '5', 1, '2025-10-22 06:23:46', '2025-10-22 06:24:44'),
(7, 11, 6, 'কি রে ভাই এটা কি কাজ করতেছে তাহলে?', '5', 1, '2025-10-22 06:24:14', '2025-10-22 06:24:45'),
(8, 4, 6, 'asdfasdf', '5', 1, '2025-10-22 23:24:42', '2025-10-24 22:18:21'),
(9, 7, 6, 'Adenay gay product is good', '5', 1, '2025-10-24 21:54:53', '2025-10-24 22:18:13'),
(10, 22, 27, '৫১১২৫৬', '5', 0, '2025-11-12 21:54:55', '2025-11-12 21:54:55'),
(11, 31, 31, 'asdfs', '5', 0, '2025-11-16 00:02:57', '2025-11-16 00:02:57');

-- --------------------------------------------------------

--
-- Table structure for table `product_shippings`
--

CREATE TABLE `product_shippings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `shipping_method_id` bigint(20) UNSIGNED NOT NULL,
  `charge` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_sizes`
--

CREATE TABLE `product_sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `size_id` bigint(20) UNSIGNED NOT NULL,
  `size_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variant_items`
--

CREATE TABLE `product_variant_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` enum('free_shipping','free_product') NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `buy_quantity` int(11) NOT NULL DEFAULT 0,
  `get_quantity` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `allow_coupon_stack` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promotions`
--

INSERT INTO `promotions` (`id`, `title`, `type`, `category_id`, `product_id`, `buy_quantity`, `get_quantity`, `start_date`, `end_date`, `allow_coupon_stack`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Buy 3 Get 1 Free', 'free_product', NULL, NULL, 3, 1, '2025-10-25 15:52:00', '2025-10-25 15:52:00', 0, 1, '2025-10-15 11:13:35', '2025-10-25 03:40:04');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'SuperAdmin', 'web', '2025-10-15 10:37:03', '2025-10-15 10:37:03'),
(2, 'Accountants', 'web', '2025-10-15 10:37:03', '2025-10-15 10:37:03'),
(3, 'Customer', 'sanctum', '2025-10-15 10:37:03', '2025-10-15 10:37:03'),
(4, 'Manager', 'web', '2025-10-15 10:37:03', '2025-10-15 10:37:03'),
(8, 'Employee', 'web', '2025-11-08 22:25:41', '2025-11-09 01:12:25');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(2, 2),
(3, 2),
(4, 2),
(2, 4),
(3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('4qvjQ18hALoQXCSYg3eObT7ba2sa4RwnuBsw6DRL', NULL, '37.96.113.5', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/137.0.7151.51 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiemRMRU15cmVXc09KN1ZjSmhvRDhLcHVTcmp2QjZ4cktTcTdGQU82QSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764574050),
('5VJQ037gGCFTK1zgh8RxQ9QN4TyU41kJVIpFhDQR', NULL, '103.88.141.53', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNnZQcmpiUkdRNUhPWVRTcEpPdTREVHAzdmIxU3FzdkU4VkIySXJFSCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764588425),
('JMb1MhSBrh8rLB4YEEHVDS57eh1MUHaQoJCoG2Rh', NULL, '103.88.141.53', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOVN1R21GREZGaW9XTkFoblZHcnlNWDkxMEU5cFZOWnpsOXpBaHF2eiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764588340),
('kXzaCPge3PAbVinQxU1SuCzcIQjKjpcn0ktO9NZc', NULL, '188.120.85.2', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVEJWbFVLaDAyWUplMm1ickw2aUtlNlBVbUJQZWxJcHVpT2E4b29mbCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764589599),
('L3NJUYN23OQLZHrs1bW1Vg5C8l1dPBrbd07Dy6mt', NULL, '198.235.24.50', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibmxpejRQOGV4SEIwdmRyRTg5aWU2MlNVNnBxS1p5ZGNWRzA1dWpLQiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764575325),
('lj15SPt4N8DjlJklrNKu6GbuPJbt0XsXOl6ha4PN', NULL, '103.88.141.53', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR2Z1bGp2SXdNYUJxZjFWekt0OU1BQUY2S3d4YWpPWEt2bzhIcGVBUiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764565219),
('mSukuq5VfPFGmCCZRsIcuf9REUWiBDqtwPsvNdrO', NULL, '188.120.85.2', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNnVYWWJERzdyeTJxN2c4d0twaGtYS3VWQ1RTZ21FWFpodVJvRXZUNCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764579656),
('QbBWOY4k0cb0baj2gwCREwrDaqBni9FHtpMOK4n2', NULL, '34.38.106.200', 'python-requests/2.32.5', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiczZTZW40Z01oUEloaHJxeXRnOGFSeFZSYVM0bGVIYWV1TEdBWnB5VyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764583021),
('R0kXE5ubNIixFgQNqFDvwwN6EzcyCIss4LIQzdUH', NULL, '37.96.113.5', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/137.0.7151.51 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTFFHOUp3SzllVEFsdlNLaHBQZVRSc25zVkMyVndRb1JZWG9NM1VQZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NzE6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kay9wcm9kdWN0L2NhdC1mbG93ZXItdmFzZS1wb3VjaC1iYWcvY3VzdG9taXplIjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1764596791),
('rhIEw3xmptA06vzuL5AbzpU2cmTmz40JprXPOERi', NULL, '103.88.141.53', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNFB6bVF4Wmp0Nnd2QkpMWXZ1c3NUb09WM0hlbm9UOEVacTNZcWc5ZCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764588351),
('vQnVCB7mohTLabhY7hMOvTnejpucJN0rgkRq2xeG', NULL, '109.59.106.52', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTlB3VzU2STdONElKSXZSanVrTWdSV25OTVM0Z3FGWFp1aGpCYjRVUCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764605802),
('YmyLSLjwDDpj2jS9M4ed0dI3fxhJhq6r9nOn4Dnz', NULL, '109.58.95.173', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQzRURGpvUkh1UjIyUlZubldMZFJ3MWlIYjFJdWRvZjFlR0o4VTNudSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764597515),
('zwCy7DpapWbjViqxUzAenhAC2HjdaUx5OtA29YDd', NULL, '103.88.141.53', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.67', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV2FpanloMElrNUI2clZIU09ya3lrWWxVclMweFFzdTlLTjUzTm1YZCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vdGVzdC5oeWdnZWNvdHRvbi5kayI7czo1OiJyb3V0ZSI7czo3OiJ3ZWxjb21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764588376);

-- --------------------------------------------------------

--
-- Table structure for table `shipping_charges`
--

CREATE TABLE `shipping_charges` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shipping_method_id` bigint(20) UNSIGNED NOT NULL,
  `country_id` bigint(20) UNSIGNED NOT NULL,
  `state_id` bigint(20) UNSIGNED DEFAULT NULL,
  `base_charge` decimal(10,2) NOT NULL,
  `extra_per_kg` decimal(10,2) DEFAULT NULL,
  `min_weight` decimal(8,2) NOT NULL,
  `max_weight` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_methods`
--

CREATE TABLE `shipping_methods` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`type`)),
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_rules`
--

CREATE TABLE `shipping_rules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `min_cost` double DEFAULT NULL,
  `cost` double NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shipping_rules`
--

INSERT INTO `shipping_rules` (`id`, `name`, `type`, `min_cost`, `cost`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Express Delivery 1-2 day', 'flat_cost', NULL, 200, 1, '2025-10-15 10:56:51', '2025-10-15 10:56:51'),
(2, 'Free Delivery', 'flat_cost', NULL, 0, 1, '2025-10-15 11:14:04', '2025-11-12 23:29:48');

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `size_name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `size_name`, `status`, `price`, `is_default`, `created_at`, `updated_at`) VALUES
(1, 'sm', 1, 0.00, 0, '2025-10-16 07:08:48', '2025-10-18 09:40:31'),
(2, 's', 1, 0.00, NULL, '2025-10-18 09:40:28', '2025-10-18 09:40:28'),
(3, 'L', 1, 0.00, NULL, '2025-10-25 06:03:43', '2025-10-25 06:03:43'),
(4, 'XL', 1, 0.00, NULL, '2025-10-25 06:03:52', '2025-10-25 06:03:52'),
(5, 'XXL', 1, 0.00, NULL, '2025-10-25 06:03:58', '2025-10-25 06:03:58');

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `banner` text DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `starting_price` varchar(255) DEFAULT NULL,
  `btn_url` varchar(255) DEFAULT NULL,
  `serial` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `banner`, `type`, `title`, `starting_price`, `btn_url`, `serial`, `status`, `created_at`, `updated_at`) VALUES
(1, 'uploads/slider/media_68f87a16f3cbb.png', '“Where Craft Meets Elegance”', 'Handcrafted with precision and timeless detail. Luxury materials meet modern minimalism.', NULL, 'https://test.hyggecotton.dk/product-details/urbanease', 1, 1, '2025-10-22 00:30:47', '2025-11-14 23:40:21');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `category_id`, `name`, `slug`, `meta_title`, `meta_description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'fdd', 'fdd', NULL, NULL, 0, '2025-10-23 02:52:25', '2025-11-18 00:05:17'),
(2, 1, 'Item 1', 'item-1', NULL, NULL, 0, '2025-10-23 06:28:19', '2025-11-18 00:05:18'),
(3, 1, 'Item Two', 'item-two', NULL, NULL, 0, '2025-10-23 06:28:30', '2025-11-18 00:05:19'),
(4, 7, 'Men t-shirt', 'men-t-shirt', NULL, NULL, 0, '2025-10-23 06:28:40', '2025-11-18 00:05:20'),
(6, 1, 'fddfdf', 'fddfdf', NULL, NULL, 0, '2025-11-18 00:05:33', '2025-11-18 00:05:33');

-- --------------------------------------------------------

--
-- Table structure for table `terms_and_conditions`
--

CREATE TABLE `terms_and_conditions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `terms_and_conditions`
--

INSERT INTO `terms_and_conditions` (`id`, `content`, `created_at`, `updated_at`) VALUES
(1, '<p><span style=\"font-family: Manrope, sans-serif; font-size: 20.25px; text-align: center; background-color: rgb(255, 255, 255);\"><b style=\"\">The page you\'re looking for isn\'t here. It might have been moved or deleted.&nbsp;</b></span></p>', '2025-10-16 12:12:32', '2025-11-17 23:58:07');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` int(11) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `amount` double NOT NULL,
  `amount_real_currency` double NOT NULL,
  `amount_real_currency_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `order_id`, `transaction_id`, `payment_method`, `amount`, `amount_real_currency`, `amount_real_currency_name`, `created_at`, `updated_at`) VALUES
(1, 3, 'e4ZZ4qf8IrKc', 'COD', 150, 150, 'USD', '2025-10-15 10:58:25', '2025-10-15 10:58:25'),
(2, 4, 'SoDZXl5UpLws', 'COD', 725, 725, 'USD', '2025-10-15 11:04:52', '2025-10-15 11:04:52'),
(13, 16, 'VCKp876PkQtW', 'COD', 592, 592, 'USD', '2025-10-21 04:18:30', '2025-10-21 04:18:30'),
(14, 17, 'qKj0LwWiN1NX', 'COD', 575, 575, 'USD', '2025-10-21 05:17:19', '2025-10-21 05:17:19'),
(15, 18, 'RiWr8LVjjnOc', 'COD', 567, 567, 'USD', '2025-10-25 22:06:24', '2025-10-25 22:06:24'),
(16, 19, 'z6KSVsSUjhtt', 'COD', 50, 50, 'USD', '2025-10-25 22:11:22', '2025-10-25 22:11:22'),
(17, 20, 'CARxIeic4kcP', 'COD', 997, 997, 'USD', '2025-10-25 22:28:39', '2025-10-25 22:28:39'),
(18, 21, '4859rz2aY5bz', 'COD', 717, 717, 'USD', '2025-10-25 22:59:24', '2025-10-25 22:59:24'),
(19, 22, 'ctjRk5bYrndK', 'COD', 717, 717, 'USD', '2025-10-25 23:32:40', '2025-10-25 23:32:40'),
(20, 23, 'Jc5rnV9fQhH8', 'COD', 717, 717, 'USD', '2025-10-26 06:17:33', '2025-10-26 06:17:33'),
(21, 24, 'Htijul8iNJ7S', 'COD', 717, 717, 'USD', '2025-10-28 14:09:09', '2025-10-28 14:09:09'),
(22, 25, '2lNoTa5criLU', 'COD', 851, 851, 'USD', '2025-10-28 14:10:08', '2025-10-28 14:10:08'),
(23, 26, 'TlJiOH4ujNaH', 'COD', 651, 651, 'USD', '2025-10-28 14:42:53', '2025-10-28 14:42:53'),
(24, 27, 'Xris1QfTWH0w', 'COD', 948, 948, 'USD', '2025-10-29 09:17:54', '2025-10-29 09:17:54'),
(25, 28, 'tYcfTh19RPy1', 'COD', 717, 717, 'USD', '2025-10-29 14:00:04', '2025-10-29 14:00:04'),
(26, 29, 'nau62bPtgK0d', 'COD', 721, 721, 'USD', '2025-11-01 12:46:24', '2025-11-01 12:46:24'),
(27, 30, 'BIUl84m7qzBl', 'COD', 154, 154, 'USD', '2025-11-03 13:07:54', '2025-11-03 13:07:54'),
(28, 31, '0zx5ibwP21rQ', 'COD', 326, 326, 'USD', '2025-11-03 13:13:25', '2025-11-03 13:13:25'),
(29, 32, 'd5O4wfma2F9e', 'COD', 800, 800, 'USD', '2025-11-03 14:42:26', '2025-11-03 14:42:26'),
(31, 34, 'TAFVvDGDB0mZ', 'COD', 122, 122, 'USD', '2025-11-11 23:08:41', '2025-11-11 23:08:41'),
(37, 40, 'lC9Ww05LyCpL', 'COD', 120, 120, 'USD', '2025-11-12 01:18:08', '2025-11-12 01:18:08'),
(38, 41, 'MvWC0z7gKm5o', 'COD', 320, 320, 'USD', '2025-11-12 21:52:18', '2025-11-12 21:52:18'),
(39, 42, 'k9tDmbGKnaLi', 'COD', 255, 255, 'USD', '2025-11-12 23:24:33', '2025-11-12 23:24:33'),
(40, 43, 'veXAkh8EPaP8', 'COD', 1250, 1250, 'USD', '2025-11-13 00:16:49', '2025-11-13 00:16:49'),
(41, 44, '23Ln4OiGnIqW', 'COD', 500, 500, 'USD', '2025-11-13 02:27:11', '2025-11-13 02:27:11'),
(42, 45, 'R6VtZsF7bMVT', 'COD', 1250, 1250, 'USD', '2025-11-13 02:30:24', '2025-11-13 02:30:24'),
(43, 46, 'vTwrYwSlf0DI', 'COD', 500, 500, 'USD', '2025-11-13 02:35:13', '2025-11-13 02:35:13'),
(44, 47, 'SIoO0k2GFXEs', 'COD', 1250, 1250, 'USD', '2025-11-13 03:02:47', '2025-11-13 03:02:47'),
(45, 48, 'Ha8wcoHdcEiX', 'COD', 320, 320, 'USD', '2025-11-13 03:40:45', '2025-11-13 03:40:45'),
(46, 49, 'X0RoSeOO0qmf', 'COD', 700, 700, 'USD', '2025-11-16 00:03:30', '2025-11-16 00:03:30'),
(47, 50, 'VXhDK3SrKZ71', 'COD', 1500, 1500, 'USD', '2025-11-16 00:16:32', '2025-11-16 00:16:32'),
(48, 51, 'nDwLMnGPEJ7T', 'COD', 1050, 1050, 'USD', '2025-11-16 02:48:33', '2025-11-16 02:48:33'),
(49, 52, 'qQqlJjxf9poW', 'COD', 280, 280, 'USD', '2025-11-16 02:51:20', '2025-11-16 02:51:20'),
(50, 53, '5xfc52SLiFog', 'COD', 80, 80, 'USD', '2025-11-16 02:55:31', '2025-11-16 02:55:31'),
(51, 54, 'Wdq7Vm54MZKJ', 'COD', 250, 250, 'USD', '2025-11-16 03:12:44', '2025-11-16 03:12:44'),
(52, 55, 'ChnruaUIbCRK', 'COD', 560, 560, 'USD', '2025-11-16 04:32:25', '2025-11-16 04:32:25'),
(53, 56, 'gV2ZW9AOGTrv', 'COD', 1750, 1750, 'USD', '2025-11-16 07:55:27', '2025-11-16 07:55:27'),
(54, 57, 'IuIMaGZFoUik', 'COD', 322, 322, 'USD', '2025-11-27 17:40:00', '2025-11-27 17:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `phone`, `image`, `email`, `role_id`, `status`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', NULL, NULL, NULL, 'admin@example.com', 1, 1, '2025-11-10 22:49:48', '$2y$12$cFT8Sw/M9dGHV5BiU3DP0.BurwEsdV/cIR1Z7YczhDKCiVLRWoHBi', NULL, '2025-10-15 10:37:03', '2025-10-15 10:37:03'),
(2, 'Hasan Accountant', NULL, '01193070530', 'uploads/users//media_690ec88c39def.jpg', 'hasan@example.com', 2, 1, NULL, '$2y$12$XaIQ38rOBE3u3B6ed6/W7.8SOYMbQ9J5cFiAYDOLab4OIWAr7wdCG', NULL, '2025-10-15 10:37:03', '2025-11-08 22:07:06'),
(5, 'Fashion', NULL, '01988822228', 'uploads/users/media_690eccacba746.jpg', 'fashion@gmail.com', 2, 1, NULL, '$2y$12$VOxq0pPAE3fRMzhaQlfRQ.uEn0lJdMrCZp2PwBw13M2BykGj//6ui', NULL, '2025-11-07 22:53:01', '2025-11-08 22:07:04'),
(11, 'Employee', NULL, NULL, '/uploads/1138592489_Gildan-18500-male-black-mha31-scaled.jpg', 'test@gmail.com', 8, 1, NULL, '$2y$12$8kpAl3mHoIHIU1CoRUn5s.Me749bS4trRZI02EQ6hxtNV0FqroqsS', NULL, '2025-11-09 01:06:24', '2025-11-09 04:26:16'),
(12, 'an', NULL, NULL, '/uploads/1239714241_Screenshot_1.png', 'another@gmail.com', 8, 1, NULL, '$2y$12$HcLjrFJX1OiFSiaf1nmnS.N3.6jGwRiZBtZfwg8jDZHPngXF35gJe', NULL, '2025-11-09 02:50:46', '2025-11-09 03:53:44');

-- --------------------------------------------------------

--
-- Table structure for table `vipps_payments`
--

CREATE TABLE `vipps_payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL DEFAULT 'WALLET',
  `user_flow` varchar(255) NOT NULL DEFAULT 'WEB_REDIRECT',
  `amount` int(11) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'NOK',
  `status` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `redirect_url` varchar(255) NOT NULL,
  `user_info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`user_info`)),
  `reference` varchar(255) DEFAULT NULL,
  `transaction_info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`transaction_info`)),
  `raw_response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`raw_response`)),
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vipps_recurring_agreements`
--

CREATE TABLE `vipps_recurring_agreements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `agreement_id` varchar(255) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'NOK',
  `price` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `merchant_redirect_url` varchar(255) NOT NULL,
  `merchant_agreement_url` varchar(255) NOT NULL,
  `interval` varchar(255) NOT NULL DEFAULT 'MONTH',
  `interval_count` int(11) NOT NULL DEFAULT 1,
  `is_app` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `user_info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`user_info`)),
  `campaign` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`campaign`)),
  `raw_response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`raw_response`)),
  `start_date` timestamp NULL DEFAULT NULL,
  `stop_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vipps_recurring_charges`
--

CREATE TABLE `vipps_recurring_charges` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `charge_id` varchar(255) NOT NULL,
  `agreement_id` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'NOK',
  `description` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `due_date` timestamp NULL DEFAULT NULL,
  `retry_days` int(11) DEFAULT NULL,
  `raw_response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`raw_response`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vipps_settings`
--

CREATE TABLE `vipps_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `environment` varchar(255) NOT NULL DEFAULT 'test',
  `client_id` varchar(255) DEFAULT NULL,
  `client_secret` varchar(255) DEFAULT NULL,
  `subscription_key` varchar(255) DEFAULT NULL,
  `merchant_serial_number` varchar(255) DEFAULT NULL,
  `webhook_secret` varchar(255) DEFAULT NULL,
  `token_url` varchar(256) DEFAULT NULL,
  `checkout_url` varchar(256) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vipps_settings`
--

INSERT INTO `vipps_settings` (`id`, `active`, `environment`, `client_id`, `client_secret`, `subscription_key`, `merchant_serial_number`, `webhook_secret`, `token_url`, `checkout_url`, `created_at`, `updated_at`) VALUES
(1, 1, 'test', 'AbFXF28It6lTljSaVAFxaM2m4dYMadHSzeweTBTY81C4q5JkiNo6p0LpV1yADMVtdHqK4ryjFXbTIli2', 'Consectetur eius dol', 'Aut cillum et aut re', '418', 'Repellendus Et dolo', 'https://apitest.vipps.no/accessToken/get', 'https://apitest.vipps.no/ecomm/v2/payments', '2025-10-25 01:10:32', '2025-10-25 01:17:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abouts`
--
ALTER TABLE `abouts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attendances_user_id_foreign` (`user_id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_index` (`user_id`),
  ADD KEY `carts_session_id_index` (`session_id`),
  ADD KEY `carts_product_id_index` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `child_categories`
--
ALTER TABLE `child_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cod_settings`
--
ALTER TABLE `cod_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `countries_code_unique` (`code`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `create_pages`
--
ALTER TABLE `create_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_unique` (`email`);

--
-- Indexes for table `customer_addresses`
--
ALTER TABLE `customer_addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_customizations`
--
ALTER TABLE `customer_customizations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_customizations_product_id_foreign` (`product_id`),
  ADD KEY `customer_customizations_user_id_foreign` (`user_id`);

--
-- Indexes for table `email_configurations`
--
ALTER TABLE `email_configurations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employees_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `flash_sales`
--
ALTER TABLE `flash_sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flash_sale_items`
--
ALTER TABLE `flash_sale_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `footer_infos`
--
ALTER TABLE `footer_infos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `footer_socials`
--
ALTER TABLE `footer_socials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `general_settings`
--
ALTER TABLE `general_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logo_settings`
--
ALTER TABLE `logo_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mobile_pay_transactions`
--
ALTER TABLE `mobile_pay_transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile_pay_transactions_order_id_unique` (`order_id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_order_status_id_foreign` (`order_status_id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_statuses`
--
ALTER TABLE `order_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payoneer_settings`
--
ALTER TABLE `payoneer_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paypal_settings`
--
ALTER TABLE `paypal_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `pickup_shipping_methods`
--
ALTER TABLE `pickup_shipping_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_product_code_unique` (`product_code`);

--
-- Indexes for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_colors_product_id_foreign` (`product_id`),
  ADD KEY `product_colors_color_id_foreign` (`color_id`);

--
-- Indexes for table `product_customizations`
--
ALTER TABLE `product_customizations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_customizations_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_image_galleries`
--
ALTER TABLE `product_image_galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_shippings`
--
ALTER TABLE `product_shippings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_shippings_product_id_foreign` (`product_id`),
  ADD KEY `product_shippings_shipping_method_id_foreign` (`shipping_method_id`);

--
-- Indexes for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_sizes_product_id_foreign` (`product_id`),
  ADD KEY `product_sizes_size_id_foreign` (`size_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_variant_items`
--
ALTER TABLE `product_variant_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `shipping_charges`
--
ALTER TABLE `shipping_charges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipping_charges_shipping_method_id_foreign` (`shipping_method_id`),
  ADD KEY `shipping_charges_country_id_foreign` (`country_id`),
  ADD KEY `shipping_charges_state_id_foreign` (`state_id`);

--
-- Indexes for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping_rules`
--
ALTER TABLE `shipping_rules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`),
  ADD KEY `states_country_id_foreign` (`country_id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terms_and_conditions`
--
ALTER TABLE `terms_and_conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vipps_payments`
--
ALTER TABLE `vipps_payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vipps_payments_order_id_unique` (`order_id`),
  ADD KEY `vipps_payments_status_index` (`status`);

--
-- Indexes for table `vipps_recurring_agreements`
--
ALTER TABLE `vipps_recurring_agreements`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vipps_recurring_agreements_agreement_id_unique` (`agreement_id`),
  ADD KEY `vipps_recurring_agreements_status_index` (`status`);

--
-- Indexes for table `vipps_recurring_charges`
--
ALTER TABLE `vipps_recurring_charges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vipps_recurring_charges_charge_id_unique` (`charge_id`),
  ADD KEY `vipps_recurring_charges_agreement_id_index` (`agreement_id`),
  ADD KEY `vipps_recurring_charges_status_index` (`status`);

--
-- Indexes for table `vipps_settings`
--
ALTER TABLE `vipps_settings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `abouts`
--
ALTER TABLE `abouts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=446;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `child_categories`
--
ALTER TABLE `child_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cod_settings`
--
ALTER TABLE `cod_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `create_pages`
--
ALTER TABLE `create_pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `customer_addresses`
--
ALTER TABLE `customer_addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer_customizations`
--
ALTER TABLE `customer_customizations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `email_configurations`
--
ALTER TABLE `email_configurations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flash_sales`
--
ALTER TABLE `flash_sales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flash_sale_items`
--
ALTER TABLE `flash_sale_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `footer_infos`
--
ALTER TABLE `footer_infos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `footer_socials`
--
ALTER TABLE `footer_socials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `general_settings`
--
ALTER TABLE `general_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `logo_settings`
--
ALTER TABLE `logo_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `mobile_pay_transactions`
--
ALTER TABLE `mobile_pay_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `order_statuses`
--
ALTER TABLE `order_statuses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payoneer_settings`
--
ALTER TABLE `payoneer_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `paypal_settings`
--
ALTER TABLE `paypal_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=277;

--
-- AUTO_INCREMENT for table `pickup_shipping_methods`
--
ALTER TABLE `pickup_shipping_methods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `product_customizations`
--
ALTER TABLE `product_customizations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `product_image_galleries`
--
ALTER TABLE `product_image_galleries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `product_shippings`
--
ALTER TABLE `product_shippings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_variant_items`
--
ALTER TABLE `product_variant_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `shipping_charges`
--
ALTER TABLE `shipping_charges`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipping_rules`
--
ALTER TABLE `shipping_rules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `terms_and_conditions`
--
ALTER TABLE `terms_and_conditions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `vipps_payments`
--
ALTER TABLE `vipps_payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vipps_recurring_agreements`
--
ALTER TABLE `vipps_recurring_agreements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vipps_recurring_charges`
--
ALTER TABLE `vipps_recurring_charges`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vipps_settings`
--
ALTER TABLE `vipps_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customer_customizations`
--
ALTER TABLE `customer_customizations`
  ADD CONSTRAINT `customer_customizations_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `customer_customizations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_order_status_id_foreign` FOREIGN KEY (`order_status_id`) REFERENCES `order_statuses` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD CONSTRAINT `product_colors_color_id_foreign` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_colors_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_customizations`
--
ALTER TABLE `product_customizations`
  ADD CONSTRAINT `product_customizations_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_shippings`
--
ALTER TABLE `product_shippings`
  ADD CONSTRAINT `product_shippings_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_shippings_shipping_method_id_foreign` FOREIGN KEY (`shipping_method_id`) REFERENCES `shipping_methods` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_sizes_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shipping_charges`
--
ALTER TABLE `shipping_charges`
  ADD CONSTRAINT `shipping_charges_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shipping_charges_shipping_method_id_foreign` FOREIGN KEY (`shipping_method_id`) REFERENCES `shipping_methods` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shipping_charges_state_id_foreign` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `states`
--
ALTER TABLE `states`
  ADD CONSTRAINT `states_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vipps_recurring_charges`
--
ALTER TABLE `vipps_recurring_charges`
  ADD CONSTRAINT `vipps_recurring_charges_agreement_id_foreign` FOREIGN KEY (`agreement_id`) REFERENCES `vipps_recurring_agreements` (`agreement_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
