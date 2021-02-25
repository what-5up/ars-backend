const { pool } = require(`../database/connection`);

async function getAllAccountTypes(){
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

module.exports = {
    getAllAccountTypes
};