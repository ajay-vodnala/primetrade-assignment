import { useState} from 'react';
import './index.css';
import Preloader from '../Preloader/index';
import { useNavigate } from 'react-router-dom';

const serverUrl=process.env.REACT_APP_SERVER_URL;
const Register=()=>{
    const navigate=useNavigate();
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [mobile,setMobile]=useState(null);
    const [email,setEmail]=useState('')
    const [loading,setLoading]=useState(false);
    const handleRegister=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const data={
                name:username,
                password:password,
                mobile:mobile,
                email:email
            }
            const response=await fetch(`${serverUrl}/user/register`,{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                    accept:"application/json"
                },
                body:JSON.stringify(data)
            });
            const responseData=await response.json()
            if(response.ok){
                alert(responseData.message);
                navigate('/login');
            }
        } catch (error) {
            alert(error);
        }finally{
            setLoading(false);
        }
    }
    return(
        loading?<Preloader/>:
        <div className='d-flex flex-column justify-content-center align-items-center login-form mt-5 p-3 px-3'>
            <h1 className='mainHeading'>Register</h1>
            <form onSubmit={handleRegister}>
                <label>Name :</label>
                <input
                type='text'
                required
                className='register-input mb-3'
                value={username}
                name='username'
                onChange={(e)=>setUsername(e.target.value)}
                />
                 <label>Email :</label>
                <input
                type='email'
                required
                className='register-input mb-3'
                value={email}
                name='email'
                onChange={(e)=>setEmail(e.target.value)}
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
                <label>Password :</label>
                <input
                type='password'
                required
                name='password'
                className='register-input mb-3'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className='registerBtn w-100' type='submit'>Register</button>
            </form>
        </div>
    );
}
export default Register;