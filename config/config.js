require('dotenv').config();

const host = process.env.DB_HOST;
const database = process.env.DB_DB;

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const managementUser =  process.env.MANAGEMENT_USER;
const managementPass =  process.env.MANAGEMENT_PASS;

const srUser =  process.env.SR_USER;
const srPass =  process.env.SR_PASS;

const crcUser =  process.env.CRC_USER;
const crcPass =  process.env.CRC_PASS;

const adminUser =  process.env.ADMIN_USER;
const adminPass =  process.env.ADMIN_PASS;

const userUser =  process.env.USER_USER;
const userPass =  process.env.USER_PASS;

module.exports = {
    host, database,
    dbUser, dbPassword,
    managementUser, managementPass,
    srUser, srPass,
    crcUser, crcPass,
    adminUser, adminPass,
    userUser, userPass,
}