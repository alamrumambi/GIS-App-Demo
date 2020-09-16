const { verify } = require('../helpers/jwt');

const authentication = (req, res, next) => {
    const { token } = req.headers;

    if(!token) res.status(404).json({ message: 'Token Not Found' });

    try {
        req.userData = verify(token);
        next();
    } catch(err) {
        err.message ? res.status(500).json(err.message) : res.status(401).json({ message: 'Unauthenticate' });
    }
}

module.exports = authentication;