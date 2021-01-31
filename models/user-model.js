const { pool } = require(`../database/connection`);

/**
 * Fetches all the bookings categorized by the passenger type from the database
 *
 * @param {string} id default undefined
 * @returns {object} promise object
 * @throws Error
 */
exports.deleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE user SET is_deleted=1 WHERE id = ?",
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
