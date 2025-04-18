const { Sequelize } = require('sequelize');

const database = new Sequelize({
    dialect:'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'HealthAppDatabase',
    logging: false,
})

database.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((err) => {
    console.log("Unable to connect to the database: ", err);
});

module.exports = database;