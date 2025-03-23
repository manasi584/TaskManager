const Task=require("../models/task")

async function getAllTasks(req,res){

    try {
        const allTasks= await Task.find({});
        return res.json(allTasks);
    } catch (error) {
        return res.status(500).json({msg:error});
    }
   
}

async function createTask(req,res){
    try {
        const nameInput=req.body.name;
    await Task.insertOne({name:nameInput});

    return res.json({"Done":nameInput});
        
    } catch (error) {
        return res.status(500).json({msg:error});
    }
    

}
async function getTask(req,res){
    try {
        const { id: taskID } = req.params
    const t1=await Task.findOne({_id:req.params.id});
    
    if(!t1) return res.status(404);

    return res.status(200).json(t1);
    } catch (error) {
        return res.status(500);
    }
    
}
async function updateTask(req,res){
    try{
        const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
          })
       
       return res.status(200).json({task});
    }
    catch(error){
        return res.status(500);

    }
    
}
async function deleteTask(req,res){
    try {
      
        const task = await Task.findOneAndDelete({ _id: req.params.id})
      
        if(!task) return res.status(404).json({msg:`no task with id ${req.params.id}`});
        return res.status(200).json({task});
    } catch (error) {
        return res.status(500); 
    }
   
}

module.exports={
    getAllTasks,
    createTask,
    deleteTask,
    getTask,
    updateTask
}

