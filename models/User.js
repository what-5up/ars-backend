const { pool } = require('../database/connection');

class User {

    static isEmailRegistered(email){
        return new Promise((resolve,reject)=>{
            const result = pool.query('SELECT id FROM user WHERE email = ?',
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

    static createUser(title,firstName,lastName,email,gender,password,accountTypeId) {
        return new Promise((resolve, reject) => {
            const result = pool.query("INSERT INTO user(title,first_name,last_name,email,gender,password,account_type_id) VALUES (?,?,?,?,?,?,?)",
                [
                    title,
                    firstName,
                    lastName,
                    email,
                    gender,
                    password,
                    accountTypeId
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



}

module.exports = User;