const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite', //Tipo de banco de dados
    storage: './database/home_cloud_database.db'
})

//start connection
const startConnection = async () => {
    try {
        await sequelize.authenticate();
        const User = require('../models/User');
        const Role = require('../models/Role');
        const Cloud = require('../models/Cloud')
        await User()
        await Role()
        await Cloud()
    } catch (error) {
        // console.error('Erro ao conectar ao banco de dados:', error);
    }
}; startConnection();

module.exports = sequelize;