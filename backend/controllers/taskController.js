import Task from "../models/task.js";

//add task

export const addTask=async(req,res)=>{
    const {task_name,task_body}=req.body;
    const userEmail=req.email;
    try {
        if(!task_name||!task_body){
            return res.status(400).json({message:"task details required"});
        }
        const newTask=new Task({
            task_name,
            task_body,
            created_date:new Date(),
            status:"incomplete",
            user:userEmail
        });
        await newTask.save();
        res.status(201).json({message:"new Task Created Successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

//Get All Tasks

export const getAllTasksOfUser=async(req,res)=>{
    const userEmail=req.email;
    const {name,status}=req.query;
    try {
        const query = { user: userEmail };
        if (name!==" ") {
            query.task_name = { $regex: name, $options: "i" };
        }
        if (status!== "all") {
            query.status = status;
        }
        const tasksData = await Task.find(query);
        res.status(200).json(tasksData);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

//get single Task

export const getTask=async(req,res)=>{
    const {task_id}=req.params;
    try {
        const taskData=await Task.findById(task_id);
        if(!taskData){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json(taskData);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

//update Task

export const editTask=async(req,res)=>{
    const taskDetails=req.body;
    const {task_id}=req.params;
    try {
        await Task.findByIdAndUpdate(task_id,{$set:taskDetails})
        res.status(200).json({message:"Task Updated Successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

//delete Task

export const deleteTask=async(req,res)=>{
    const {task_id}=req.params;
    try {
        const isExist=await Task.findById(task_id);
        if(!isExist){
            return res.status(404).json({message:"task not exists"});
        }
        await Task.findByIdAndDelete(task_id);
        res.status(200).json({message:"Task Deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

// mark as complete

export const markAsComplete=async(req,res)=>{
    const {task_id}=req.params;
    const newDate=new Date();
    try {
        await Task.findByIdAndUpdate(task_id,{$set:{status:"completed",completed_date:newDate}});
        res.status(200).json({message:"task marked as completed"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

// mark as incomplete

export const markAsIncomplete=async(req,res)=>{
    const {task_id}=req.params;
    try {
        await Task.findByIdAndUpdate(task_id,{$set:{status:"incomplete",completed_date:null}});
        res.status(200).json({message:"task marked as Incomplete"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}