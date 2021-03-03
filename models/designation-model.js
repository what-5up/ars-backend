const { pool } = require(`../database/connection`);

/**
 * get all the designations from the database
 */
async function getAllDesignations(accType) {
  return new Promise((resolve, reject) => {
    const result = pool(accType).query("SELECT * FROM designation WHERE is_deleted = 0",
      function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    )
  })
}

/**
 * Add an new designation
 *
 * @param {object} payload containing attributes
 * @returns {Promise<object>} Promise of a query output
 * @throws Error
 */
const addDesignation = async (accType,
  payload = {
    name: undefined,
    privilege: undefined
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
    pool(accType).query(
      `INSERT INTO designation (${fields.join()}) VALUES (${placeholders.join()})`,
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
* Update an designation
*
* @param {int} id 
* @param {object} payload parameters to change
* @returns {Promise<object>} Promise of a query output
* @throws Error
*/
const updateDesignation = async (accType,
  id,
  payload = {
    name: undefined,
    privilege: undefined
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
    pool(accType).query(
      `UPDATE designation
        SET ${fields.join()}
        WHERE id = ?`,
      [...values, id],
      (error, result) => {
        if (error) reject(error);
        if (result.affectedRows < 1) reject('Cannot find an designation for the given id');
        resolve(result);
      }
    );
  });
};

/**
 * Delete an designation of the given an ID
 *
 * @param {string} id
 * @returns {Promise<boolean>} Promise of a query output
 * @throws Error
 */
const deleteDesignation = async (accType,id) => {
  return new Promise((resolve, reject) => {
    pool(accType).query(
      "UPDATE designation SET is_deleted = 1 WHERE id = ?",
      [parseInt(id)],
      (error, result) => {
        if (error) reject(error);
        else {
          if (error) reject(error);
          if (result.affectedRows < 1) reject('Cannot find an designation for the given id');
          if (result.changedRows < 1) reject('designation of the given id is already deleted');
          resolve(true);
        }
      }
    );
  });
};

module.exports = {
  getAllDesignations,
  addDesignation,
  updateDesignation,
  deleteDesignation
};