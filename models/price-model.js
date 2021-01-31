const { pool } = require(`../database/connection`);

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
    updatePriceForRoute,
    updateDiscount
}