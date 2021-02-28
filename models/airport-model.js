const { pool } = require(`../database/connection`);

/**
 * Fetches all the airports with region from the database
 *
 * @returns {object} Promise of a query output
 * @throws Error
 */
const getAllAirports = async () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((error, connection) => {
			if (error) {
				reject(new Error(error.message));
			}
			connection.query(
				'SELECT `id`, `name`, `code`, generate_airport_address(`code`) AS address FROM `airport` WHERE `is_deleted`=0',
				[],
				(error, results) => {
					connection.release();
					if (error) {
						reject(new Error(error.message));
					}
					resolve(results);
				}
			);
		});
	});
};

/**
 * Create new airport with region id
 *
 * @returns {object} Promise of a query output
 * @throws Error
 */
const createAirport = async (payload = { name: null, code: null, parent_region_id: null }) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((error, connection) => {
			if (error) {
				reject(new Error(error.message));
			}
			let allowedFields = ['name', 'code','parent_region_id'];
			let fields = [];
			let values = [];
			allowedFields.forEach((key) => {
				if (payload[key] != null) {
					fields.push(`${key}`);
					values.push(payload[key]);
				}
			});
            console.log(fields.join());
            console.log(`INSERT INTO airport ( ${fields.join()} ) VALUES ( ${fields.map(() => '?').join()} )`);
			connection.query(
				`INSERT INTO airport ( ${fields.join()} ) VALUES ( ${fields.map(() => '?').join()} )`, 
				values,
				(error, results) => {
					connection.release();
					if (error) {
						reject(new Error(error.message));
					}
					resolve(results);
				}
			);
		});
	});
};

/**
 * Update the airport given by the id
 *
 * @returns {object} Promise of a query output
 * @throws Error
 */
const updateAirport = async (id, payload = { name: null, code: null }) => {
	let allowedFields = ['name', 'code'];
	let fields = [];
	let values = [];
	allowedFields.forEach((key) => {
		if (payload[key] != null) {
			fields.push(`${key} = ?`);
			values.push(payload[key]);
		}
	});
	return new Promise((resolve, reject) => {
		pool.getConnection((error, connection) => {
			if (error) {
				reject(new Error(error.message));
			}
			connection.query(
				`UPDATE airport
            SET ${fields.join()}
            WHERE id = ?`,
				[...values, id],
				(error, results) => {
					connection.release();
					if (error) {
						reject(new Error(error.message));
					}
					resolve(results);
				}
			);
		});
	});
};

/**
 * Delete an airport given by ID
 *
 * @param {string} id
 * @returns {Promise<object>} Promise of a query output
 * @throws Error
 */
const deleteAirport = async (id) => {
	return new Promise((resolve, reject) => {
		pool.query('UPDATE airport SET is_deleted = 1 WHERE id = ?', [parseInt(id)], (error, result) => {
			if (error) reject(error);
			else {
				if (result.affectedRows == 1) {
					resolve(true);
				} else {
					resolve(false);
				}
			}
		});
	});
};

const Airport = {
	createAirport,
    getAllAirports,
	updateAirport,
	deleteAirport,
};

module.exports = Airport;
