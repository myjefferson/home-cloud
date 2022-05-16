const Sequelize = require('sequelize')
const sequelize = new Sequelize('homecloud', 'root', '', {
    host: "localhost",
    dialect: "mysql" //Tipo de banco de dados
}) //Nome do banco, usuario, senha, host

module.exports = sequelize;