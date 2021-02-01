const { pool } = require('../database/connection');

class User {

    static findUndeletedById(userId){
        return new Promise((resolve,reject)=>{
            const result = pool.query('SELECT id,title,first_name,last_name,email,gender,account_type_id FROM user WHERE id = ? AND is_deleted = ?',
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
            //const result = pool.query("INSERT INTO user(title,first_name,last_name,email,gender,password,account_type_id) VALUES ((SELECT id from title where title_name = ?),?,?,?,?,?,?)"
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

    static updateById(params,userId){
        let variableValues=[];
        let sql = "UPDATE user SET ";
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



}

module.exports = User;