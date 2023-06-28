const Sequelize = require("sequelize");
const connection = require("../database/database");

const Usuario = connection.define("Usuario", {
    codigo:{
        type: Sequelize.INTEGER,
        autoincrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usuariocol: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {freezeTableName: true,
    timestamps: false,
    });

    Usuario.sync({force: false});

    module.exports = Usuario;
   