DROP DATABASE IF EXISTS hddDestruction;
CREATE DATABASE IF NOT EXISTS hddDestruction;
USE hddDestruction;

-- ------------------------------------------------------
-- Table structure for table `jobs`
--
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `job_id` 						int(11)			NOT NULL AUTO_INCREMENT,
  `client_name` 				varchar(45)		DEFAULT NULL,
  `date_of_request` 			int(45) 		DEFAULT NULL,
  `date_of_collection` 			int(45) 		DEFAULT NULL,
  `date_of_destruction` 		int(45) 		DEFAULT NULL,
  `certificate_of_destruction` 	varchar(256) 	DEFAULT NULL,
  `status` 						varchar(256) 	DEFAULT NULL,
  `video_link` 					varchar(256) 	DEFAULT NULL,
  `client_id` 					int(45) 		DEFAULT NULL,
  `crm_link` 					varchar(256) 	DEFAULT NULL,
  PRIMARY KEY (`job_id`)
);

INSERT INTO `jobs` VALUES
(1, "Kyle",		"08/02/2002",	"10/02/2002",		"12/02/2002",	"destructionlink",		"Complete",		"videolink", 	"accID",	"CRMlink"),
(2, "Kyle",		"08/02/2002",	"10/02/2002",		"12/02/2002",	"destructionlink",		"Complete",		"videolink", 	"accID",	"CRMlink"),
(3, "Kyle",		"08/02/2002",	"10/02/2002",		"12/02/2002",	"destructionlink",		"Complete",		"videolink", 	"accID",	"CRMlink");

DROP TABLE IF EXISTS `request_job`;
CREATE TABLE `request_job` (
  `job_id` 					int(11)			NOT NULL AUTO_INCREMENT,
  `client_name` 			varchar(256)		DEFAULT NULL,
  `client_email` 			varchar(256) 		DEFAULT NULL,
  `client_number` 			int(45) 		DEFAULT NULL,
  `company_name` 			varchar(256) 		DEFAULT NULL,
  `client_address` 			varchar(256) 	DEFAULT NULL,
  `additional Information` 	varchar(256) 	DEFAULT NULL,  
  PRIMARY KEY (`job_id`)
);

INSERT INTO `request_job` VALUES
(1, "Kyle",		"Kyle101@gmail.com",	"0871234567",		"PepeInc",	"Pepe Road",		"Only have 1 HDD"),
(2, "Erl",		"Kyle101@gmail.com",	"1234567890",		"PepeInc",	"Pepe Road",		"Only have 2 HDD"),
(3, "Lre",		"Kyle101@gmail.com",	"9876543215",		"PepeInc",	"Pepe Road",		"Only have 3 HDD");
-- ------------------------------------------------------
-- Table structure for table Barcode Related Stuff
--

CREATE TABLE `batches` (
  `batch_id` 				int (11)		AUTO_INCREMENT NOT NULL,
  `job_id` 					int(11)			DEFAULT NULL,
  `seal_barcode`			int(45) 		DEFAULT NULL,
  `date_of_collection`		int(11) 		DEFAULT NULL,
  `date_of_destruction`		int(11) 		DEFAULT NULL,
  `status`					int(11) 		DEFAULT NULL,
  PRIMARY KEY (`batch_id`)
);
INSERT INTO `batches` VALUES
(1, "1",		"65451651",		 "10//02/2002",		"12/02/2002",	"Complete"),
(2, "2",		"45616515",		 "10//02/2002",		"12/02/2002",	"Complete"),
(3, "3",		"82848264",		 "10//02/2002",		"12/02/2002",	"Complete");


CREATE TABLE `dummy` (
  `id` 			int (11)		AUTO_INCREMENT NOT NULL,
  `barcode` 	varchar(45)		DEFAULT NULL,
  `batch`		int(11) 		DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `dummy` VALUES
(1, "4156465",		"65451651");

-- ------------------------------------------------------
-- Table structure for table `user_staff`
--


CREATE TABLE `user_staff` (
  `staff_id` 		int(11)			AUTO_INCREMENT NOT NULL,
  `staff_name` 		varchar(45)		DEFAULT NULL,
  `staff_email`		varchar(45) 	DEFAULT NULL,
  `staff_pass` 		varchar(100) 	DEFAULT NULL,
  PRIMARY KEY (`staff_id`)
);
INSERT INTO `user_staff` VALUES
(1, "Musk",		"Musky101",		"Admin"),
(2, "Mike",		"Mike183",		"Admin");


-- ------------------------------------------------------
-- Table structure for table `user_client`
--
CREATE TABLE `user_client` (
  `client_id` 		int(11)			NOT NULL AUTO_INCREMENT,
  `client_name` 	varchar(45)		DEFAULT NULL,
  `client_email` 	varchar(45) 	DEFAULT NULL,
  `client_uid` 		varchar(45) 	DEFAULT NULL,
  `client_role` 	varchar(45) 	DEFAULT NULL,
  `client_pass` 	varchar(100) 	DEFAULT NULL,
  PRIMARY KEY (`client_id`)
);
INSERT INTO `user_client` VALUES
(1, "Kyle",		"Kyle101@gmail.com",	"Kyle1",	"admin",			PASSWORD("pass")),
(2, "Scot",		"Scot101@gmail.com",	"Scot2",	"admin",			PASSWORD("pass")),
(3, "Stan",		"Stan183@gmail.com",	"Scot3",	"admin",			PASSWORD("pass"));