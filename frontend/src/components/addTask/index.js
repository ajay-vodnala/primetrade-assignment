import { useState} from 'react';
import './index.css';
import Preloader from '../Preloader/index';
import Cookies from 'js-cookie';

const serverUrl=process.env.REACT_APP_SERVER_URL;
const jwtToken=Cookies.get("jwtToken");
const AddTask=()=>{
    const [taskName,setTaskName]=useState('');
    const [taskBody,setTaskBody]=useState('');
    const [loading,setLoading]=useState(false);
    const handleAddTask=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const data={
                task_name:taskName,
                task_body:taskBody
            }
            const response=await fetch(`${serverUrl}/task/add-new`,{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                    accept:"application/json",
                    Authorization:`Bearer ${jwtToken}`
                },
                body:JSON.stringify(data)
            });
            const responseData=await response.json()
            if(response.ok){
                alert(responseData.message);
                setTaskName('');
                setTaskBody('');
            }
        } catch (error) {
            alert(error);
        }finally{
            setLoading(false);
        }
    }
    return(
        loading?<Preloader/>:
        <div className='d-flex flex-column justify-content-center align-items-center login-form px-3 mt-5 pt-2'>
            <h1 className='mainHeading'>Add Task</h1>
            <form onSubmit={handleAddTask}>
                <label>Name :</label>
                <input
                type='text'
                required
                className='addTask-input mb-3'
                value={taskName}
                name='taskName'
                onChange={(e)=>setTaskName(e.target.value)}
                />
                 <label>Description :</label>
                <textarea
                    value={taskBody}
                    name="taskBody"
                    placeholder="Enter your task description"
                    rows="3"
                    onChange={(e)=> { setTaskBody(e.target.value)}}
                    className='addTask-input mb-2'
                />
                <button className='addTaskBtn w-100' type='submit'>Add Task</button>
            </form>
        </div>
    );
}
export default AddTask;