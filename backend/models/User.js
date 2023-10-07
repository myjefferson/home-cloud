const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const User = sequelize.define('user', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     isEmail: true
            // }
        }, 
        email:{
            type: DataTypes.STRING,
            allowNull: true,
            // validate: {
            //     isEmail: true
            // }
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        limit_storage: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    tableName: 'users',
    freezeTableName: true,
    timestamps: false
});

(async () => {
    try{
        const tableExists = await User.sync({ force: false })

        if(!tableExists){
            await Role.sync({ force: true })
        }
    }catch(error){
        console.log(`Error to create table User: ${error}`)
    }
})();

module.exports = User