const Sequelize = require('sequelize')
const sequelize = require('./conection')

//Cria a tabela só uma vez*/
//Config.sync({force: true}) //Sobrescreve a tabela

const Config = sequelize.define('configs',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    installed: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    diskSpace: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dirUser: {
        type: Sequelize.STRING,
        allowNull: false
    },
    diskSpace: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

module.exports = {User, Config}
