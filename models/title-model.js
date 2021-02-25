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

async function updateTitleById(titleName,titleId){
    let sql = "";
    let variableValues=[];
    if (titleName!==null){
        sql+="UPDATE title SET title_name = ? WHERE id = ?";
        variableValues.push(titleName,titleId);
    }
    return new Promise((resolve,reject)=>{
        const result = pool.query(sql,
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
    updateTitleById
};