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
      "UPDATE registered_user SET is_deleted=1 WHERE id = ?",
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

async function findUndeletedById(userId){
    return new Promise((resolve,reject)=>{
        const result = pool.query('SELECT id,title,first_name,last_name,email,gender,account_type_id FROM registered_user WHERE id = ? AND is_deleted = ?',
            [userId,0],
            function (error, results) {
                if (error) {
                    reject (new Error(error.message));
                }
                resolve(results);
            }
        )
    });
}

async function isEmailRegistered(email){
    return new Promise((resolve,reject)=>{
        const result = pool.query('SELECT id FROM registered_user WHERE email = ?',
            [email],
            function (error, results) {
                if (error) {
                    reject (new Error(error.message));
                }
                resolve(results.length===1);
            }
        )
    });
}

async function createUser(title,firstName,lastName,email,gender,password) {
    return new Promise((resolve, reject) => {
        const result = pool.query("INSERT INTO registered_user(title,first_name,last_name,email,gender,password) VALUES " +
            "(?,?,?,?,?,?)" ,
            [
                title,
                firstName,
                lastName,
                email,
                gender,
                password
            ],
            function (error, results, fields) {
                if (error) {
                    console.log(result.sql);
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        )
    })
}

async function updateById(params,userId){
    let variableValues=[];
    let sql = "UPDATE registered_user SET ";
    for (const[key, value] of Object.entries(params)) {
        if (value!==null){
            sql += key+" = ?, ";
            variableValues.push(value);
        }
    }
    sql = sql.slice(0,-2);
    sql += " WHERE id = ?";
    variableValues.push(userId);
    console.log(sql);
    console.log(variableValues);
    return new Promise((resolve,reject)=>{
        const result = pool.query(sql,
            variableValues,
            function (error, results) {
                if (error) {
                    console.log(result.sql);
                    reject (new Error(error.message));
                }
                resolve(results);
            }
        )
    });
}

/**
 * get discount of user
 * 
 * @param {string} user_id default undefined
 * @returns {object} Promise of a query output
 * @throws Error
 */
async function getUserDiscount(user_id, connection = pool) {
    return new Promise((resolve, reject) => {
        //fetching data from the database
        const result = connection.query('SELECT u.id, at.discount FROM user AS u LEFT JOIN registered_user AS ru ON u.id = ru.id LEFT JOIN account_type AS at ON ru.account_type_id = at.id  WHERE u.id = ?;',
            [user_id],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                if (connection == pool) {
                    resolve(results[0]);
                }
                else {
                    resolve({ results: results[0], connection: connection });
                }

            }
        );
    })
}

module.exports = {
findUndeletedById,
isEmailRegistered,
createUser,
updateById,
getUserDiscount
};


