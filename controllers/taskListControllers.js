const listItem = require("../models/TaskList");
const {v4: uuidv4} = require("uuid");


// //1. Create Task
// router.post('/create-task', listController.createTask);

async function createTask(req, res) {
    try {
      //parse out fields from POST request
   
      const id = uuidv4();
      const name  = (req.body.name);
      const description = (req.body.description);
      const completed = (req.body.completed);
      const status = (req.body.status);
      
  
      //pass fields to new Blog model 
      //notice how it's way more organized and does the type checking for us
      const newTask = new Task({
          id,
          name,
          description,
          completed,
          status,
      });
  
      //save our new entry to the database 
      const savedData =  await newTask.save();
      
      //return the successful request to the user 
      res.json({
          success: true,
          blogs: savedData
      });
  
    } catch (e) {
      console.log(typeof e);
      console.log(e);
      res.json({
        error: e.toString(),
      });
    };
};

// //2. Update Task (Mark as Completed/ Uncompleted)
// router.put('/update-task', listController.updateTask);

//update tasks
async function updateTask (req, res, next) {
    const entryID = req.body.id;
    
    try{
        await Task.updateOne({id: entryID}, req.body);
    
    if (req.body.completed === true){

       const filter = { id: entryID };
       const update = { dateCompleted: Date.now() };

    // update document with the date completed
    let doc = await Task.findOneAndUpdate(filter, update);
    doc.id;
    doc.dateCompleted;            
    };
    
    } catch(err) {
        console.log(err)
        throw err
    }
    res.json ({
        success: true,
        message: `Task ${entryID} has been updated`
    });
    };


// //3. Delete Task
// router.delete('/delete-task',listController.deleteOneTask);

//delete a task   
async function deleteOneTask(req, res) {
    const entryId = req.body.id;

    try {
        await Task.deleteOne({id: entryId});
    } catch (err) {
        console.log(err);
        throw err;  
    }
    res.json({
        success: true,
        message: `List entry id ${entryId} deleted`
    });
};

// //4. Delete Multipl Tasks
// router.delete('/delete-multi', listController.deleteMultiple);

//delete multiple tasks
async function deleteMultiple(req, res) {
	try {
      
      const idsToDelete = req.query.id

      const deleteResult = await Task.deleteMany({id:
          idsToDelete
        });
  
  } catch (e) {
    res.send(e);
  };

	res.json({
		success: true,
        deletedResult: idsToDelete
        
	});
};

// //5. Create Muliple Tasks
// router.post('./create-multi', listController.createMultiple);
async function createMultiple (req, res){

    try {
     let createMulti = await Task.create(req.body)
     return createMulti;

    } catch (e) {
     res.send(e);
    }
    res.json({
     sucess:true
    });
  };


// //6. Display all Tasks
// router.get('/all', listController.getAllTasks);
async function getAllTasks(req, res) {

    //query tasks
    try {
      const allTasks = await Task.find({});
      res.json({task: allTasks });
    }catch(e){
      console.log(e);
    };
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteOneTask,
    deleteMultiple,
    createMultiple
};