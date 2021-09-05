const Sequelize = require("sequelize"); // module (S in uppercase)
const { sequelize } = require("../database/database"); // set up to connect the servic ()

const TaskModel = sequelize.define('tasks', {
    responsible: {
        type: Sequelize.TEXT,
    },
    description: {
        type: Sequelize.TEXT,
    }

}, {
    timestamps: false
});

module.exports = TaskModel;