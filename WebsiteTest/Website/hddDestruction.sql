DROP DATABASE IF EXISTS hddDestruction;
CREATE DATABASE IF NOT EXISTS hddDestruction;
USE hddDestruction;

-- ------------------------------------------------------
-- Table structure for table `jobs`
--
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` 				int(11)			NOT NULL AUTO_INCREMENT,
  `name` 			varchar(45)		DEFAULT NULL,
  `insurance` 		varchar(45) 	DEFAULT NULL,
  `qualifications` 	varchar(256) 	DEFAULT NULL,
  `description` 	varchar(256) 	DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ------------------------------------------------------
-- Table structure for table Barcode Related Stuff
--

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
  `client_pass` 	varchar(100) 	DEFAULT NULL,
  PRIMARY KEY (`client_id`)
);
INSERT INTO `user_client` VALUES
(1, "Kyle",		"Kyle101@gmail.com",	"Kyle1",		"Pass"),
(2, "Scot",		"Scot101@gmail.com",	"Scot2",		"Pass"),
(3, "Stan",		"Stan183@gmail.com",	"Scot3",		"Pass");