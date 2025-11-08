import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    task_name:{
        type:String,
        required:true
    },
    task_body:{
        type:String,
        required:true
    },
    created_date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    completed_date:{
        type:Date,
    },
    user:{
        type:String,
        required:true
    }
});
const Task =mongoose.model("Task",taskSchema);
export default Task;