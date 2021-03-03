const { pool } = require(`../database/connection`);

/**
 * Fetches all the regions
 *
 * @returns {object} Promise of a query output
 * @throws Error
 */
const getAllRegions = async () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((error, connection) => {
			if (error) {
				reject(new Error(error.message));
			}
			connection.query(
				'SELECT `id`, `name`, `region_type`, `parent_id` FROM `region` WHERE `is_deleted`=0',
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
 * Create new region 
 *
 * @returns {object} Promise of a query output
 * @throws Error
 */
const createRegion = async (payload = { name: null, code: null, parent_region_id: null }) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((error, connection) => {
			if (error) {
				reject(new Error(error.message));
			}
			let allowedFields = ['name', 'region_type','parent_id'];
			let fields = [];
			let values = [];
			allowedFields.forEach((key) => {
				if (payload[key] != null) {
					fields.push(`${key}`);
					values.push(payload[key]);
				}
			});
            console.log(fields.join());
            console.log(`INSERT INTO region ( ${fields.join()} ) VALUES ( ${fields.map(() => '?').join()} )`);
			connection.query(
				`INSERT INTO region ( ${fields.join()} ) VALUES ( ${fields.map(() => '?').join()} )`, 
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
 * Update the region given by the id
 *
 * @returns {object} Promise of a query output
 * @throws Error
 */
const updateRegion = async (id, payload = { name: null, code: null }) => {
	let allowedFields = ['name', 'region_type','parent_id'];
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
				`UPDATE region
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
 * Delete an region given by ID
 *
 * @param {string} id
 * @returns {Promise<object>} Promise of a query output
 * @throws Error
 */
const deleteRegion = async (id) => {
	return new Promise((resolve, reject) => {
		pool.query('UPDATE region SET is_deleted = 1 WHERE id = ?', [parseInt(id)], (error, result) => {
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

module.exports = {
	createRegion,
    getAllRegions,
	updateRegion,
	deleteRegion,
};

