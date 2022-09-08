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
      <Container style={{ justifyContent: "flex-start", width: "100%" }}>
        <Navbar.Brand href="#home">OMEGA</Navbar.Brand>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {isAuth ? (
            <div style={{ display: "flex" }}>
              &nbsp;
              <Link to="/">Home</Link>
              &nbsp;
              <Link to="/Products">Products</Link>
              &nbsp;
              {userInfo?.role === "admin" && (
                <Link to="/Register">Register</Link>
              )}
              &nbsp;
              {userInfo?.role === "admin" && (
                <Link to="/UserManagment">Managment</Link>
              )}
              &nbsp;
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              &nbsp;
              <Link to="/">Home</Link>
              &nbsp;
              <Link to="/Login">Login</Link>
              &nbsp;
            </div>
          )}

          {isAuth && (
            <button className="btnn" onClick={logoutHandler}>
              Logout
            </button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
