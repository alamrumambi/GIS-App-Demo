const router = require('express').Router();
const authentication = require('../middlewares/auth');

router.use('/users', require('./user'));
router.use('/nodes', authentication, require('./node'));

module.exports = router;