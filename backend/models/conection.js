const Sequelize = require('sequelize')
const sequelize = new Sequelize('home_cloud', 'root', '', {
    host: "localhost",
    dialect: "mysql" //Tipo de banco de dados
}) //Nome do banco, usuario, senha, host

module.exports = sequelize;