const { pool } = require(`../database/connection`);
const encryptor = require('../utils/crypto');

async function createGuest(title,firstName,lastName,gender,email){
    return new Promise((resolve, reject) => {
        const result = pool.query("INSERT INTO guest(title,first_name,last_name,gender,email) VALUES " +
            "(?,?,?,?,?)" ,
            [
                title,
                encryptor.encrypt(firstName),
                encryptor.encrypt(lastName),
                gender,
                encryptor.encrypt(email)
            ],
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

module.exports = {
    createGuest
};
