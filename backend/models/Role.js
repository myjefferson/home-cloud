const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Role = sequelize.define('roles', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        role:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    tableName: 'roles',
    freezeTableName: true,
    timestamps: false
});

(async () => {
    try{
        const tableExists = await Role.sync({ force: false })
        
        if(!tableExists){
            await Role.sync({ force: true })
            const roles = [
                { role: "USER" },
                { role: "ADMIN"}
            ]
            
            await Role.bulkCreate(roles)
            .then(() => { console.log("Inserted Data in Table Role") })
            .catch(() => { console.log("Error to insert Data roles in Table Role") })
        }
    }catch(error){
        console.log(`Error to create table Role: ${error}`)
    }
})()

module.exports = Role