import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import "../App.css";
function NavigationBar() {
  const dispatch = useDispatch();
  const { isAuth, userInfo } = useSelector((state) => state.user);
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">OMEGA</Navbar.Brand>
        <Nav className="me-auto">
          {isAuth ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/Products">Products</Link>
              {userInfo?.role === "admin" && (
                <Link to="/Register">Register</Link>
              )}
              {userInfo?.role === "admin" && (
                <Link to="/UserManagment">Managment</Link>
              )}
              <button className="btnn" onClick={logoutHandler}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/Login">Login</Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
