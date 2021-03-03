DROP USER IF EXISTS 'bairways_management'@'localhost';
DROP USER IF EXISTS 'bairways_crc'@'localhost';
DROP USER IF EXISTS 'bairways_sr'@'localhost';
DROP USER IF EXISTS 'bairways_admin'@'localhost';
DROP USER IF EXISTS 'bairways_user'@'localhost';
DROP USER IF EXISTS 'bairways_server'@'localhost';

CREATE USER 'bairways_management'@'localhost' IDENTIFIED BY 'bairwaysm';
CREATE USER 'bairways_crc'@'localhost' IDENTIFIED BY 'bairwaysc';
CREATE USER 'bairways_sr'@'localhost' IDENTIFIED BY 'bairwayss';
CREATE USER 'bairways_admin'@'localhost' IDENTIFIED BY 'bairwaysa';
CREATE USER 'bairways_user'@'localhost' IDENTIFIED BY 'bairwaysu';

GRANT SELECT ON `route_with_airports` TO 'bairways_management'@'localhost', 'bairways_sr'@'localhost', 'bairways_user'@'localhost';
GRANT SELECT ON `user_auth` TO 'bairways_management'@'localhost', 'bairways_sr'@'localhost', 'bairways_crc'@'localhost','bairways_admin'@'localhost', 'bairways_user'@'localhost';

GRANT SELECT ON `bookings_by_passenger_type` TO 'bairways_management'@'localhost';
GRANT SELECT ON `revenue_by_aircraft_model_and_month` TO 'bairways_management'@'localhost'; 
GRANT SELECT ON `passenger_destination` TO 'bairways_management'@'localhost'; 
GRANT SELECT ON `scheduled_flight_details` TO 'bairways_management'@'localhost'; 
GRANT SELECT ON `passengers_with_routes` TO 'bairways_management'@'localhost'; 

GRANT SELECT, INSERT, UPDATE ON `scheduled_flight` TO 'bairways_crc'@'localhost';
GRANT SELECT ON `aircraft_details` TO 'bairways_crc'@'localhost';

GRANT SELECT, INSERT, UPDATE ON `price` TO 'bairways_sr'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `account_type` TO 'bairways_sr'@'localhost';
GRANT SELECT ON `traveler_class` TO 'bairways_sr'@'localhost';
GRANT SELECT ON `route` TO 'bairways_sr'@'localhost';
GRANT EXECUTE ON PROCEDURE routes_with_no_prices TO 'bairways_sr'@'localhost';

GRANT SELECT, INSERT, UPDATE ON `aircraft_model` TO 'bairways_admin'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `aircraft` TO 'bairways_admin'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `region` TO 'bairways_admin'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `airport` TO 'bairways_admin'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `employee` TO 'bairways_admin'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `designation` TO 'bairways_admin'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `seat_map` TO 'bairways_admin'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `title` TO 'bairways_admin'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `traveler_class` TO 'bairways_admin'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `route` TO 'bairways_admin'@'localhost';

GRANT SELECT ON `aircraft_model` TO 'bairways_user'@'localhost';
GRANT SELECT ON `aircraft` TO 'bairways_user'@'localhost';
GRANT SELECT ON `scheduled_flight` TO 'bairways_user'@'localhost';
GRANT SELECT ON `scheduled_flights_list` TO 'bairways_user'@'localhost';
GRANT SELECT ON `user` TO 'bairways_user'@'localhost';
GRANT SELECT ON `account_type` TO 'bairways_user'@'localhost';
GRANT SELECT ON `title` TO 'bairways_user'@'localhost';
GRANT SELECT ON `traveler_class` TO 'bairways_user'@'localhost';
GRANT SELECT ON `airport` TO 'bairways_user'@'localhost';
GRANT SELECT ON `route` TO 'bairways_user'@'localhost';
GRANT SELECT ON `price` TO 'bairways_user'@'localhost';
GRANT SELECT ON `seat_map` TO 'bairways_user'@'localhost';
GRANT INSERT ON `guest` TO 'bairways_user'@'localhost';
GRANT SELECT, INSERT ON `passenger` TO 'bairways_user'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `booking` TO 'bairways_user'@'localhost';
GRANT SELECT, INSERT, UPDATE ON `registered_user` TO 'bairways_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON `reserved_seat` TO 'bairways_user'@'localhost';
GRANT EXECUTE ON FUNCTION generate_airport_address TO 'bairways_user'@'localhost';
GRANT EXECUTE ON PROCEDURE get_user_bookings TO 'bairways_user'@'localhost';
GRANT EXECUTE ON PROCEDURE get_passenger_and_seat_details TO 'bairways_user'@'localhost';
GRANT EXECUTE ON PROCEDURE generate_seat_map TO 'bairways_user'@'localhost';
GRANT EXECUTE ON FUNCTION get_available_seats TO 'bairways_user'@'localhost';

FLUSH PRIVILEGES;