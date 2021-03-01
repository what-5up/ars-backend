const { pool } = require(`../database/connection`);

/**
 * get all the account types from the database
 */
async function getAllAccountTypes() {
  return new Promise((resolve, reject) => {
    const result = pool.query("SELECT * FROM account_type",
      function (error, results) {
        if (error) {
          console.log(result.sql);
          reject(new Error(error.message));
        }
        resolve(results);
      }
    )
  })
}

/**
 * Add an new account type
 *
 * @param {object} payload containing attributes
 * @returns {Promise<object>} Promise of a query output
 * @throws Error
 */
const addAccountType = async (
  payload = {
    accountTypeName: undefined,
    discount: undefined,
    criteria: undefined,
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
      `INSERT INTO account_type (${fields.join()}) VALUES (${placeholders.join()})`,
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
* Update an account type
*
* @param {int} id 
* @param {object} payload parameters to change
* @returns {Promise<object>} Promise of a query output
* @throws Error
*/
const updateAccountType = async (
  id,
  payload = {
    accountTypeName: undefined,
    discount: undefined,
    criteria: undefined
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
      `UPDATE account_type
        SET ${fields.join()}
        WHERE id = ?`,
      [...values, id],
      (error, result) => {
        if (error) reject(error);
        if (result.affectedRows < 1) reject('Cannot find an account type for the given id');
        else {
          resolve(result);
        }
      }
    );
  });
};

/**
 * Delete an account type of the given an ID
 *
 * @param {string} id
 * @returns {Promise<boolean>} Promise of a query output
 * @throws Error
 */
const deleteAccountType = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE account_type SET is_deleted = 1 WHERE id = ?",
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



module.exports = {
  getAllAccountTypes,
  addAccountType,
  updateAccountType,
  deleteAccountType
};