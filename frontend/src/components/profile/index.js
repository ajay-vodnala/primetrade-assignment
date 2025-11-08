import { useEffect, useState } from 'react';
import Preloader from '../Preloader';
import Cookies from 'js-cookie';
import './index.css';
import { Link } from 'react-router-dom';

const jwtToken=Cookies.get("jwtToken");
const serverUrl=process.env.REACT_APP_SERVER_URL;
const Profile=()=>{
    const [userDetails,setUserDetails]=useState({});
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        setLoading(true);
        const userInfo=async()=>{ 
            try {
                const response=await fetch(`${serverUrl}/user/profile-details`,{
                   method:"GET",
                    headers:{
                        "content-type":"application/json",
                        accept:"application/json",
                        Authorization:`Bearer ${jwtToken}`
                        }
                });
                const responseData=await response.json();         
                setUserDetails(responseData);
            } catch (error) {
                alert("internal Server Error"); 
                console.log(error);
            }finally{
                setLoading(false)
            }
        }
        userInfo();
    },[]);

    return(
        loading?<Preloader/>:
        <div className='profileSection mt-5 pt-3'>
            <div className='container'>
                <div className='row'> 
                    <div className='col-12 mb-2'>
                        <span className='profilePic'>{userDetails.name[0].toUpperCase()}</span>
                    </div>
                    <div className='profileHeadings col-3 col-md-1'>Name :</div>
                    <div className='profilecontent col-9 col-md-11'>{userDetails.name}</div>
                    <div className='profileHeadings col-3 col-md-1'>Email :</div>
                    <div className='profilecontent col-9 col-md-11'>{userDetails.email}</div>
                    <div className='profileHeadings col-3 col-md-1'>Mobile :</div>
                    <div className='profilecontent col-9 col-md-11'>{userDetails.mobile}</div> 
                    <div className='profileBtns mt-4'>
                        <Link to='/edit-profile'><button className='editBtn me-3'>Edit Profile</button></Link>
                        <Link to='/add-task'><button className='statusBtn me-3'>Add Task</button></Link>
                        <Link to='/'><button className='deleteBtn'>All Tasks</button></Link>
                    </div>                   
                </div>
            </div>
        </div>
    );

}
export default Profile;  