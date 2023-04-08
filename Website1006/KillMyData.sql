DROP DATABASE IF EXISTS KillMyData;
CREATE DATABASE IF NOT EXISTS KillMyData;
USE KillMyData;
-- ------------------------------------------------------
-- Table structure for table `user_table`
--
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `user_id`         int(11)       NOT NULL AUTO_INCREMENT,
  `user_name`       varchar(45)   DEFAULT NULL,
  `user_email`      varchar(45)   DEFAULT NULL,
  `user_phone`      varchar(50)   DEFAULT NULL,
  `user_uid`        varchar(45)   DEFAULT NULL,
  `user_role`       varchar(45)   DEFAULT NULL,
  `user_pass`       varchar(100)  DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);
INSERT INTO `user_table` VALUES
(1, "Kyle",   "Kyle101@gmail.com", "0875555555", "Kyle1",   "Admin",  PASSWORD("pass")),
(2, "Scot",   "Scot101@gmail.com", "0874444444", "Scot2",   "Admin",  PASSWORD("pass")),
(3, "Stan",   "Stan183@gmail.com", "0873333333", "Scot3",   "Admin",  PASSWORD("pass"));

-- ------------------------------------------------------
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `customer_id`   int(11)       NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(256)  DEFAULT NULL,
  `customer_email` varchar(256) DEFAULT NULL,
  `customer_number` int(45)     DEFAULT NULL,
  `accounts_link`   varchar(100)  DEFAULT NULL,
  `crm_link`        varchar(100)  DEFAULT NULL,
  `user_id`         int(11)      NOT NULL,
  PRIMARY KEY (`customer_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`)
);

INSERT INTO `customers` VALUES
(1, "Kyle",    "John@gmail.com",    "0871234567",  "Payment Link",   "CRM Managment",1),
(2, "Scot",    "Jane@gmail.com",    "1234567890",  "Payment Link",   "CRM Managment",2),
(3, "Stan",   "Alice@gmail.com",   "9876543215",  "Payment Link",   "CRM Managment",3);

-- ------------------------------------------------------
-- Table structure for table `request_job`
--

DROP TABLE IF EXISTS `request_job`;
CREATE TABLE `request_job` (
  `request_id`             	int(11)          NOT NULL AUTO_INCREMENT,
  `customer_id`            	int(11)          NOT NULL,
  `user_id`       			int(11)          NOT NULL,
  `company_name`           	varchar(256)     DEFAULT NULL,
  `user_phone`      		varchar(50)   	DEFAULT NULL,
  `user_address`         	varchar(256)     DEFAULT NULL,
  `additional_information` 	varchar(256)     DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user_table`(`user_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`)
);

INSERT INTO `request_job` VALUES
(1, 1, 1, "PepeInc", "0877777777", "Pepe Road", "Only have 1 HDD"),
(2, 2, 2, "PepeInc", "0866666666", "Pepe Road", "Only have 2 HDD"),
(3, 3, 3, "PepeInc", "0855555555", "Pepe Road", "Only have 3 HDD");


-- ------------------------------------------------------
-- Table structure for table `accepted_jobs`
--
DROP TABLE IF EXISTS `accepted_jobs`;
CREATE TABLE `accepted_jobs` (
  `job_id` 						int(11)				NOT NULL AUTO_INCREMENT,
  `customer_id` 				int(11)				NOT NULL,
  `job_number` 					varchar(100) 		NOT NULL,
  `job_status` 					varchar(45) 		DEFAULT NULL,
  `job_creation_date` 			datetime 			DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`)
);

INSERT INTO `accepted_jobs` VALUES
(1, 1,		"1A",	"Pending",		"2002-02-10"),
(2, 2,		"1A",	"Pending",		"2002-02-10"),
(3, 3,		"1A",	"Pending",		"2002-02-10");

-- ------------------------------------------------------
-- Table structure for table `Signature Table`
--

DROP TABLE IF EXISTS `signature_table`;
CREATE TABLE `signature_table` (
`signature_id` 				int(11) 		NOT NULL AUTO_INCREMENT,
`job_id` 					int(11) 		NOT NULL,
`customer_id` 				int(11) 		NOT NULL,
`signature_date` 			datetime 		DEFAULT NULL,
PRIMARY KEY (`signature_id`),
FOREIGN KEY (`job_id`) REFERENCES `accepted_jobs`(`job_id`),
FOREIGN KEY (`customer_id`) REFERENCES `Customers`(`customer_id`)
);
INSERT INTO `signature_table` VALUES
(1, 1,	1,	"2023-03-03"),
(2, 2,	2,	"2023-03-04"),
(3, 3,	3,	"2023-03-04");

-- ------------------------------------------------------
-- Table structure for table `batch_table`
--
DROP TABLE IF EXISTS `batch_table`;
CREATE TABLE `batch_table` (
  `batch_id` 				int(11)			AUTO_INCREMENT NOT NULL,
  `job_id` 					int(11)			NOT NULL,
  `batch_number`			varchar(100) 	DEFAULT NULL,
  `seal_barcode_number`		varchar(100) 	DEFAULT NULL,
  `batch_creation_date`		datetime 		DEFAULT NULL,
  PRIMARY KEY (`batch_id`),
  FOREIGN KEY (`job_id`) REFERENCES `accepted_jobs`(`job_id`)
);

INSERT INTO `batch_table` VALUES
(1, 1,		"65451651",	"65451651",	"2023-04-03"),
(2, 2,		"45616515",	"65451651",	"2023-04-04"),
(3, 3,		"82848264",	"65451651",	"2023-04-04");

-- ------------------------------------------------------
-- Table structure for table `collected_harddrives`
--

DROP TABLE IF EXISTS `collected_harddrives`;
CREATE TABLE `collected_harddrives` (
	`collected_harddrives_id` 		int(11)			AUTO_INCREMENT NOT NULL,
	`hdd_serial_number` 			varchar(100)	DEFAULT NULL,
	`batch_id`						int(11) 		NOT NULL,
	`signed_by_customer` 			VARCHAR(100)	DEFAULT NULL,
	`signed_date` 					date 			DEFAULT NULL,
  PRIMARY KEY (`collected_harddrives_id`),
  UNIQUE KEY (`hdd_serial_number`),
  FOREIGN KEY (`batch_id`) REFERENCES `batch_table`(`batch_id`)
);
INSERT INTO `collected_harddrives` VALUES
(1, "4156465",		1,	"Yes",	"2023-03-03"),
(2, "4156665",		2,	"Yes",	"2023-03-04"),
(3, "4156365",		3,	"Yes",	"2023-03-04");

-- ------------------------------------------------------
-- Table structure for table `video_File_table`
--
DROP TABLE IF EXISTS `video_file_table`;
CREATE TABLE `video_file_table` (
`video_id` 				int(11) 		NOT NULL AUTO_INCREMENT,
`job_id` 				int(11) 		NOT NULL,
`batch_id` 				int(11) 		NOT NULL,
`hdd_serial_number` 	varchar(100) 	NOT NULL,
`capture_date` 			datetime 		DEFAULT NULL,
`file_link` 			varchar(100) 	DEFAULT NULL,
PRIMARY KEY (`video_id`),
FOREIGN KEY (`job_id`) REFERENCES `accepted_jobs`(`job_id`),
FOREIGN KEY (`batch_id`) REFERENCES `batch_table`(`batch_id`),
FOREIGN KEY (`hdd_serial_number`) REFERENCES `collected_harddrives`(`hdd_serial_number`)
);
INSERT INTO `video_file_table` VALUES
(1,1,1, "4156465","2023-03-15","Link"),
(2,2,1, "4156465","2023-03-15","Link"),
(3,3,1, "4156465","2023-03-15","Link");


-- ------------------------------------------------------
-- Table structure for table `completed_jobs`
--

DROP TABLE IF EXISTS `completed_jobs`;
CREATE TABLE `completed_jobs` (
  `job_id` 						int(11)			NOT NULL AUTO_INCREMENT,
  `client_name` 				varchar(45)		DEFAULT NULL,
  `date_of_request` 			date 			DEFAULT NULL,
  `date_of_collection` 			date 			DEFAULT NULL,
  `date_of_destruction` 		date 			DEFAULT NULL,
  `certificate_of_destruction` 	varchar(256) 	DEFAULT NULL,
  `status` 						varchar(256) 	DEFAULT NULL,
  `video_link` 					varchar(256) 	DEFAULT NULL,
  `client_id` 					int(45) 		DEFAULT NULL,
  `crm_link` 					varchar(256) 	DEFAULT NULL,
  PRIMARY KEY (`job_id`)
);

INSERT INTO `completed_jobs` VALUES
(1, "Kyle",		"2002-02-10",	"2002-02-10",		"2002-02-10",	"destructionlink",		"Complete",		"videolink", 	"accID",	"CRMlink"),
(2, "Kyle",		"2002-02-10",	"2002-02-10",		"2002-02-10",	"destructionlink",		"Complete",		"videolink", 	"accID",	"CRMlink"),
(3, "Kyle",		"2002-02-10",	"2002-02-10",		"2002-02-10",	"destructionlink",		"Complete",		"videolink", 	"accID",	"CRMlink");