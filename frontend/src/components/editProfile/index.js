import { useState,useEffect } from 'react';
import '../register/index.css';
import Preloader from '../Preloader/index';
import Cookies from 'js-cookie';

const serverUrl=process.env.REACT_APP_SERVER_URL;
const jwtToken=Cookies.get("jwtToken");
const EditProfile=()=>{ 
    const [username,setUsername]=useState('');
    const [mobile,setMobile]=useState(null);
    const [loading,setLoading]=useState(false);
    const handleEdit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try { 
            const data={   
                name:username,
                mobile:mobile
            }
            const response=await fetch(`${serverUrl}/user/edit-profile`,{
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
        const userDetails=async()=>{
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
                setUsername(responseData.name); 
                setMobile(responseData.mobile);
            } catch (error) {
                alert("internal Server Error"); 
                console.log(error);
            }finally{
                setLoading(false)
            }
        }
        userDetails();
    },[])
    return(
        loading?<Preloader/>:
        <div className='d-flex flex-column justify-content-center align-items-center login-form px-3 mt-5 pt-2'>
            <h1 className='mainHeading'>Edit Profile</h1>
            <form onSubmit={handleEdit}>
                <label>Name :</label>
                <input
                type='text'
                required
                className='register-input mb-3'
                value={username}
                name='username'
                onChange={(e)=>setUsername(e.target.value)}
                />
                 <label>Mobile :</label>
                <input
                type='number'
                required
                className='register-input mb-3'
                value={mobile}
                name='mobile'
                onChange={(e)=>setMobile(e.target.value)}
                />
                <button className='registerBtn w-100' type='submit'>Edit Profile</button>
            </form>
        </div>
    );
}
export default EditProfile; 