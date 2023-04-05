const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('compra', {
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        cantidad: {
            type : DataTypes.INTEGER,
        },
        direccion: {
            type: DataTypes.TEXT
        },
        envio: {
            type : DataTypes.BOOLEAN
        }
    },{timestamps: false})
}