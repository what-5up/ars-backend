const { pool } = require(`../database/connection`);
const encryptor = require('../utils/crypto');

async function findUserByEmail(email){
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM user_auth WHERE email = ? AND is_deleted = ?',
            [encryptor.encrypt(email),0],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}

console.log(findUserByEmail('roots@gmail.com'))

module.exports = {
    findUserByEmail
};
