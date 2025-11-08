import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './index.css';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


const Header=(props)=> {
  const {islogedin,setIslogedin}=props;
  const navigate=useNavigate();
  const [jwtToken,setJwtToken]=useState(Cookies.get("jwtToken"))
  const logout=()=>{
    Cookies.remove("jwtToken");
    setIslogedin(undefined);
    navigate('/login')
  }
  return (
    <>
      {['lg'].map((expand) => (
        <Navbar data-bs-theme="dark" key={expand} expand={expand} fixed="top" className="bg-body-tertiary nav-bg">
          <Container fluid className='d-flex flex-row justify-between'>
            <div className='d-flex flex-row'>
              <div>
                <h4 className='logo-text'>Task Management</h4>
              </div>
            </div>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              data-bs-theme="dark"
              className="w-auto pe-5 nav-bg"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  MENU
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1">
                  {islogedin &&<Nav.Link className='nav-text' href="/">Home</Nav.Link>}
                  {islogedin && <Nav.Link className='nav-text' href="/add-task">Add Task</Nav.Link>}
                  {islogedin && <Nav.Link className='nav-text' href="/edit-profile">Edit Profile</Nav.Link>}
                  {islogedin && <Nav.Link className='nav-text' href="/profile">Profile</Nav.Link>}
                  {islogedin && <Nav.Link className='nav-text' onClick={logout}>Logout</Nav.Link>}
                  {!islogedin && <Nav.Link className='nav-text' href="/login">login&nbsp;&nbsp;/</Nav.Link>}
                  {!islogedin && <Nav.Link className='nav-text' href="/register">Register</Nav.Link>}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;