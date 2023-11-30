const Sequelize = require("sequelize");
const connection = require("../database/database");

const Usuario = connection.define("Usuario", {
    codigo:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING(45),
        allowNull: false
    },
    email:{
        type: Sequelize.STRING(60),
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usuarioCol: {
        type: Sequelize.STRING(45),
        allowNull: false
    }
}, {freezeTableName: true,
    timestamps: false,
    });

    Usuario.sync({force: false});

    module.exports = Usuario;
   