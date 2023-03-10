const {v4: uuidv4} = require("uuid");
const express = require("express");
const router = express.Router();

// Required Functionality (Routes):
const listController = require("../controllers/taskListControllers");
//const taskController = require("../controllers/taskController");

//1. Create Task
router.post('/create-task', listController.createTask);

//2. Update Task (Mark as Completed/ Uncompleted)
router.put('/update-task', listController.updateTask);

//3. Delete Task
router.delete('/delete-task',listController.deleteOneTask);

//4. Delete Multipl Tasks
router.delete('/delete-multi', listController.deleteMultiple);

//5. Create Muliple Tasks
router.post('/create-multi', listController.createMultiple);

//6. Display all Tasks
router.get('/all', listController.getAllTasks);



module.exports = router;