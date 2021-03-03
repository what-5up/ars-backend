var mysql = require('mysql');
const config = require('../config/config');
const {AccountTypesEnum} = require('../utils/constants')

const managementPool = mysql.createPool({
    connectionLimit: 1,
    user: config.managementUser,
    host: config.host,
    password: config.managementPass,
    port: config.port,
    database: config.database
});


const crcPool = mysql.createPool({
    connectionLimit: 1,
    user: config.crcUser,
    host: config.host,
    password: config.crcPass,
    port: config.port,
    database: config.database
});

const srPool = mysql.createPool({
    connectionLimit: 1,
    user: config.srUser,
    host: config.host,
    password: config.srPass,
    port: config.port,
    database: config.database
});

const adminPool = mysql.createPool({
    connectionLimit: 1,
    user: config.adminUser,
    host: config.host,
    password: config.adminPass,
    port: config.port,
    database: config.database
});

const userPool = mysql.createPool({
    connectionLimit: 3,
    user: config.userUser,
    host: config.host,
    password: config.userPass,
    port: config.port,
    database: config.database
});

const pool = (type) => {
    switch(type) {
        case AccountTypesEnum.MANAGEMENT: return managementPool;
        case AccountTypesEnum.CREW_SCHEDULE_COORDINATOR: return crcPool;
        case AccountTypesEnum.SALES_REPRESENTATIVE: return srPool;
        case AccountTypesEnum.ADMIN: return adminPool;
        default: return userPool;
    }
}


module.exports.pool = pool;