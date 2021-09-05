const dataBase = require('../database/dataBase.json');
const TaskModel = require('../models/tasks.models');


const getTasks = async (req,res) => {
   try {
     let gotTask = await TaskModel.findAll();
     res.status(200).json(gotTask);
     } catch (error) {
       res.status(500).json({
         error: error,
       });
     }
};


const getTaskById = async (req, res) => {
    let { id } = req.params;
    let currentTasks = await TaskModel.findOne({
      where: {
        id,
      },
    });
    if (currentTasks) {
      try {
        let { id } = req.params;
        let gotTask = await TaskModel.findOne({
          where: {
            id,
          },
        });
        res.status(200).json(gotTask);
      } catch (error) {
        res.status(500).json({
          error: error,
        });
      }
    } else {
      res.status(404).json({
        error: `Tarea no existe`,
      });
    }
  };


const postTask = async (req, res) => {
  try {
    const { responsible, description } = req.body;
    let postedTask = await TaskModel.create(
      {
        responsible,
        description,
      },
      {
        fields: ["responsible", "description"],
      }
    );
    if (postedTask) {
      return res.status(201).json({
        success: "Tarea creada con éxito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const patchTask = async (req, res) => {
  let { id } = req.params;
  let currentTasks = await TaskModel.findOne({
    where: {
      id,
    },
  });
  if (currentTasks) {
    try {
      let { responsible, description } = req.body;
      let updatedTask = await currentTaks.update({
        responsible,
        description,
      });
      res.status(201).json({
        success: "Tarea actualizada con éxito",
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  } else {
    res.status(404).json({
      error: `Tarea no existe`,
    });
  }
};

const deleteTask = async (req, res) => {
  let { id } = req.params;
  let currentTasks = await TaskModel.findOne({
    where: {
      id,
    },
  });
  if (currentTasks) {
    try {
      await TaskModel.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        success: "Tarea eliminada con éxito",
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  } else {
    res.status(404).json({
      error: `Tarea no existe`,
    });
  }
};

module.exports = {
    getTasks,
    getTaskById,
    postTask,
    patchTask,
    deleteTask,
};