const { pool } = require(`../database/connection`);

async function getAllTravelerClass(accType){
    return new Promise((resolve, reject) => {
        const result = pool(accType).query("SELECT * FROM traveler_class",
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
    getAllTravelerClass
};