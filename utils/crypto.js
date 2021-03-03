const crypto = require('crypto');
const config = require('../config/config');

/**
 * Stretch the string 's' to an arbitrary size using the PBKDF2 algorithm
 * 
 * @param {string} s string needed to stretch
 * @param {string} salt salt for the algorithm
 * @param {int} outputLength length of the stretched string
 * 
 * @returns {string} streched string
 */
const stretchString = (s, salt, outputLength) => {
    return crypto.pbkdf2Sync(s, salt, 100000, outputLength, 'sha512');
}

// 
/**
 * Stretches the password in order to generate a key 
 * 
 * @param {string} password 
 * 
 * @returns {object} data
 * @returns {string} data.cipherKey
 * @returns {string} data.hashingSalt
 */
const keyFromPassword = (password) => {
    const keyPlusHashingSalt = stretchString(password, 'salt', 24 + 48);
    return {
        cipherKey: keyPlusHashingSalt.slice(0, 24),
        hashingSalt: keyPlusHashingSalt.slice(24)
    };
}

/**
 * Encrypts data using the key
 * 
 * @param {string} sourceData 
 */
const encrypt = (sourceData) => {
    const key = keyFromPassword(config.encryptPassword);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv('aes-192-cbc', key.cipherKey, iv);
    let encrypted = cipher.update(sourceData, 'binary', 'binary');
    encrypted += cipher.final('binary');
    return encrypted;
}


/**
 * Decrypts data using the key
 * 
 * @param {string} encryptedData 
 */
const decrypt = (encryptedData) => {
    const key = keyFromPassword(config.encryptPassword);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv('aes-192-cbc', key.cipherKey, iv);
    let decrypted = decipher.update(encryptedData, 'binary', 'binary');
    decrypted += decipher.final('binary');
    return decrypted;
}

module.exports = {
    encrypt,
    decrypt
}

