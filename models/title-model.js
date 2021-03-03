const { pool } = require(`../database/connection`);

async function getAllTitles(accType){
    return new Promise((resolve, reject) => {
        const result = pool(accType).query("SELECT * FROM title",
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

async function getTitleById(accType,titleId){
    return new Promise((resolve,reject)=>{
        const result = pool(accType).query('SELECT * FROM title WHERE id = ?',
            [titleId],
            function (error, results) {
                if (error) {
                    reject (new Error(error.message));
                }
                resolve(results);
            }
        )
    });
}

async function updateTitleById(accType,titleName,titleId){
    let sql = "";
    let variableValues=[];
    if (titleName!==null){
        sql+="UPDATE title SET title_name = ? WHERE id = ?";
        variableValues.push(titleName,titleId);
    }
    return new Promise((resolve,reject)=>{
        const result = pool(accType).query(sql,
            variableValues,
            function (error, results) {
                if (error) {
                    console.log(result.sql);
                    reject (new Error(error.message));
                }
                resolve(results);
            }
        )
    });

}

module.exports = {
    getAllTitles,
    getTitleById,
    updateTitleById
};