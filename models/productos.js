const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('producto', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        precio:{
            type: DataTypes.INTEGER
        },
        categoria:{
            type: DataTypes.ENUM('Celulares Nuevos', 'Celulares Reacondicionados', 'Licuadora', 'Horno Electrico', 'Plancha de pelo', 'Plancha', 'Auriculares', 'Lavarropas')
        },
        descripcion:{
            type: DataTypes.TEXT //poner cada caracteristica y luego coma
        },
        marca: {
            type: DataTypes.STRING
        },
        stock:{
            type: DataTypes.INTEGER
        },
        img: {
            type: DataTypes.TEXT
        },
        cantidad: {
            type: DataTypes.INTEGER 
        }

    },{timestamps: false})
}