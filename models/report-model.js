const { pool } = require(`../database/connection`);

/**
 * Fetches all the bookings categorized by the passenger type from the database
 *
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getBookingsByPassengerType() {
  return new Promise((resolve, reject) => {
    const result = pool.query(
      "SELECT ac.account_type_name as account_type, COUNT(*) as number_of_bookings FROM booking b INNER JOIN user u ON b.user_id = u.id INNER JOIN account_type ac ON u.account_type_id = ac.id GROUP BY ac.id",
      [],
      function (error, results) {
        if (error) {
          reject(new Error(error.message));
        }
        resolve(results);
      }
    );
  });
}

/**
 * Fetches all the past flights, states and passenger counts
 *
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getPastFlightsDetails() {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM scheduled_flight_details",
      function (error, results) {
        if (error) {
          reject(new Error(error.message));
        }
        resolve(results);
      }
    );
  });
}

module.exports = {
  getBookingsByPassengerType, getPastFlightsDetails
};
