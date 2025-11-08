import { useState , useEffect} from 'react';
import '../addTask/index.css';
import Preloader from '../Preloader/index';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const serverUrl=process.env.REACT_APP_SERVER_URL;
const jwtToken=Cookies.get("jwtToken");
const EditTask=()=>{
    const {task_id}=useParams();
    const [taskName,setTaskName]=useState('');
    const [taskBody,setTaskBody]=useState('');
    const [loading,setLoading]=useState(true);
    const handleEditTask=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const data={
                task_name:taskName,
                task_body:taskBody
            }
            const response=await fetch(`${serverUrl}/task/update/${task_id}`,{
                method:"PUT",
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
            }
        } catch (error) {
            alert(error);
        }finally{
            setLoading(false);
        }
    }
 
    useEffect(()=>{
        setLoading(true);
        const taskdetails=async()=>{
            try {
                const response=await fetch(`${serverUrl}/task/get-task/${task_id}`,{
                   method:"GET",
                    headers:{
                        "content-type":"application/json",
                        accept:"application/json",
                        Authorization:`Bearer ${jwtToken}`
                        }
                });
                const responseData=await response.json();         
                setTaskName(responseData.task_name); 
                setTaskBody(responseData.task_body);
            } catch (error) {
                alert("internal Server Error");
                console.log(error);
            }finally{
                setLoading(false)
            }
        }
        taskdetails();
    },[])
    return(
        loading?<Preloader/>:
        <div className='d-flex flex-column justify-content-center align-items-center login-form px-3 mt-5 pt-2'>
            <h1 className='mainHeading'>Edit Task</h1>
            <form onSubmit={handleEditTask}>
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
                <button className='addTaskBtn w-100' type='submit'>Edit Task</button>
            </form>
        </div>
    );
}
export default EditTask;