const { pool } = require('../database/connection');



async function getRoute(routeId){
        return new Promise((resolve,reject)=>{
            const result = pool.query('SELECT * FROM route_with_airports WHERE id = ?',
                [routeId],
                function (error, results) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        });
    }

async function getRoutes(origin_code=undefined,destination_code=undefined,order=undefined,limit=undefined){
        let whereClause = '';
        let variableNames = [];
        let variableValues = [];
        let sql = 'SELECT * FROM route_with_airports';
        if (origin_code!==undefined || destination_code!==undefined){
            whereClause = ' WHERE ';
            if (origin_code !== undefined) {
                variableNames.push('origin_code = ?');
                variableValues.push(origin_code);
            }
            if (destination_code !== undefined) {
                variableNames.push('destination_code = ?');
                variableValues.push(destination_code);
            }
            (variableNames.length === 1) ? whereClause += variableNames[0] :
                whereClause += variableNames.join(' AND ');
        }
        sql += whereClause;
        if (order!==undefined){
            let orderClause = ' ORDER BY '+order;
            sql+=orderClause;
        }
        if (limit!==undefined){
            let limitClause = ' LIMIT '+limit;
            sql+=limitClause;
        }
        console.log(sql,variableValues);
        return new Promise((resolve,reject)=>{
            const result = pool.query(sql,variableValues,
                function (error, results) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        });
    }



module.exports = {
    getRoute,getRoutes
};