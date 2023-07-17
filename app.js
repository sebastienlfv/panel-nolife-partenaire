const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
dotenv.config()

const { Sequelize } = require('sequelize');
const userModel = require('./models/user')

// import routes
const userRoutes = require('./routes/user')


// connexion à la BDD
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
})

sequelize.authenticate()
  .then(() => {
    console.log("Connexion à la BDD");

    // Synchronize user models
    userModel.sync({ force: false })
      .then(() => {
        console.log("La table 'User' à été synchroniser avec succès");
      })
      .catch(error => {
        console.log("Une erreur est survenue lors de la synchronisation de la table 'User'", error);
      })
  })
  .catch(() => {
    console.log("Connexion à la BDD raté");
})

// CORS
app.use(cors())

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes

app.use('/api/auth', userRoutes)

module.exports = app;
