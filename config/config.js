require('dotenv').config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_DB;
const port = process.env.PORT || 3306;
const encryptPassword = process.env.SECRET || 'password';

module.exports = {
    host,
    user,
    password,
    database,
    port,
    encryptPassword
}