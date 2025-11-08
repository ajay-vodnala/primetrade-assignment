import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ProtectedRoute from './components/protectedRoute/index';
import Header from './components/header/index';
import DashBoard from './components/dashBoard';
import Login from './components/login';
import AddTask from './components/addTask';
import Register from './components/register';
import EditTask from './components/editTask';
import EditProfile from './components/editProfile';
import Profile from './components/profile';
import NotFound from './components/notfound';
import Cookies from 'js-cookie';
import { useState } from 'react';

const App=()=>{ 
      const [islogedin,setIslogedin]=useState(Cookies.get("jwtToken"));
      return(
      <Router>
            <Header islogedin={islogedin} setIslogedin={setIslogedin}/>
            <Routes>
              <Route element={<ProtectedRoute/>}>
                  <Route exact path='/' element={<DashBoard islogedin={islogedin}/>}/>
                  <Route exact path='/add-task' element={<AddTask/>}/>     
                  <Route exact path='/edit-task/:task_id' element={<EditTask/>}/>
                  <Route exact path='/edit-profile' element={<EditProfile/>}/> 
                  <Route exact path='/profile' element={<Profile/>}/>               
              </Route>
              <Route exact path='/login' element={<Login setIslogedin={setIslogedin}/>}/>
              <Route exact path='/register' element={<Register/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>  
      </Router> 
      );  
}
export default App; 

 