const bcrypt = require('bcrypt');

const hashing = (password) => {
    return bcrypt.hashSync(password, 2);
}

const compare = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
    hashing,
    compare
}