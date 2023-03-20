const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('celulares', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        modelo: {
            type: DataTypes.STRING
        },
        cliente:{
            type: DataTypes.STRING
        },
        fecha_entrada:{
            type: DataTypes.STRING
        },
        fecha_salida: {
            type: DataTypes.STRING
        },
        seña:{
            type: DataTypes.INTEGER
        },
        resto:{
            type: DataTypes.INTEGER
        },
        precio_total:{
            type: DataTypes.INTEGER
        },
        contraseña:{
            type: DataTypes.STRING
        }
    },{timestamps: false})
}