import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import './NavBar.css';
import LogoImage from '../../Images/Logo/LogoImage.png';
import { AuthContext } from '../../context/AuthContext';
import Button from 'react-bootstrap/esm/Button';

function NavBar() {

  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar style= {{ paddingTop: '0', paddingBottom: '0' }} className="NavBar" expand="lg">
      <Navbar.Brand style={{ paddingTop: '0', paddingBottom: '0' }} className="Brand" as={Link} to="/"><img className="logoImg" src={LogoImage} alt="logo" />
        <h1>Age of Empires II</h1>
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link as={Link} to="/"><p className="NavBarLinks">Home</p></Nav.Link>
        
        {user ? <Nav.Link as={Link} to="/favourites"><p className="NavBarLinks">Favourites</p></Nav.Link> :
            <Nav.Link as={Link} to="/register"><p className="NavBarLinks">Register</p></Nav.Link>}
        
          {user ? <Nav.Link onClick={logout}><p className="NavBarLinks">Log Out</p></Nav.Link> :
            <Nav.Link as={Link} to="/login"><p className="NavBarLinks">Log In</p></Nav.Link>}
            
            <NavDropdown title="Discover" id="basic-nav-dropdown" className="NavBarLinks">
              <NavDropdown.Item as={Link} to="/civilizations"><p className="DropDownLinks">Civilizations</p></NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/units"><p className="DropDownLinks">Units</p></NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/technologies"><p className="DropDownLinks">Technologies</p></NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/structures"><p className="DropDownLinks">Structures</p></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4"><p className="DropDownLinks">Separated link</p></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar