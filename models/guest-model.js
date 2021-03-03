const { pool } = require(`../database/connection`);

async function createGuest(accType,title,firstName,lastName,gender,email){
    return new Promise((resolve, reject) => {
        const result = pool(accType).query("INSERT INTO guest(title,first_name,last_name,gender,email) VALUES " +
            "(?,?,?,?,?)" ,
            [
                title,
                firstName,
                lastName,
                gender,
                email
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
