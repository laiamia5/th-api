const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('users', {
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        nombre:{
            type: DataTypes.STRING
        },
        apellido:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        contraseña:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{timestamps: false})
}