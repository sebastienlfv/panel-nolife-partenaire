const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv')

dotenv.config()

const secretKey = process.env.SECRET_KEY

module.exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error : 'Informations manquantes !' });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ token, userId: user.id });
    } catch (error) {
        res.status(400).json({ error : 'Informations manquantes !' });
    }
};
