const { pool } = require(`../database/connection`);

/**
 * get all the employees from the database
 */
async function getAllEmployees() {
    return new Promise((resolve, reject) => {
        const result = pool.query("SELECT id, title, first_name, last_name, email, designation_id FROM `employee` WHERE is_deleted = 0",
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

async function getEmployee(empId) {
    return new Promise((resolve, reject) => {
        const result = pool.query('SELECT title_name, first_name, last_name, email, d.name as designation FROM employee e INNER JOIN title t ON e.title = t.id INNER JOIN designation d ON e.designation_id = d.id WHERE e.id = ?',
            [empId],
            function (error, results) {
                if (error) {
                    reject(error);
                }
                console.log(result.sql)
                resolve(results);
            }
        )
    })
}

/**
 * Add an new employee
 *
 * @param {object} payload containing attributes
 * @returns {Promise<object>} Promise of a query output
 * @throws Error
 */
const addEmployee = async (
    payload = {
        title: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        designationId: undefined
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
            `INSERT INTO employee (${fields.join()}) VALUES (${placeholders.join()})`,
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
* Update an employee of the given id
*
* @param {int} id 
* @param {object} payload parameters to change
* @returns {Promise<object>} Promise of a query output
* @throws Error
*/
const updateEmployee = async (
    id,
    payload = {
        title: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        designationId: undefined
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
            `UPDATE employee
        SET ${fields.join()}
        WHERE id = ?`,
            [...values, id],
            (error, result) => {
                if (error) reject(error);
                if (result.affectedRows < 1) reject('Cannot find an employee for the given id');
                resolve(result);
            }
        );
    });
};

/**
 * Delete an employee of the given id
 *
 * @param {string} id
 * @returns {Promise<boolean>} Promise of a query output
 * @throws Error
 */
const deleteAccountType = async (id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "UPDATE employee SET is_deleted = 1 WHERE id = ?",
            [parseInt(id)],
            (error, result) => {
                if (error) reject(error);
                if (result.affectedRows < 1) reject('Cannot find an employee for the given id');
                if (result.changedRows < 1) reject('Employee of the given id is already deleted');
                resolve(true);
            }
        );
    });
};

async function isEmailRegistered(email) {
    return new Promise((resolve, reject) => {
        const result = pool.query('SELECT id FROM employee WHERE email = ?',
            [email],
            function (error, results) {
                if (error) {
                    reject(error);
                }
                resolve(results.length === 1);
            }
        )
    });
}


module.exports = {
    getAllEmployees,
    getEmployee,
    addEmployee,
    updateEmployee,
    deleteAccountType,
    isEmailRegistered
};