const { pool } = require(`../database/connection`);

async function findUserByEmail(accType,email){
    return new Promise((resolve, reject) => {
        pool(accType).query('SELECT * FROM user_auth WHERE email = ? AND is_deleted = ?',
            [email,0],
            function (error, results) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    });
}


module.exports = {
    findUserByEmail
};
