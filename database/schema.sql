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
  `id` int NOT NULL AUTO_INCREMENT,
  `title` int NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `gender` enum('m','f','o') NOT NULL,
  `password` char(32),
  `account_type_id` int NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_UserAccountType FOREIGN KEY (`account_type_id`) 
  REFERENCES `account_type`(`id`) ON UPDATE CASCADE,
  CONSTRAINT FK_UserTitle FOREIGN KEY (`title`) 
  REFERENCES `title`(`id`) ON UPDATE CASCADE  
);

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
  `password` char(32) NOT NULL,
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
  REFERENCES `airport`(`id`) ON UPDATE CASCADE
);

--
-- Table structure for 'scheduled_flight'
--
CREATE TABLE `scheduled_flight` (
  `id` int NOT NULL AUTO_INCREMENT,
  `route` int NOT NULL,
  `departure` timestamp NOT NULL,
  `assigned_airplane_id` int NOT NULL,
  `delayed_departure` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_ScheduledFlightRoute FOREIGN KEY (`route`) 
  REFERENCES `route`(`id`) ON UPDATE CASCADE,
  CONSTRAINT UC_FlightSchedule UNIQUE (`route`, `departure`)
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
  `passport_no` varchar(20) UNIQUE,
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
BEGIN
	DECLARE `age` INT;
	SELECT DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(`birthday`, '%Y') - (DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(`birthday`, '00-%m-%d')) 
    INTO `age` 
    FROM `passenger`
    WHERE `passenger`.`birthday` = `birthday`;
	RETURN `age`;
END $$
DELIMITER ;

--
-- View structure for `route_with_airports`
-- detailed view routes with its respective airport names
--
CREATE VIEW `route_with_airports` AS 
SELECT `r`.`id`, `a1`.`code` AS `origin_code`,`a1`.`name` AS `origin`, `a2`.`code` AS `destination_code`,  `a2`.`name` AS `destination` 
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
SELECT `sf`.`id`, `sf`.`departure`, `r`.`origin_code`, `r`.`origin`, `r`.`destination_code`, `r`.`destination`, `a`.`id` AS `aircraft_id` , `am`.`model_name` AS `aircraft_model`, `sf`.`is_deleted`
FROM `scheduled_flight` `sf` 
  INNER JOIN `route_with_airports` `r` 
    ON `sf`.`route` = `r`.`id` 
  INNER JOIN `aircraft` `a` 
    ON `sf`.`assigned_airplane_id` = `a`.`id` 
  INNER JOIN `aircraft_model` `am` 
    ON `a`.`model_id` = `am`.`id`
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
  INNER JOIN `account_type` `ac` 
    ON `u`.`account_type_id` = `ac`.`id` 
  INNER JOIN `scheduled_flight` `sf` 
    ON `b`.`scheduled_flight_id` = `sf`.`id`
ORDER BY `sf`.`departure`;

--
-- View structure for `passengers_with_routes`
-- departure date of the booking with the type of the passenger who booked it
--
CREATE VIEW `passengers_with_routes` AS
SELECT `sf`.`route`, `sf`.`departure`, `p`.`first_name`, `p`.`last_name`, calculate_age(`p`.`birthday`) AS `passenger_age` 
FROM `reserved_seat` `rs` 
  INNER JOIN `passenger` `p`
    ON `p`.`id` = `rs`.`passenger_id`
  INNER JOIN `scheduled_flight` `sf`
    ON `sf`.`id` = `rs`.`scheduled_flight_id`
ORDER BY `sf`.`departure`;

--
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
INNER JOIN `aircraft` ON `aircraft`.`id` = `scheduled_flight`.`assigned_airplane_id`
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
