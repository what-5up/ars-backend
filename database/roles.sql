DROP ROLE IF EXISTS management, crc, sr, admin, user;
CREATE ROLE management, crc, sr, admin, user;

CREATE USER management IDENTIFIED BY 'bairwaysm';
CREATE USER crc IDENTIFIED BY 'bairwaysc';
CREATE USER sr IDENTIFIED BY 'bairwayss';
CREATE USER admin IDENTIFIED BY 'bairwaysa';
CREATE USER user IDENTIFIED BY 'bairwaysu';

GRANT SELECT ON `route_with_airports` TO management, sr, user;
GRANT SELECT ON `user_auth` TO management, sr, crc,admin, user;

GRANT SELECT ON `bookings_by_passenger_type` TO management;
GRANT SELECT ON `revenue_by_aircraft_model_and_month` TO management; 
GRANT SELECT ON `passenger_destination` TO management; 
GRANT SELECT ON `scheduled_flight_details` TO management; 
GRANT SELECT ON `passengers_with_routes` TO management; 

GRANT SELECT, INSERT, UPDATE ON `scheduled_flight` TO crc;
GRANT SELECT ON `aircraft_details` TO crc;

GRANT SELECT, INSERT, UPDATE ON `price` TO sr;
GRANT SELECT, INSERT, UPDATE ON `account_type` TO sr;
GRANT SELECT ON `traveler_class` TO sr;
GRANT SELECT ON `route` TO sr;
GRANT EXECUTE ON PROCEDURE routes_with_no_prices TO sr;

GRANT SELECT, INSERT, UPDATE ON `aircraft_model` TO admin;
GRANT SELECT, INSERT, UPDATE ON `aircraft` TO admin;
GRANT SELECT, INSERT, UPDATE ON `region` TO admin;
GRANT SELECT, INSERT, UPDATE ON `airport` TO admin;
GRANT SELECT, INSERT, UPDATE ON `employee` TO admin;
GRANT SELECT, INSERT, UPDATE ON `designation` TO admin;
GRANT SELECT, INSERT, UPDATE ON `seat_map` TO admin;
GRANT SELECT, INSERT, UPDATE ON `title` TO admin;
GRANT SELECT, INSERT, UPDATE ON `traveler_class` TO admin;
GRANT SELECT, INSERT, UPDATE ON `route` TO admin;

GRANT SELECT ON `aircraft_model` TO user;
GRANT SELECT ON `aircraft` TO user;
GRANT SELECT ON `scheduled_flight` TO user;
GRANT SELECT ON `scheduled_flights_list` TO user;
GRANT SELECT ON `user` TO user;
GRANT SELECT ON `account_type` TO user;
GRANT SELECT ON `title` TO user;
GRANT SELECT ON `traveler_class` TO user;
GRANT SELECT ON `airport` TO user;
GRANT SELECT ON `route` TO user;
GRANT SELECT ON `price` TO user;
GRANT SELECT ON `seat_map` TO user;
GRANT INSERT ON `guest` TO user;
GRANT SELECT, INSERT ON `passenger` TO user;
GRANT SELECT, INSERT, UPDATE ON `booking` TO user;
GRANT SELECT, INSERT, UPDATE ON `registered_user` TO user;
GRANT SELECT, INSERT, UPDATE, DELETE ON `reserved_seat` TO user;
GRANT EXECUTE ON FUNCTION generate_airport_address TO user;
GRANT EXECUTE ON PROCEDURE get_user_bookings TO user;
GRANT EXECUTE ON PROCEDURE get_passenger_and_seat_details TO user;
GRANT EXECUTE ON PROCEDURE generate_seat_map TO user;
GRANT EXECUTE ON FUNCTION get_available_seats TO user;

FLUSH PRIVILEGES;