const { pool }  = require(`./database/connection`);


async function getAircraft() {
    return new Promise((resolve, reject) => {
        const result = pool.query('SELECT * FROM aircraft_model',
            [],
            function (error, results, fields) {
                if (error) {
                    reject(new Error(error.message));
                }
                resolve(results);
            }
        );
    })
}

getAircraft().then(result => {console.log(result)});