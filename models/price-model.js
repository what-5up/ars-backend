const { pool } = require(`../database/connection`);

/**
 * Fetch all the ticket prices with their classes
 * 
 * @return {Promise<object>} query output
 * @throws {Error} - database connection error
 */
async function fetchAllTicketPrices() {
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
 * @param {string} route - route of the ticket prices to be fetched
 * @return {Promise<object>} query output
 * @throws {Error} - database connection error
 */
async function fetchTicketPrices(route) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT tc.class AS traveler_class, p.amount AS price FROM price p INNER JOIN traveler_class tc ON p.traveler_class = tc.id INNER JOIN route_with_airports r ON p.route_id = r.id WHERE r.id = ?",
            [route],
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
 * Update Price for given route
 * 
 * @returns {object} Promise of a query output
 * @throws Error
 */
const updatePriceForRoute = async (id, travellerClass, price) => {
    return new Promise((resolve, reject) => {
        const result = pool.query('UPDATE price SET price = ? WHERE route_id = ? AND traveller_class = ?',
            [price, id, travellerClass],
            (error, results, fields) => {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}

/**
 * Update Discount Price for given account type
 * 
 * @returns {object} Promise of a query output
 * @throws Error
 */
// TODO: this must be put in a different file
const updateDiscount = async (id, discount) => {
    return new Promise((resolve, reject) => {
        const result = pool.query('UPDATE account_type SET discount = ? WHERE id = ?',
            [discount, id],
            (error, results, fields) => {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}

module.exports = {
    fetchAllTicketPrices,
    fetchTicketPrices,
    updatePriceForRoute,
    updateDiscount
}