const { pool } = require(`../database/connection`);

/**
 * Fetches all the bookings categorized by the passenger type from the database
 *
 * @param {string} origin default undefined
 * @param {string} destination default undefined
 * @param {string} aircraftID default undefined
 * @param {string} aircraftModel default undefined
 * @returns {Promise<object>} query output
 * @throws Error -database connection error
 */
async function getScheduledFlights(
	accType,
	flightID = undefined,
	origin = undefined,
	destination = undefined,
	aircraftID = undefined,
	aircraftModel = undefined,
	passengers = undefined,
	isDeleted = undefined
) {
	return new Promise((resolve, reject) => {
		//building the where clause
		let whereClause = '';
		let variableNames = [];
		let variableValues = [];
		if (
			origin !== undefined ||
			destination !== undefined ||
			aircraftID !== undefined ||
			aircraftModel !== undefined ||
			passengers !== undefined ||
			isDeleted !== undefined ||
			flightID !== undefined
		) {
			whereClause = ' WHERE ';
			if (origin !== undefined) {
				variableNames.push('origin_code = ?');
				variableValues.push(origin);
			}
			if (destination !== undefined) {
				variableNames.push('destination_code = ?');
				variableValues.push(destination);
			}
			if (aircraftID !== undefined) {
				variableNames.push('aircraft_id = ?');
				variableValues.push(aircraftID);
			}
			if (aircraftModel !== undefined) {
				variableNames.push('aircraft_model = ?');
				variableValues.push(aircraftModel);
			}
			if (passengers !== undefined) {
				variableNames.push('available_seats > ?');
				variableValues.push(passengers);
			}
			if (isDeleted !== undefined) {
				variableNames.push('is_deleted = ?');
				variableValues.push(isDeleted);
			}
			if (flightID !== undefined) {
				variableNames.push('id = ?');
				variableValues.push(flightID);
			}
			variableNames.length == 1
				? (whereClause += variableNames[0])
				: (whereClause += variableNames.join(' AND '));
		}

		//fetching data from the database
		pool(accType).query('SELECT * FROM scheduled_flights_list' + whereClause, variableValues, function (error, results) {
			if (error) {
				reject(new Error(error.message));
			}
			resolve(results);
		});
	});
}

/**
 * get schedueld flights for CRC
 *
 * @param {number} isDeleted - to get deleted records
 *
 * @returns {Promise<object>} query output
 */
const getScheduledFlightsForCRC = async (accType,isDeleted = undefined) => {
	isDeleted = isDeleted ? isDeleted : 0;
	return new Promise((resolve, reject) => {
		pool(accType).query(
			'SELECT id, route, departure, arrival, assigned_aircraft_id AS assignedAircraftId, delayed_departure AS delayedDeparture FROM `scheduled_flight` WHERE is_deleted = ?',
			[isDeleted],
			function (error, results) {
				if (error) {
					reject(new Error(error.message));
				}
				resolve(results);
			}
		);
	});
};

/**
 * Delete a flight schedule given an ID
 *
 * @param {string} id
 * @returns {Promise<object>} Promise of a query output
 * @throws Error
 */
const deleteScheduledFlight = async (accType,id) => {
  return new Promise((resolve, reject) => {
    pool(accType).query(
      "UPDATE scheduled_flight SET is_deleted = 1 WHERE id = ?",
      [parseInt(id)],
      (error, result) => {
        if (error) reject(error);
        else {
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
 * @returns {Promise<object>} Promise of a query output
 * @throws Error
 */
const addScheduledFlight = async (
	accType,
	payload = {
		route: undefined,
		departure: undefined,
		arrival: undefined,
		assignedAircraftId: undefined,
		delayedDeparture: '0',
	}
) => {
	let fields = [];
	let values = [];
	let allowedFields = ['route', 'departure', 'arrival', 'assignedAircraftId', 'delayedDeparture'];
	let placeholders = [];

	allowedFields.forEach((key) => {
		if (payload[key] != null) {
			let updatedKey = key.split(/(?=[A-Z])/).join('_');
			fields.push(`${updatedKey.toLowerCase()}`);
			values.push(payload[key]);
			placeholders.push('?');
		}
	});

	return new Promise((resolve, reject) => {
		pool(accType).query(
			`INSERT INTO scheduled_flight (${fields.join()}) VALUES (${placeholders.join()})`,
			values,
			(error, result) => {
				if (error) reject(error);
				else {
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
 * @returns {Promise<object>} Promise of a query output
 * @throws Error
 */
const updateScheduledFlight = async (
	accType,
	id,
	payload = {
		route: null,
		departure: null,
		arrival: null,
		assignedAircraftId: null,
		delayedDeparture: null,
	}
) => {
	let fields = [];
	let values = [];
	let allowedFields = ['route', 'departure', 'arrival', 'assignedAircraftId', 'delayedDeparture'];

	allowedFields.forEach((key) => {
		if (payload[key] != null) {
			let updatedKey = key.split(/(?=[A-Z])/).join('_');
			fields.push(`${updatedKey.toLowerCase()} = ? `);
			values.push(payload[key]);
		}
	});
	console.log(`UPDATE scheduled_flight
  SET ${fields.join()}
  WHERE id = ?`);
	return new Promise((resolve, reject) => {
		pool(accType).query(
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
	getScheduledFlightsForCRC,
	deleteScheduledFlight,
	addScheduledFlight,
	updateScheduledFlight,
};
