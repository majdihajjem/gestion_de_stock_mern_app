import React from 'react'
import {Container,Nav,Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { logout } from '../slices/userSlice';
import '../App.css'
function NavigationBar() {
  const dispatch=useDispatch()
  const {isAuth}=useSelector((state)=>state.user)
  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(logout())
  }
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">OMEGA</Navbar.Brand>
            <Nav className="me-auto">
            {isAuth ?
            <>
            <Link to="/">Home</Link>
            <Link to="/Product">Product</Link>
            <Link to="/Register">Register</Link>
            <button className='btnn' onClick={logoutHandler}>Logout</button>
            </>
            :<>
            <Link to="/">Home</Link>
            <Link to="/Login">Login</Link>
            </>
            }
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavigationBar