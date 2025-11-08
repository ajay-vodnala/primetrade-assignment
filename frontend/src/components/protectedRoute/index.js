import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import {Navigate} from 'react-router-dom'
const ProtectedRoute=(props)=>{
    const token=Cookies.get("jwtToken");
        if(!token){
           return <Navigate to="/login" replace />;
        }
        return(
            <>
            <Outlet/>
            </>
        )
   
}
export default ProtectedRoute;