const { pool } = require(`../database/connection`);

/**
 * Fetch all the ticket prices with their classes
 * 
 * @return {Promise<object>} query output
 * @throws {Error} - database connection error
 */
async function fetchAllRoutePrices() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT tc.class AS traveler_class, r.origin_code, r.origin, r.destination_code, r.destination, p.amount AS price FROM price p INNER JOIN traveler_class tc ON p.traveler_class = tc.id INNER JOIN route_with_airports r ON p.route_id = r.id",
            [],
            (error, results) => {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}

/**
 * Fetch all the ticket prices with their classes
 * 
 * @return {Promise<object>} query output
 * @throws {Error} - database connection error
 */
async function fetchRoutePriceOfScheduledFlights(flightIDs) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT `tc`.`class`, `p`.`amount`, `p`.`route_id` FROM `price` `p` INNER JOIN `traveler_class` `tc` ON `p`.traveler_class = `tc`.`id` WHERE `route_id` IN ( ? )",
            [flightIDs.join(', ')],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
}

/**
 * Fetch the ticket prices with their classes for a given route
 * 
 * @param {string} route - route of the ticket prices to be fetched
 * @return {Promise<object>} query output
 * @throws {Error} - database connection error
 */
async function fetchRoutePrice(route) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM price WHERE route_id = ?",
            [route],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
}

/**
 * Add a new route price 
 *
 * @param {object} payload containing attributes
 * @returns {Promise<object>} Promise of a query output
 * @throws Error
 */
const addRoutePrice = async (
    payload = {
        travellerClass: undefined,
        amount: undefined,
        routeId: undefined,
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
            `INSERT INTO price (${fields.join()}) VALUES (${placeholders.join()})`,
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
* Update a route price for the given credentials
*
* @param {int} id 
* @param {object} payload parameters to change
* @returns {Promise<object>} Promise of a query output
* @throws Error
*/
const updateRoutePrice = async (id, travellerClass, amount) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE price SET amount = ? WHERE route_id = ? AND traveler_class = ?',
            [amount, id, travellerClass],
            (error, result) => {
                if (error) return reject(error)
                if (result.affectedRows < 1) return reject('Cannot find an route price for the given credentials');
                resolve(result);
            }
        );
    });
}

/**
 * Delete a route price of the given credentials
 *
 * @param {string} id
 * @returns {Promise<boolean>} Promise of a query output
 * @throws Error
 */
const deleteRoutePrice = async (routeId, travellerClass) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "DELETE FROM price WHERE route_id = ? AND traveler_class = ?",
            [parseInt(routeId), parseInt(travellerClass)],
            (error, result) => {
                if (error) reject(error);
                else {
                    if (error) reject(error);
                    if (result.affectedRows < 1) reject('Cannot find an route price for the given credentials');
                    resolve(true);
                }
            }
        );
    });
};

module.exports = {
    fetchAllRoutePrices,
    fetchRoutePriceOfScheduledFlights,
    fetchRoutePrice,
    addRoutePrice,
    updateRoutePrice,
    deleteRoutePrice
}