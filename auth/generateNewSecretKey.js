
const crypto = require('crypto');
const config = require('../config.json');

const secretKeyLength = config.encryption.secret_key_length;
const secretKeyEncoding = config.encryption.secret_key_encoding;

const newSecretKey = crypto.randomBytes(secretKeyLength)
							.toString(secretKeyEncoding);
							
console.log(newSecretKey);
