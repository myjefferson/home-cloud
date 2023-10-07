const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Cloud = sequelize.define('cloud', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        defined_storage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        installation_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        limit_storage_accounts: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
    tableName: 'cloud',
    freezeTableName: true,
    timestamps: false
});

(async () => {
    try{
        const tableExists = await Cloud.sync({ force: false })

        if(!tableExists){
            await Cloud.sync({ force: true })
        }
    }catch(error){
        console.log(`erro to cloud table cloud ${error}`)
    }
})();

module.exports = Cloud