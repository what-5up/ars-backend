USE b_airways;

--
-- Inserting values to 'account_type' table
--
SET AUTOCOMMIT=0;
INSERT INTO `account_type`
(`account_type_name`, `discount`, `criteria`) VALUES 
('normal user', 0, 0),
('frequent user', 5, 3),
('gold user', 9, 5);

--
-- Inserting values to 'title' table
--
INSERT INTO `title` 
(`title_name`) VALUES
('Mr'),('Mrs'),('Rev'),('PROF'),('Dr'),('Hon'),('Exc'),('Ven'),('Miss'),('Master'),('Admiral'),('Major'),('Capt'),('PhraKhru'),('Phramaha'),('Phra'),('Rt Revd'),('Most Revd');

--
-- Inserting values to 'user' table
--
INSERT INTO `registered_user`
(`title`, `first_name`, `last_name`, `password`, `email`, `gender`, `account_type_id`) VALUES
(1, 'Danushka', 'Gunathilake', '$2y$12$NcZJNn6goM7upV5rKidpSO5/UbS64Q0o8EkFOaE2ODdIh9yrF/7SC', 'danushka@gmail.com', 'm', 1),
(1, 'Joe', 'Roots', '$2y$12$NcZJNn6goM7upV5rKidpSO5/UbS64Q0o8EkFOaE2ODdIh9yrF/7SC', 'roots@gmail.com', 'm', 1),
(1, 'Lasith', 'Embuldeniya', '$2y$12$NcZJNn6goM7upV5rKidpSO5/UbS64Q0o8EkFOaE2ODdIh9yrF/7SC', 'lasith@gmail.com', 'm', 1),
(1, 'Angelo', 'Mathews', '$2y$12$NcZJNn6goM7upV5rKidpSO5/UbS64Q0o8EkFOaE2ODdIh9yrF/7SC', 'mathews@gmail.com', 'm', 1),
(8, 'Moda', 'Nagitha', '$2y$12$NcZJNn6goM7upV5rKidpSO5/UbS64Q0o8EkFOaE2ODdIh9yrF/7SC', 'nagitha@modaya.lk', 'o', 1);
COMMIT;

INSERT INTO `guest`
(`title`, `first_name`, `last_name`, `email`, `gender`) VALUES
(1, 'Dimuth', 'Karunaratne', 'karuna@gmail.com', 'm'),
(1, 'Kane', 'Williamson', 'kane@gmail.com', 'm'),
(1, 'Mohommad', 'Shami', 'shami@gmail.com', 'm'),
(1, 'Dimuth', 'Karunaratne', 'karuna@gmail.com', 'm');

--
-- Inserting values to 'designation' table
--
SET AUTOCOMMIT=0;
INSERT INTO `designation`
(`name`, `privilege`) VALUES
('Crew Schedule Coordinator', 'c'),
('Scheduling Manager', 'm'),
('Sales Person', 's'),
('System Administrator', 'a');

--
-- Inserting values to 'employee' table
--
INSERT INTO `employee`
(`title`, `first_name`, `last_name`, `email`, `password`, `designation_id`) VALUES
(1, 'Kusal', 'Mendis', 'kmendis@gmail.com', '$2y$12$NcZJNn6goM7upV5rKidpSO5/UbS64Q0o8EkFOaE2ODdIh9yrF/7SC', 1),
(1, 'Niroshan', 'Dickwella', 'dickwella@gmail.com', '$2y$12$NcZJNn6goM7upV5rKidpSO5/UbS64Q0o8EkFOaE2ODdIh9yrF/7SC', 2),
(1, 'Dinesh', 'Chandimal', 'chandi@gmail.com', '$2y$12$NcZJNn6goM7upV5rKidpSO5/UbS64Q0o8EkFOaE2ODdIh9yrF/7SC', 3),
(1, 'Kane', 'Williamson', 'wkane@gmail.com', '$2y$12$NcZJNn6goM7upV5rKidpSO5/UbS64Q0o8EkFOaE2ODdIh9yrF/7SC', 4);
COMMIT;

--
-- Inserting values to 'aircraft_model' table
--
SET AUTOCOMMIT=0;
INSERT INTO `aircraft_model`
(`model_name`, `seating_capacity`, `max_rows`, `max_columns`) VALUES
('Boeing 737', 30, 5, 6),
('Boeing 757', 36, 7, 6),
('Airbus A380', 48, 8, 6);

--
-- Inserting values to 'aircraft' table
--
INSERT INTO `aircraft`
(`model_id`) VALUES
(1), (1), (1), (2), (2), (2), (2), (3);
COMMIT;

--
-- Inserting values to 'traveler_class' table
--
INSERT INTO `traveler_class`
(`class`) VALUES
('Platinum'), ('Business'), ('Economy');

--
-- Inserting values to 'region' table
--
SET AUTOCOMMIT=0;
INSERT INTO `region`
(`name`, `region_type`, `parent_id`) VALUES
('Indonesia','country', NULL),
('Sri Lanka','country', NULL),
('India','country', NULL),
('Thailand','country', NULL),
('Singapore','country', NULL),
('Colombo','city', 2),
('Delhi','city', 3),
('Mumbai','city', 3),
('Chennai','city', 3),
('Mattala','city', 2);

--
-- Inserting values to 'airport' table
--
INSERT INTO `airport`
(`code`, `name`, `parent_region_id`) VALUES
('CGK', 'Soekarno-Hatta International Airport', 1),
('DPS', 'Ngurah Rai International Airport', 1),
('BIA', 'Bandaranaike International Airport', 6),
('HRI', 'Mattala Rajapaksa Hambantota Airport', 10),
('DEL', 'Indira Gandhi International Airport', 7),
('BOM', 'Chhatrapati Shivaji Maharaj International Airport', 8),
('MAA', 'Chennai International Airport', 9),
('BKK', 'Suvarnabhumi Airport', 4),
('DMK', 'Don Mueang International Airport', 4),
('SIN', 'Singapore Changi Airport', 5);

--
-- Inserting values to 'route' table
--
INSERT INTO `route`
(`origin`, `destination`) VALUES
(1, 3), (1, 6), (1, 8),
(2, 6), (2, 4), (2, 10),
(3, 2), (3, 8), (3, 10),
(4, 1), (4, 7), (4, 9),
(5, 1), (5, 3), (5, 10),
(6, 2), (6, 4), (6, 10),
(7, 2), (7, 3), (7, 9),
(8, 1), (8, 4), (8, 6),
(9, 2), (9, 4), (9, 5),
(10, 1), (10, 3), (10, 6);
COMMIT;
--
-- Inserting values to 'scheduled_flight' table
--
SET AUTOCOMMIT=0;
INSERT INTO `scheduled_flight`
(`route`, `departure`, `arrival`, `assigned_aircraft_id`, `delayed_departure`) VALUES
(1, '2021-02-22 07:00:00', '2021-02-22 08:00:00', 1, NULL),
(8, '2021-02-22 14:00:00', '2021-02-22 15:00:00', 1, NULL),
(24, '2021-02-22 20:00:00', '2021-02-22 21:00:00', 1, NULL),
(2, '2021-02-22 07:00:00', '2021-02-22 10:00:00', 2, NULL),
(16, '2021-02-23 16:00:00', '2021-02-23 19:00:00', 2, NULL),
(10, '2021-02-23 21:00:00', '2021-02-23 22:30:00', 2, NULL),
(4, '2021-02-24 12:00:00', '2021-02-24 14:00:00', 3, '2021-02-15 12:30:00'),
(18, '2021-02-24 21:00:00', '2021-02-24 22:00:00', 3, NULL),
(6, '2021-02-25 11:00:00', '2021-02-25 14:00:00', 4, NULL),
(28, '2021-02-25 18:00:00', '2021-02-25 19:00:00', 4, NULL),
(11, '2021-02-26 10:00:00', '2021-02-26 14:00:00', 5, NULL),
(25, '2021-02-26 18:00:00', '2021-02-26 19:20:00', 5, '2021-02-26 19:00:00'),
(24, '2021-02-26 09:00:00', '2021-02-26 10:00:00', 6, NULL),
(17, '2021-02-27 16:00:00', '2021-02-27 18:00:00', 6, NULL),
(30, '2021-02-27 09:00:00', '2021-02-27 10:00:00', 7, NULL),
(18, '2021-02-28 16:00:00', '2021-02-28 19:00:00', 7, NULL),
(25, '2021-02-28 08:00:00', '2021-02-28 14:00:00', 8, NULL),
(10, '2021-02-28 13:00:00', '2021-02-28 14:00:00', 8, NULL),
(1, '2021-03-08 07:00:00', '2021-03-08 08:00:00', 1, NULL),
(8, '2021-03-08 14:00:00', '2021-03-08 15:00:00', 1, NULL),
(24, '2021-03-08 20:00:00', '2021-03-08 21:30:00', 1, '2021-03-08 21:00:00'),
(2, '2021-03-09 07:00:00', '2021-03-09 10:00:00', 2, NULL),
(16, '2021-03-09 16:00:00', '2021-03-09 19:00:00', 2, NULL),
(10, '2021-03-10 21:00:00', '2021-03-10 22:30:00', 2, NULL),
(4, '2021-03-10 12:00:00', '2021-03-10 14:00:00', 3, NULL),
(18, '2021-03-11 21:00:00', '2021-03-11 22:00:00', 3, '2021-03-08 22:30:00'),
(6, '2021-03-11 11:00:00', '2021-03-11 14:00:00', 4, NULL),
(28, '2021-03-11 18:00:00', '2021-03-11 19:00:00', 4, NULL),
(11, '2021-03-12 10:00:00', '2021-03-12 14:00:00', 5, NULL),
(25, '2021-03-12 18:00:00', '2021-03-12 19:20:00', 5, NULL),
(24, '2021-03-12 09:00:00', '2021-03-12 10:00:00', 6, NULL),
(17, '2021-03-13 16:00:00', '2021-03-13 18:00:00', 6, NULL),
(30, '2021-03-13 09:00:00', '2021-03-13 10:00:00', 7, NULL),
(18, '2021-03-14 16:00:00', '2021-03-14 19:00:00', 7, NULL),
(25, '2021-03-14 08:00:00', '2021-03-14 14:00:00', 8, '2021-03-08 09:00:00'),
(10, '2021-03-14 13:00:00', '2021-03-14 14:00:00', 8, NULL),
(1, '2021-03-15 07:00:00', '2021-03-15 08:00:00', 1, NULL),
(8, '2021-03-15 14:00:00', '2021-03-15 15:00:00', 1, NULL),
(24, '2021-03-15 20:00:00', '2021-03-15 21:00:00', 1, NULL),
(2, '2021-03-15 07:00:00', '2021-03-15 10:00:00', 2, NULL),
(16, '2021-03-16 16:00:00', '2021-03-16 19:00:00', 2, NULL),
(10, '2021-03-16 21:00:00', '2021-03-16 22:30:00', 2, NULL),
(4, '2021-03-17 12:00:00', '2021-03-17 14:00:00', 3, '2021-03-15 12:30:00'),
(18, '2021-03-17 21:00:00', '2021-03-17 22:00:00', 3, NULL),
(6, '2021-03-18 11:00:00', '2021-03-18 14:00:00', 4, NULL),
(28, '2021-03-18 18:00:00', '2021-03-18 19:00:00', 4, NULL),
(11, '2021-03-19 10:00:00', '2021-03-19 14:00:00', 5, NULL),
(25, '2021-03-19 18:00:00', '2021-03-19 19:20:00', 5, NULL),
(24, '2021-03-19 09:00:00', '2021-03-19 10:00:00', 6, NULL),
(17, '2021-03-20 16:00:00', '2021-03-20 18:00:00', 6, NULL),
(30, '2021-03-20 09:00:00', '2021-03-20 10:00:00', 7, NULL),
(18, '2021-03-21 16:00:00', '2021-03-21 19:00:00', 7, NULL),
(25, '2021-03-21 08:00:00', '2021-03-21 14:00:00', 8, NULL),
(10, '2021-03-21 13:00:00', '2021-03-21 14:00:00', 8, NULL);

--
-- Inserting values to 'booking' table
--
INSERT INTO `booking`
(`user_id`, `scheduled_flight_id`, `date_of_booking`, `final_amount`) VALUES 
(1, 10, '2021-01-02 07:12:05', 45000.00),
(2, 1, '2021-01-03 21:23:32', 90000.00),
(3, 28, '2021-01-10 13:12:05', 62000.00),
(4, 12, '2021-01-02 23:11:43', 75000.00),
(5, 5, '2021-01-02 12:12:12', 120000.00),
(2, 19, '2021-01-02 11:05:19', 98000.00),
(6, 24, '2021-01-11 19:12:42', 120000.00),
(7, 25, '2021-01-14 14:39:51', 150000.00),
(8, 1, '2021-01-18 23:12:32', 270000.00),
(9, 4, '2021-01-22 05:42:23', 150000.00),
(2, 2, '2021-01-22 05:42:23', 120000.00),
(2, 3, '2021-01-22 05:42:23', 142500.00),
(2, 19, '2021-01-22 05:42:23', 142500.00);
COMMIT;

--
-- Inserting values to 'passenger' table
--
SET AUTOCOMMIT=0;
INSERT INTO `passenger`
(`title`, `user_id`, `first_name`, `last_name`, `birthday`, `gender`, `country`, `passport_no`, `passport_expiry`) VALUES 
(1, 3, 'Rumesh', 'Mendis', '1982-02-12', 'm', 'Sri Lanka', '458963146', '2021-08-20'),
(1, 2, 'Steve', 'Smith', '1992-03-14', 'm', 'Australia', '953147651', '2021-03-12'),
(1, 4, 'Manesh', 'Pandey', '1981-09-01', 'm', 'India', '321596547', '2021-01-22'),
(1, 1, 'Danushka', 'Gunathilake', ' 1987-12-02', 'm', 'Sri Lanka', '458621458', '2021-05-29'),
(1, 2, 'Joe', 'Roots', ' 1992-05-12', 'm', 'England', '496529864', '2021-12-12'),
(1, 3, 'Lasith', 'Embuldeniya', '1995-12-12', 'm', 'Sri Lanka', '1256986325', '2021-04-28'),
(1, 4, 'Angelo', 'Mathews', ' 1989-11-12','m', 'Sri Lanka', '1259863325', '2021-06-12'),
(8, 5, 'Moda', 'Nagitha', ' 1950-11-12', 'o', 'Sri Lanka', '115522996', '2021-11-30'),
(10, 3, 'Hashan', 'Mendis', '2002-03-11', 'm', 'Sri Lanka', '5282433246', '2021-02-20'),
(9, 3, 'Sigithi', 'Mendis', '2004-04-12', 'f', 'Sri Lanka', '1382333326', '2021-02-20'),
(9, 6, 'Dimuth', 'Karunaratne', '1989-04-13', 'm', 'Sri Lanka', '282333324', '2021-02-23'),
(9, 3, 'Kane', 'Williamson', '1989-04-19', 'm', 'New Zealand', '342333324', '2021-03-15'),
(9, 3, 'Mohommad', 'Shami', '1992-03-29', 'm', 'India', '1322333326', '2021-03-15'),
(9, 9, 'Dimuth', 'Karunaratne', '1989-04-13', 'm', 'Sri Lanka', '342333324', '2021-02-28');

--
-- Inserting values to 'price' table
--
SET AUTOCOMMIT=0;
INSERT INTO `price`
(`route_id`, `traveler_class`, `amount`) VALUES
(1, 1, 375000), (1, 2, 150000), (1, 3, 125000),
(2, 1, 375000), (2, 2, 180000), (2, 3, 120000),
(3, 1, 350000), (3, 2, 150000), (3, 3, 110000),
(4, 1, 375000), (4, 2, 190000), (4, 3, 120000),
(5, 1, 345000), (5, 2, 150000), (5, 3, 98000),
(6, 1, 380000), (6, 2, 160000), (6, 3, 120000),
(7, 1, 375000), (7, 2, 110000), (7, 3, 88000),
(8, 1, 375000), (8, 2, 120000), (8, 3, 88000),
(9, 1, 390000), (9, 2, 150000), (9, 3, 89000),
(10, 1, 475000), (10, 2, 150000), (10, 3, 60000),
(11, 1, 375000), (11, 2, 150000), (11, 3, 90000),
(12, 1, 360000), (12, 2, 140000), (12, 3, 70000),
(13, 1, 275000), (13, 2, 10000), (13, 3, 80000),
(14, 1, 375000), (14, 2, 165000), (14, 3, 120000),
(15, 1, 455000), (15, 2, 150000), (15, 3, 95000),
(16, 1, 375000), (16, 2, 150000), (16, 3, 120000),
(17, 1, 365000), (17, 2, 180000), (17, 3, 120000),
(18, 1, 375000), (18, 2, 150000), (18, 3, 80000),
(19, 1, 375000), (19, 2, 150000), (19, 3, 90000),
(20, 1, 295000), (20, 2, 165000), (20, 3, 120000),
(21, 1, 375000), (21, 2, 150000), (21, 3, 60000),
(22, 1, 375000), (22, 2, 150000), (22, 3, 120000),
(23, 1, 400000), (23, 2, 190000), (23, 3, 120000),
(24, 1, 375000), (24, 2, 150000), (24, 3, 70000),
(25, 1, 375000), (25, 2, 145000), (25, 3, 70000),
(26, 1, 420000), (26, 2, 150000), (26, 3, 82000),
(27, 1, 99000), (27, 2, 150000), (27, 3, 80000),
(28, 1, 375000), (28, 2, 105200), (28, 3, 75000),
(29, 1, 290000), (29, 2, 150000), (29, 3, 90000),
(30, 1, 375000), (30, 2, 190000), (30, 3, 98000);
COMMIT;

--
-- Inserting values to 'seat_map' table
--
SET AUTOCOMMIT=0;
INSERT INTO `seat_map` 
(`seat_number`, `aircraft_model_id`, `traveler_class`) VALUES
('1A', 1, 1), ('1B', 1, 1), ('1C', 1, 1), ('1D', 1, 1), ('1E', 1, 1), ('1F', 1, 1), 
('2A', 1, 2), ('2B', 1, 2), ('2C', 1, 2), ('2D', 1, 2), ('2E', 1, 2), ('2F', 1, 2), 
('3A', 1, 3), ('3B', 1, 3), ('3C', 1, 3), ('3D', 1, 3), ('3E', 1, 3), ('3F', 1, 3),
('4A', 1, 3), ('4B', 1, 3), ('4C', 1, 3), ('4D', 1, 3), ('4E', 1, 3), ('4F', 1, 3),
('5A', 1, 3), ('5B', 1, 3), ('5C', 1, 3), ('5D', 1, 3), ('5E', 1, 3), ('5F', 1, 3),
('1A', 2, 1), ('1B', 2, 1), ('1E', 2, 1), ('1F', 2, 1),
('2A', 2, 1), ('2B', 2, 1), ('2E', 2, 1), ('2F', 2, 1),
('3A', 2, 2), ('3B', 2, 2), ('3C', 2, 2), ('3E', 2, 2), ('3F', 2, 2),
('4A', 2, 2), ('4B', 2, 2), ('4C', 2, 2), ('4E', 2, 2), ('4F', 2, 2),
('5A', 2, 3), ('5B', 2, 3), ('5C', 2, 3), ('5D', 2, 3), ('5E', 2, 3), ('5F', 2, 3),
('6A', 2, 3), ('6B', 2, 3), ('6C', 2, 3), ('6D', 2, 3), ('6E', 2, 3), ('6F', 2, 3),
('7A', 2, 3), ('7B', 2, 3), ('7C', 2, 3), ('7D', 2, 3), ('7E', 2, 3), ('7F', 2, 3),
('1A', 3, 1), ('1B', 3, 1), ('1C', 3, 1), ('1D', 3, 1), ('1E', 3, 1), ('1F', 3, 1), 
('2A', 3, 1), ('2B', 3, 1), ('2C', 3, 1), ('2D', 3, 1), ('2E', 3, 1), ('2F', 3, 1), 
('3A', 3, 2), ('3B', 3, 2), ('3C', 3, 2), ('3D', 3, 2), ('3E', 3, 2), ('3F', 3, 2),
('4A', 3, 2), ('4B', 3, 2), ('4C', 3, 2), ('4D', 3, 2), ('4E', 3, 2), ('4F', 3, 2),
('5A', 3, 3), ('5B', 3, 3), ('5C', 3, 3), ('5D', 3, 3), ('5E', 3, 3), ('5F', 3, 3),
('6A', 3, 3), ('6B', 3, 3), ('6C', 3, 3), ('6D', 3, 3), ('6E', 3, 3), ('6F', 3, 3),
('7A', 3, 3), ('7B', 3, 3), ('7C', 3, 3), ('7D', 3, 3), ('7E', 3, 3), ('7F', 3, 3),
('8A', 3, 3), ('8B', 3, 3), ('8C', 3, 3), ('8D', 3, 3), ('8E', 3, 3), ('8F', 3, 3);

--
-- Inserting values to 'reserved_seat' table
--
INSERT INTO `reserved_seat`
(`seat_id`, `passenger_id`, `scheduled_flight_id`, `booking_id`) VALUES
(32, 1, 12, 4), 
(11, 2, 19, 6), 
(42, 3, 10, 1), 
(50, 4, 10, 1), 
(2, 5, 1, 2), 
(80, 6, 28, 3), 
(51, 7, 12, 4), 
(12, 8, 5, 5), 
(28, 5, 19, 6),
(30, 9, 12, 4),
(31, 10, 12, 4),
(11, 11, 24, 7),
(12, 12, 25, 8),
(18, 13, 1, 9),
(19, 14, 4, 10),
(7, 2, 2, 11),
(7, 2, 3, 12),
(7, 2, 19, 13);
COMMIT;