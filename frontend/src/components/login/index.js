import { useEffect, useState} from 'react';
import './index.css';
import Preloader from '../Preloader/index';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const serverUrl=process.env.REACT_APP_SERVER_URL;
const Login=(props)=>{
    const {setIslogedin}=props;
    const navigate=useNavigate();
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const handleLogin=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const data={
                email:username,
                password:password
            }
            const response=await fetch(`${serverUrl}/user/login`,{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                    accept:"application/json"
                },
                body:JSON.stringify(data)
            });
            const responseData=await response.json()
            if(response.ok){
                Cookies.set('jwtToken',responseData.token,{expires:2});
                setIslogedin(responseData.token);
                alert("Login SuccessFul");
                navigate('/');
            }
        } catch (error) {
            alert(error);
            setLoading(false);
        }
        setLoading(false);


    }
    return(
        loading?<Preloader/>:
        <div className='d-flex flex-column justify-content-center align-items-center login-form mt-5 pt-4 px-3'>
            <h1 className='mainHeading'>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Username :</label>
                <input
                type='text'
                required
                className='login_input mb-3'
                value={username}
                name='username'
                onChange={(e)=>setUsername(e.target.value)}
                />
                <label>Password :</label>
                <input
                type='password'
                required
                name='password'
                className='login_input mb-3'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className='loginBtn w-100' type='submit'>Login</button>
            </form>
        </div>
    );
}
export default Login;