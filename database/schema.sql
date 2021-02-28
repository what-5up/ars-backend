-- Creating a new database
DROP DATABASE IF EXISTS b_airways;
CREATE DATABASE b_airways;
USE b_airways;

--
-- Table structure for 'account_type'
--
CREATE TABLE `account_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_type_name` varchar(15) NOT NULL UNIQUE,
  `discount` numeric(5,2),
  `criteria` int unsigned,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT CHK_AccountDiscount CHECK(`discount` BETWEEN 0 AND 100)
);

--
-- Table structure for 'account_type'
--
CREATE TABLE `title` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_name` varchar(15) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);

--
-- Table structure for 'user'
--
CREATE TABLE `user` (
  `id` int NOT NULL,
  `type` enum('g','r') NOT NULL,
  PRIMARY KEY (`id`, `type`)
);

--
-- Table structure for 'guest'
--
CREATE TABLE `guest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` int NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `gender` enum('m','f','o') NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_GuestTitle FOREIGN KEY (`title`) 
  REFERENCES `title`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_GuestParent FOREIGN KEY (`id`) 
  REFERENCES `user`(`id`) ON UPDATE CASCADE
);

--
-- Trigger structure for 'TR_AddParentRegisteredUser'
-- Add a row to parent user table after inserting to registered user
--
DELIMITER $$

CREATE TRIGGER `TR_AddParentOfGuest` BEFORE INSERT ON `guest` FOR EACH ROW BEGIN
  DECLARE new_id INT;
  SELECT COUNT(*) + 1 INTO new_id FROM `user`;
  INSERT INTO `user` VALUES (new_id, 'g');
  SET new.`id` = new_id;
END $$

DELIMITER ;

--
-- Table structure for 'registered_user'
--
CREATE TABLE `registered_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` int NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `gender` enum('m','f','o') NOT NULL,
  `password` char(60),
  `account_type_id` int NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_RegisteredUserAccountType FOREIGN KEY (`account_type_id`) 
  REFERENCES `account_type`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_RegisteredUserTitle FOREIGN KEY (`title`) 
  REFERENCES `title`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_RegisteredUserParent FOREIGN KEY (`id`) 
  REFERENCES `user`(`id`) ON UPDATE CASCADE
);

--
-- Trigger structure for 'TR_AddParentRegisteredUser'
-- Add a row to parent user table after inserting to registered user
--
DELIMITER $$

CREATE TRIGGER `TR_AddParentOfRegisteredUser` BEFORE INSERT ON `registered_user` FOR EACH ROW BEGIN
  DECLARE new_id INT;
  SELECT COUNT(*) + 1 INTO new_id FROM `user`;
  INSERT INTO `user` VALUES (new_id, 'r');
  SET new.`id` = new_id;
END $$

DELIMITER ;

--
-- Trigger structure for 'TR_AddAccountType'
-- Set account type id before inserting a new row to registered user
--
DELIMITER $$

CREATE TRIGGER `TR_AddAccountType` BEFORE INSERT ON `registered_user` FOR EACH ROW BEGIN
  DECLARE normal_user_id INT;
  SELECT `id`
  INTO normal_user_id
  FROM `account_type`
  WHERE `account_type_name` = "normal user";
  SET new.`account_type_id` = normal_user_id;
END $$

DELIMITER ;

--
-- Table structure for 'designation'
--
CREATE TABLE `designation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `privilege` enum('m','s','c','a') NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for 'employee'
--
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` int NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` char(60) NOT NULL,
  `designation_id` int NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_EmployeeDesignation FOREIGN KEY (`designation_id`) 
  REFERENCES `designation`(`id`) ON UPDATE CASCADE, 
  CONSTRAINT FK_EmployeeTitle FOREIGN KEY (`title`) 
  REFERENCES `title`(`id`) ON UPDATE CASCADE  
);

--
-- Table structure for 'aircraft_model'
--
CREATE TABLE `aircraft_model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model_name` varchar(100),
  `seating_capacity` smallint unsigned,
  `max_rows` smallint unsigned,
  `max_columns` smallint unsigned,
  PRIMARY KEY (`id`)
);

--
-- Table structure for 'aircraft'
--
CREATE TABLE `aircraft` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model_id` int NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_AircraftModel FOREIGN KEY (`model_id`) 
  REFERENCES `aircraft_model`(`id`) ON UPDATE CASCADE  
);

--
-- Table structure for 'traveler_class'
--
CREATE TABLE `traveler_class` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for 'region'
--
CREATE TABLE `region` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `region_type` enum('country', 'state', 'city') NOT NULL,
  `parent_id` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_RegionParent FOREIGN KEY (`parent_id`) 
  REFERENCES `region`(`id`) ON UPDATE CASCADE
);

--
-- Table structure for 'airport'
--
CREATE TABLE `airport` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(10) NOT NULL,
  `parent_region_id` int NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_ParentRegion FOREIGN KEY (`parent_region_id`) 
  REFERENCES `region`(`id`) ON UPDATE CASCADE
);

--
-- Table structure for 'route'
--
CREATE TABLE `route` (
  `id` int NOT NULL AUTO_INCREMENT,
  `origin` int NOT NULL,
  `destination` int NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_RouteOrigin FOREIGN KEY (`origin`) 
  REFERENCES `airport`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_RouteDestination FOREIGN KEY (`destination`) 
  REFERENCES `airport`(`id`) ON UPDATE CASCADE,
  CONSTRAINT UC_OriginDestination UNIQUE(`origin`, `destination`),
  CONSTRAINT UC_Airport CHECK (`origin` != `destination`)
);

--
-- Table structure for 'scheduled_flight'
--
CREATE TABLE `scheduled_flight` (
  `id` int NOT NULL AUTO_INCREMENT,
  `route` int NOT NULL,
  `departure` timestamp NOT NULL,
  `arrival` timestamp NULL, 
  `assigned_aircraft_id` int NOT NULL,
  `delayed_departure` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_ScheduledFlightRoute FOREIGN KEY (`route`) 
  REFERENCES `route`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_ScheduledFlightAircraft FOREIGN KEY (`assigned_aircraft_id`)
  REFERENCES `aircraft`(`id`) ON UPDATE CASCADE,
  CONSTRAINT UC_FlightSchedule UNIQUE (`route`, `departure`),
  CONSTRAINT CHK_DepartureBeforeArrival CHECK (`arrival` IS NOT NULL AND `departure` < `arrival`)
);

--
-- Table structure for 'booking'
--
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `scheduled_flight_id` int NOT NULL,
  `date_of_booking` timestamp NOT NULL,
  `final_amount` numeric(12,2) unsigned NOT NULL,
  `state` enum('booked','completed','cancelled') DEFAULT 'booked',
  PRIMARY KEY (`id`),
  CONSTRAINT FK_BookingUser FOREIGN KEY (`user_id`) 
  REFERENCES `user`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FL_BookingFlight FOREIGN KEY (`scheduled_flight_id`) 
  REFERENCES `scheduled_flight`(`id`) ON UPDATE CASCADE
);

--
-- Trigger structure for 'TR_UpgradeUser'
-- Upgrades the user if he has passed the criteria.
--
DELIMITER $$

CREATE TRIGGER `TR_UpgradeUser` AFTER INSERT ON `booking` FOR EACH ROW BEGIN
    DECLARE current_criteria, number_of_bookings, next_criteria_id, next_criteria INT;
    
    /* finding the number of bookings the user has made */
    SELECT `ac`.`criteria`, COUNT(*)
    INTO current_criteria, number_of_bookings
    FROM `registered_user` `u` 
        INNER JOIN `account_type` `ac` 
            ON `u`.`account_type_id` = `ac`.`id`
        INNER JOIN `booking` `b`
            ON `b`.`user_id` = `u`.`id`
    WHERE `u`.`id` = new.`user_id`;
    
    /* finding the immediate upgrade to the current criteria */
    SELECT `id`, `criteria` 
    INTO next_criteria_id, next_criteria 
    FROM `account_type`
    WHERE `criteria` > current_criteria
    LIMIT 1;
        
    /* upgrade the user if he has passed the criteria */
    IF (number_of_bookings >= next_criteria)
    	THEN
           UPDATE `registered_user` 
           SET `account_type_id` = next_criteria_id
           WHERE  `id` =  new.`user_id`;
    END IF;
    
END $$

DELIMITER ;

--
-- Table structure for 'passenger'
--
CREATE TABLE `passenger` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` int NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `birthday` date NOT NULL,
  `gender` enum('m','f','o'), 
  `country` varchar(60) NOT NULL,
  `passport_no` varchar(20),
  `passport_expiry` date,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_PassengerUser FOREIGN KEY (`user_id`) 
  REFERENCES `user`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_PassengerTitle FOREIGN KEY (`title`) 
  REFERENCES `title`(`id`) ON UPDATE CASCADE  
);

--
-- Table structure for 'price'
--
CREATE TABLE `price` (
  `route_id` int NOT NULL,
  `traveler_class` int NOT NULL,
  `amount` numeric(12,2) unsigned NOT NULL,
  PRIMARY KEY (`route_id`,`traveler_class`),
  CONSTRAINT FK_PriceRoute FOREIGN KEY (`route_id`) 
  REFERENCES `route`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_PriceTravelerClass FOREIGN KEY (`traveler_class`) 
  REFERENCES `traveler_class`(`id`) ON UPDATE CASCADE
);

--
-- Table structure for 'seat_map'
--
CREATE TABLE `seat_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seat_number` varchar(4) NOT NULL,
  `aircraft_model_id` int NOT NULL,
  `traveler_class` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_SeatAircraftModel FOREIGN KEY (`aircraft_model_id`) 
  REFERENCES `aircraft_model`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_SeatClass FOREIGN KEY (`traveler_class`) 
  REFERENCES `traveler_class`(`id`) ON UPDATE CASCADE,
  CONSTRAINT UC_AircraftSeat UNIQUE (`seat_number`, `aircraft_model_id`)
);

--
-- Table structure for 'reserved_seat'
--
CREATE TABLE `reserved_seat` (
  `seat_id` int NOT NULL,
  `booking_id` int NOT NULL,
  `scheduled_flight_id` int NOT NULL,
  `passenger_id` int NOT NULL,
  PRIMARY KEY (`seat_id`, `scheduled_flight_id`),
  CONSTRAINT FK_Seat FOREIGN KEY (`seat_id`) 
  REFERENCES `seat_map`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_SeatBooking FOREIGN KEY (`booking_id`) 
  REFERENCES `booking`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_SeatFlight FOREIGN KEY (`scheduled_flight_id`) 
  REFERENCES `scheduled_flight`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_SeatPassenger FOREIGN KEY (`passenger_id`) 
  REFERENCES `passenger`(`id`) ON UPDATE CASCADE
);

--
-- Function for calculating age 
-- @param birthday DATE
-- @return age INT
--
DELIMITER $$ 
CREATE FUNCTION calculate_age(`birthday` DATE) RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
	DECLARE `age` INT;
	SELECT DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(`birthday`, '%Y') - (DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(`birthday`, '00-%m-%d')) 
  INTO `age`;
  RETURN `age`;
END $$
DELIMITER ;

--
-- Function for genreating available seats of a scheduled_flight
-- @param flight_id int - scheduled_flight_id
-- @return number of available seats
--
DELIMITER $$

CREATE FUNCTION `get_available_seats`(`flight_id` INT) RETURNS INT
    READS SQL DATA
    DETERMINISTIC
BEGIN
	DECLARE capacity, reserved_seats_count INT;
	SELECT `am`.`seating_capacity`
	INTO capacity
	FROM `scheduled_flight` `sf` 
		INNER JOIN `aircraft` `a`
		ON `sf`.`assigned_aircraft_id` = `a`.`id`
		INNER JOIN `aircraft_model` `am`
		ON `a`.`model_id` = `am`.`id`
	WHERE `sf`.`id` = `flight_id`;

	SELECT COUNT(`seat_id`) 
	INTO reserved_seats_count
	FROM `reserved_seat`
	WHERE `scheduled_flight_id` = `flight_id`;
    
  RETURN capacity - reserved_seats_count;

END $$

DELIMITER ;

--
-- Function to return address of an airport
-- NOTE: run "SET GLOBAL log_bin_trust_function_creators = 1;" to remove deterministic check
--
DELIMITER $$

CREATE FUNCTION `generate_airport_address`(airport_code VARCHAR(10)) RETURNS VARCHAR(200)
BEGIN
  DECLARE airport_address VARCHAR(200);
  DECLARE parent_region_id_ INT;
  DECLARE sub_region VARCHAR(100);

  SET airport_address = airport_code;
  SET parent_region_id_ = (SELECT `parent_region_id` FROM `airport` WHERE `code` = airport_code );

  WHILE parent_region_id_ IS NOT NULL DO
      
      SET sub_region = (SELECT `name` FROM `region` WHERE `id` = parent_region_id_);
      SET airport_address = CONCAT(sub_region, " -> ", airport_address);
      SET parent_region_id_ = (SELECT `parent_id` FROM `region` WHERE `id` = parent_region_id_);
  END WHILE;

  RETURN airport_address;
END $$

DELIMITER ;

--
-- View structure for `route_with_airports`
-- detailed view routes with its respective airport names
--
CREATE VIEW `route_with_airports` AS 
SELECT `r`.`id`, `a1`.`code` AS `origin_code`,`a1`.`name` AS `origin`, generate_airport_address(`a1`.`code`) AS `origin_region`,
`a2`.`code` AS `destination_code`,  `a2`.`name` AS `destination`, generate_airport_address(`a2`.`code`) AS `destination_region`
FROM route `r` 
  INNER JOIN `airport` `a1` 
    ON `r`.`origin` = `a1`.`id` 
  INNER JOIN `airport` `a2` 
    ON `r`.`destination` = `a2`.`id`;

--
-- View structure for `scheduled_flights_list`
-- detailed view of scheduled flights
--
CREATE VIEW `scheduled_flights_list` AS 
SELECT `sf`.`id`, `r`.`id` AS `route_id`, `sf`.`departure`, `sf`.`arrival`, `r`.`origin_code`, `r`.`origin`, `r`.`destination_code`, `r`.`destination`, `a`.`id` AS `aircraft_id` , `am`.`model_name` AS `aircraft_model`, `sf`.`is_deleted`, get_available_seats(`sf`.`id`) AS `available_seats`
FROM `scheduled_flight` `sf` 
  INNER JOIN `route_with_airports` `r` 
    ON `sf`.`route` = `r`.`id` 
  INNER JOIN `aircraft` `a` 
    ON `sf`.`assigned_aircraft_id` = `a`.`id` 
  INNER JOIN `aircraft_model` `am` 
    ON `a`.`model_id` = `am`.`id`
WHERE `sf`.`departure` > CURRENT_TIMESTAMP
ORDER BY `sf`.`id`;

--
-- View structure for `bookings_by_passenger_type`
-- departure date of the booking with the type of the passenger who booked it
--
CREATE VIEW `bookings_by_passenger_type` AS
SELECT DATE(`sf`.`departure`) AS `departure_date` , `ac`.`account_type_name` AS `account_type`
FROM `booking` `b` 
  INNER JOIN `user` `u` 
    ON `b`.`user_id` = `u`.`id` 
  INNER JOIN `registered_user` `ru`
    ON `ru`.`id` = `u`.`id`
  INNER JOIN `account_type` `ac` 
    ON `ru`.`account_type_id` = `ac`.`id` 
  INNER JOIN `scheduled_flight` `sf` 
    ON `b`.`scheduled_flight_id` = `sf`.`id`
ORDER BY `sf`.`departure`;

--
-- View structure for `passengers_with_routes`
-- departure date of the booking with the type of the passenger who booked it
--
CREATE VIEW `passengers_with_routes` AS
SELECT `p`.`id`, `sf`.`route`, `sf`.`departure`, `p`.`first_name`, `p`.`last_name`, calculate_age(`p`.`birthday`) AS `passenger_age` 
FROM `reserved_seat` `rs` 
  INNER JOIN `passenger` `p`
    ON `p`.`id` = `rs`.`passenger_id`
  INNER JOIN `scheduled_flight` `sf`
    ON `sf`.`id` = `rs`.`scheduled_flight_id`
ORDER BY `sf`.`departure`;

--

-- View structure for `passenger_destination`
-- departure dates with delay added, destination of passengers
--
CREATE VIEW `passenger_destination` AS
SELECT `rs`.`booking_id`,`rs`.`passenger_id`,DATE(IFNULL(`sf`.`delayed_departure`,`sf`.`departure`)) AS `departure_date`,`b`.`state`,`sf`.`route`,`a`.`code` AS `dest_code`,`a`.`name` AS `dest_name`
FROM `reserved_seat` `rs`
  INNER JOIN `booking` `b`
    ON `rs`.`booking_id` = `b`.`id`
  INNER JOIN `scheduled_flight` `sf`
    ON `rs`.`scheduled_flight_id` = `sf`.`id`
  INNER JOIN `route` `r`
    ON `sf`.`route` = `r`.`id`
  INNER JOIN `airport` `a`
    ON `r`.`destination` = `a`.`id`;
                                                         
-- View structure for `revenue_by_aircraft_model_and_month`
-- revenue for model by each month
--
CREATE VIEW `revenue_by_aircraft_model_and_month`
AS
SELECT `model_name`
	,SUM(`final_amount`) AS `revenue`
	,DATE_FORMAT(`date_of_booking`, "%Y-%m") AS `month`
FROM `booking`
INNER JOIN `scheduled_flight` ON `booking`.`scheduled_flight_id` = `scheduled_flight`.`id`
INNER JOIN `aircraft` ON `aircraft`.`id` = `scheduled_flight`.`assigned_aircraft_id`
INNER JOIN `aircraft_model` ON `aircraft_model`.`id` = `aircraft`.`model_id`
GROUP BY `aircraft`.`model_id`
	,month;

--
-- View structure for to get past flight passenger count, state
--

CREATE VIEW `scheduled_flight_details`
AS
SELECT `sf`.`id`
	,`sf`.`route`
	,`sf`.`departure`
  ,`sf`.`delayed_departure`
	,`tc`.`class`
	,count(`tc`.`id`) AS `passengers`
FROM `scheduled_flight` `sf`
INNER JOIN `reserved_seat` `rs` on`sf`.`id` = `rs`.`scheduled_flight_id`
INNER JOIN `seat_map` `se` ON `rs`.`seat_id` = `se`.`id`
INNER JOIN `traveler_class` `tc` ON `tc`.`id` = `se`.`traveler_class`
WHERE `sf`.`departure` < CURDATE()
GROUP BY `sf`.`id`
	,`tc`.`id`;

--                                                     
-- View structure for 'user_auth'
-- details required for auth
--

CREATE VIEW `user_auth`
AS
(SELECT `registered_user`.`id`,`email`,`password`,`account_type_name` AS `acc_type`,`is_deleted`
FROM `registered_user`
INNER JOIN `account_type`
    ON `registered_user`.`account_type_id` = `account_type`.`id`)
UNION
(SELECT `employee`.`id`,`email`,`password`,`privilege` AS `acc_type`,`is_deleted`
FROM `employee`
INNER JOIN `designation`
    ON `employee`.`designation_id` = `designation`.`id`
);


--
-- Generate a seat map for of a aircraft with the attribute is_reserved
-- NOTE: run "SET GLOBAL log_bin_trust_function_creators = 1;" to remove deterministic check
--
DELIMITER $$

CREATE PROCEDURE 
  generate_seat_map( scheduled_flight_id_ INT )
BEGIN  
  SELECT sm.`id`, sm.`seat_number`, tc.`class`, rs.`scheduled_flight_id` IS NOT NULL as is_reserved, p.`amount` 
  FROM `seat_map` as sm 
    LEFT JOIN (
      SELECT * 
      FROM `reserved_seat` 
      WHERE `scheduled_flight_id` = scheduled_flight_id_) as rs 
    ON sm.`id` = rs.`seat_id` 
    LEFT JOIN `traveler_class` as tc 
    ON sm.`traveler_class` = tc.`id` 
    LEFT JOIN (
      SELECT * 
      FROM `price` 
      WHERE `route_id` IN (
        SELECT `route` 
        FROM `scheduled_flight` 
        WHERE `id` = scheduled_flight_id_)) as p 
    ON p.`traveler_class` = sm.`traveler_class` 
  WHERE (sm.`aircraft_model_id` IN (
    SELECT am.`id` 
    FROM `aircraft` as a 
      LEFT JOIN `aircraft_model` as am 
      ON a.`model_id` = am.`id` 
    WHERE a.`id` IN (
      SELECT `assigned_aircraft_id` 
      FROM `scheduled_flight` 
      WHERE `id` = scheduled_flight_id_
  )));
END $$

DELIMITER ;