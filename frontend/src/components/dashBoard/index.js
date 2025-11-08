import { useEffect, useState } from 'react';
import './index.css';
import Preloader from '../Preloader/index'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const serverUrl=process.env.REACT_APP_SERVER_URL;
const jwtToken=Cookies.get("jwtToken");
const DashBoard=(props)=>{
    const {islogedin}=props;
    const [taskList,setTaskList]=useState([]);
    const [loading,setLoading]=useState(true); 
    const [searchText,setSearchText]=useState('');
    const [tabText,setTabText]=useState('all');
    const [count,setCount]=useState(0)

    const filterByTab=(tabId)=>{
        setTabText(tabId);
        setSearchText('')
    }
 
    const deleteTask=async(id)=>{
        setLoading(true);
        try {
            const response=await fetch(`${serverUrl}/task/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:`Bearer ${jwtToken}`
                }
            });
            const responseData=await response.json();
            if(response.ok){
                alert(responseData.message);
            }
        } catch (error) {
            alert("internal server Error");
            console.log(error);
        }
        setCount(count+1);
        setLoading(false)
    }

 
    const markAsComplete=async(id)=>{
        setLoading(true);
        try {
            const response=await fetch(`${serverUrl}/task/complete/${id}`,{
                method:"PUT",
                headers:{
                    Authorization:`Bearer ${jwtToken}`
                }
            });
            const responseData=await response.json();
            if(response.ok){
                alert(responseData.message);
            }
        } catch (error) {
            alert("internal server Error");
            console.log(error);
        }
        setCount(count+1);
        setLoading(false)
    }
    
    
    const markAsIncomplete=async(id)=>{
        setLoading(true);
        try {
            const response=await fetch(`${serverUrl}/task/incomplete/${id}`,{
                method:"PUT",
                headers:{
                    Authorization:`Bearer ${jwtToken}`
                }
            });
            const responseData=await response.json();
            if(response.ok){
                alert(responseData.message);
            }
        } catch (error) {
            alert("internal server Error");
            console.log(error);
        }
        setCount(count+1);
        setLoading(false)
    }    


    useEffect(()=>{
            const getTasks=async()=>{
                try { 
                    const response=await fetch(`${serverUrl}/task/get-all?name=${searchText}&status=${tabText}`,{
                        method:"GET",
                        headers:{
                            "content-type":"application/json",
                            accept:"application/json",
                            Authorization:`Bearer ${jwtToken}`
                        }
                    });
                    if(response.ok){
                        const data=await response.json();
                        setTaskList(data);
                    }else{
                        alert("something went worng");
                    }
                } catch (error) {
                    alert("Internal server Error")
                    console.log(error);
                }finally{
                    setLoading(false);
                }
            }
            getTasks();
        },[searchText,tabText,count,islogedin]);

    return( 
        loading?<Preloader/>:
        <> 
        <div className='taskDashboard pt-5'>
            <div className='filterSection'>
                <div className='d-flex mt-4'>
                    <label>search:</label>
                    <input
                    type='search'
                    placeholder='search by task name'
                    className='inputField ms-2'
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    />
                </div>
                <div className='tabButtons'>
                    <button className='me-md-2' onClick={()=>filterByTab('all')}>All</button>
                    <button className='me-md-2' onClick={()=>filterByTab('completed')}>Completed</button>
                    <button onClick={()=>filterByTab('incomplete')}>Pending</button>
                </div>   
            </div>
            <div className='container'>
                <div className='row taskList'>
                    {taskList.map((item)=>(
                        <div className='col-12 col-md-8 taskSection' key={item._id}>
                            <div className='taskHeading'>Task Name:<span className='tasktext'>{item.task_name}</span></div>
                            <div className='taskHeading'>Task Description:<span className='tasktext'>{item.task_body}</span></div>
                            <div className='taskBtns mt-2'>
                                {(item.status==="incomplete")?<button onClick={()=>markAsComplete(item._id)} className='statusBtn'>Mark as Complete</button>:<button onClick={()=>markAsIncomplete(item._id)} className='statusBtn'>Mark as Incomplete</button>}
                                <Link to={`/edit-task/${item._id}`}><button className='editBtn'>Edit</button></Link>
                                <button className='deleteBtn' onClick={()=>deleteTask(item._id)}>Delete</button>
                            </div>
                        </div>
                    )

                    )}
                </div>
            </div>
        </div></>
    );
}
export default DashBoard;