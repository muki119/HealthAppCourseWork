const { Sequelize } = require('sequelize');

const database = new Sequelize({
    logging: false,
    dialect: 'postgres',
    host:process.env.DATABASE_HOST,
    database: process.env.DATABASE_DBNAME,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD
})


database.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((err) => {
    console.log("Unable to connect to the database: ", err);
});

module.exports = database;