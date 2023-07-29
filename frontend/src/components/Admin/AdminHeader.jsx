import React from 'react';
import Cookies from 'js-cookie';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/img/logo.png";

function AdminHeader() {
  const navigate = useNavigate();

  const logout = () => {
    // Remove the cookies
    Cookies.remove('token');
    Cookies.remove('isAdmin');

    // Remove the data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <Navbar className="bg-body-secondary">
      <Container>
        <Navbar.Brand> <a href="/"> <img className="logo" src={logo} /> </a> Dashboard</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="#login" onClick={logout}>Log out</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
