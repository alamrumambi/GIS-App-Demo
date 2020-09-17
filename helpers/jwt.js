const jwt = require('jsonwebtoken');
const secretKey = 'hanyaUntukDemoAppTidakMasukKeDotenv';

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, secretKey);
}

const verify = (token) => {
    return jwt.verify(token, secretKey);
}

module.exports = {
    generateToken,
    verify
}