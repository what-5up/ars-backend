const { pool } = require(`../database/connection`);

async function getAllTitles(){
    return new Promise((resolve, reject) => {
        const result = pool.query("SELECT * FROM title",
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
    getAllTitles
};