const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Route d'inscription
router.post('/register', userCtrl.register);

// Route de connexion
router.post('/login', userCtrl.login);

module.exports = router;
