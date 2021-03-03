// const { pool }  = require(`./database/connection`);


// async function getAircraft() {
//     return new Promise((resolve, reject) => {
//         const result = pool(undefined).query("CREATE USER ?@? IDENTIFIED BY ?",
//             ['hello','localhost', 'bairwaysm'],
//             function (error, results, fields) {
//                 console.log(result.sql)
//                 if (error) {
//                     console.log(error.sql)
//                     reject(new Error(error.message));
//                 }
//                 resolve(results);
//             }
//         );
//     })
// }

// getAircraft().then(result => {console.log(result)});

const dbinit = require('./database/db-initialize');

dbinit().then(()=> console.log('done'));