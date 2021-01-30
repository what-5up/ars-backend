const { pool } = require(`../database/connection`);

/**
 * Fetches all the bookings categorized by the passenger type from the database
 *
 * @param {string} origin default undefined
 * @param {string} destination default undefined
 * @param {string} aircraftID default undefined
 * @param {string} aircraftModel default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getScheduledFlights(
  origin = undefined,
  destination = undefined,
  aircraftID = undefined,
  aircraftModel = undefined
) {
  return new Promise((resolve, reject) => {
    //building the where clause
    let whereClause = "";
    let variableNames = [];
    let variableValues = [];
    if (
      origin !== undefined ||
      destination !== undefined ||
      aircraftID !== undefined ||
      aircraftModel !== undefined
    ) {
      whereClause = " WHERE ";
      if (origin !== undefined) {
        variableNames.push("origin = ?");
        variableValues.push(origin);
      }
      if (destination !== undefined) {
        variableNames.push("destination = ?");
        variableValues.push(destination);
      }
      if (aircraftID !== undefined) {
        variableNames.push("aircraft_id = ?");
        variableValues.push(aircraftID);
      }
      if (aircraftModel !== undefined) {
        variableNames.push("aircraft_model = ?");
        variableValues.push(aircraftModel);
      }
      variableNames.length == 1
        ? (whereClause += variableNames[0])
        : (whereClause += variableNames.join(" AND "));
    }

    //fetching data from the database
    const result = pool.query(
      "SELECT * FROM scheduled_flights_list" + whereClause,
      variableValues,
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
 * Delete a flight schedule given an ID
 *
 * @param {string} id
 * @returns {object} Promise of a query output
 * @throws Error
 */
const deleteScheduledFlight = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE scheduled_flight SET is_deleted = 1 WHERE id = ?",
      [parseInt(id)],
      (error, result) => {
        if (error) reject(error);
        else {
          console.log(result);
          if (result.affectedRows == 1) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
};

/**
 * Add a new flight schedule
 *
 * @param {object} payload containing attributes
 * @returns {object} Promise of a query output
 * @throws Error
 */
const addScheduledFlight = async (
  payload = {
    route: undefined,
    departure: undefined,
    assignedAirplaneId: undefined,
    delayedDeparture: "0",
  }
) => {
    let fields = [];
    let placeholders = [];
    let values = [];
    Object.keys(payload).forEach((key) => {
      if (payload[key] != null) {
        let updatedKey = key.split(/(?=[A-Z])/).join("_");
        fields.push(`${updatedKey}`);
        values.push(payload[key]);
        placeholders.push("?")
      }
    });
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO scheduled_flight (${fields.join()}) VALUES (${placeholders.join()})`,
      values,
      (error, result) => {
        if (error) reject(error);
        else {
          console.log(result);
          resolve(result);
        }
      }
    );
  });
};

/**
 * Update a scheduled flight
 *
 * @param {int} id 
 * @param {object} payload parameters to change
 * @returns {object} Promise of a query output
 * @throws Error
 */
const updateScheduledFlight = async (
  id,
  payload = {
    route: null,
    departure: null,
    assignedAirplaneId: null,
    delayedDeparture: null,
  }
) => {
  let fields = [];
  let values = [];
  Object.keys(payload).forEach((key) => {
    if (payload[key] != null) {
      let updatedKey = key.split(/(?=[A-Z])/).join("_");
      fields.push(`${updatedKey} = ?`);
      values.push(payload[key]);
    }
  });
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE scheduled_flight
      SET ${fields.join()}
      WHERE id = ?`,
      [...values, id],
      (error, result) => {
        if (error) reject(error);
        else {
          console.log(result);
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getScheduledFlights,
  deleteScheduledFlight,
  addScheduledFlight,
  updateScheduledFlight,
};
