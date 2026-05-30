CREATE TABLE `banners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleHi` varchar(255) NOT NULL,
	`image` varchar(500) NOT NULL,
	`link` varchar(500),
	`description` text,
	`descriptionHi` text,
	`type` enum('hero','promotional','featured') DEFAULT 'promotional',
	`displayOrder` int DEFAULT 0,
	`isActive` boolean DEFAULT true,
	`startDate` timestamp,
	`endDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `banners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blogPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleHi` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`content` longtext,
	`contentHi` longtext,
	`excerpt` varchar(500),
	`excerptHi` varchar(500),
	`image` varchar(500),
	`author` varchar(255),
	`metaTitle` varchar(255),
	`metaDescription` varchar(500),
	`metaKeywords` varchar(500),
	`isPublished` boolean DEFAULT false,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogPosts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`nameHi` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`descriptionHi` text,
	`image` varchar(500),
	`metaTitle` varchar(255),
	`metaDescription` varchar(500),
	`isActive` boolean DEFAULT true,
	`displayOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contactInquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','read','replied','closed') DEFAULT 'new',
	`reply` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contactInquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`address` text,
	`city` varchar(100),
	`state` varchar(100),
	`zipCode` varchar(20),
	`country` varchar(100),
	`totalOrders` int DEFAULT 0,
	`totalSpent` varchar(20) DEFAULT '0',
	`lastOrderDate` timestamp,
	`isSubscribed` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customers_id` PRIMARY KEY(`id`),
	CONSTRAINT `customers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `faqs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` varchar(500) NOT NULL,
	`questionHi` varchar(500) NOT NULL,
	`answer` text,
	`answerHi` text,
	`category` varchar(100),
	`displayOrder` int DEFAULT 0,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `faqs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `homepageSections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sectionType` enum('hero','featured_products','best_sellers','benefits','why_choose_us','reviews','video','blog_preview','faq_preview','contact_cta','whatsapp_order','newsletter','social_feed') NOT NULL,
	`title` varchar(255),
	`titleHi` varchar(255),
	`description` text,
	`descriptionHi` text,
	`content` json,
	`image` varchar(500),
	`displayOrder` int DEFAULT 0,
	`isVisible` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `homepageSections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mediaLibrary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`url` varchar(500) NOT NULL,
	`fileType` varchar(50),
	`fileSize` int,
	`uploadedBy` int,
	`altText` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mediaLibrary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletterSubscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `newsletterSubscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletterSubscriptions_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderNumber` varchar(50) NOT NULL,
	`customerId` int,
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(320),
	`customerPhone` varchar(20) NOT NULL,
	`shippingAddress` text,
	`billingAddress` text,
	`items` json,
	`subtotal` varchar(20) NOT NULL,
	`tax` varchar(20) DEFAULT '0',
	`shipping` varchar(20) DEFAULT '0',
	`total` varchar(20) NOT NULL,
	`status` enum('pending','confirmed','shipped','delivered','cancelled') DEFAULT 'pending',
	`paymentStatus` enum('pending','completed','failed') DEFAULT 'pending',
	`paymentMethod` varchar(50),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_orderNumber_unique` UNIQUE(`orderNumber`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`nameHi` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` longtext,
	`descriptionHi` longtext,
	`shortDescription` varchar(500),
	`shortDescriptionHi` varchar(500),
	`price` varchar(20) NOT NULL,
	`comparePrice` varchar(20),
	`cost` varchar(20),
	`sku` varchar(100) NOT NULL,
	`stock` int DEFAULT 0,
	`weight` varchar(50),
	`dimensions` varchar(100),
	`image` varchar(500),
	`images` json,
	`variants` json,
	`benefits` json,
	`benefitsHi` json,
	`usage` text,
	`usageHi` text,
	`ingredients` text,
	`ingredientsHi` text,
	`metaTitle` varchar(255),
	`metaDescription` varchar(500),
	`metaKeywords` varchar(500),
	`isFeatured` boolean DEFAULT false,
	`isBestSeller` boolean DEFAULT false,
	`isActive` boolean DEFAULT true,
	`displayOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_slug_unique` UNIQUE(`slug`),
	CONSTRAINT `products_sku_unique` UNIQUE(`sku`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`customerId` int,
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(320),
	`rating` int NOT NULL,
	`title` varchar(255),
	`comment` text,
	`isApproved` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(100) NOT NULL,
	`value` longtext,
	`type` enum('string','json','boolean','number') DEFAULT 'string',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `settings_key_unique` UNIQUE(`key`)
);
