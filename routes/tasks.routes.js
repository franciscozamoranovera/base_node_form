const express = require('express');
const router = express.Router(); //used to use routes

const {
    getTasks,
    getTaskById,
    postTask,
    patchTask,
    deleteTask
} = require('../controllers/tasks.controllers'); 

router.get('/tasks', getTasks);
router.get('/task/:id', getTaskById);
router.post('/task', postTask); //controller name (postProduct)
router.patch('/task/:id', patchTask);
router.delete('/task/:id', deleteTask);

module.exports = router;