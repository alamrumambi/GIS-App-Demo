const { User } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class Controller {
    static async login(req, res) {
        const { username, password } = req.body;
    
        const user = await User.findOne({ where: { username } });
        if (!user || !compare(password, user.password)) res.status(400).json({ message: 'invalid username/ password' });
        else {
            const token = generateToken(user);
            res.status(200).json({ token });
        }
    }

}

module.exports = Controller;