const Sequelize = require('sequelize')
const sequelize = require('./conection')

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

//Force: Cria o banco mesmo se existir*/
//Config.sync({force: true}) //Sobrescreve a tabela

module.exports = {User, Config}
