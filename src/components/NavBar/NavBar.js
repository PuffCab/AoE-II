import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom"
import './NavBar.css'
import LogoImage from '../../Images/LogoImage.png'

function NavBar() {
  return (
    <Navbar style= {{
                paddingTop: '0',
                paddingBottom: '0'
          }} className="NavBar" expand="lg">
        <Navbar.Brand style= {{
                paddingTop: '0',
                paddingBottom: '0'
          }} className="Brand" as={Link} to="/"><img className="logoImg" src={LogoImage} alt="logo" /> <h1>Age of Empires II</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/"><p className="NavBarLinks">Home</p></Nav.Link>
          <Nav.Link as={Link} to="login"><p className="NavBarLinks">Log In</p></Nav.Link>
            <NavDropdown title="Explore" id="basic-nav-dropdown" className="NavBarLinks">
              <NavDropdown.Item as={Link} to="/civilizations"><p className="DropDownLinks">Civilizations</p></NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/units"><p className="DropDownLinks">Units</p></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4"><p className="DropDownLinks">Separated link</p></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar