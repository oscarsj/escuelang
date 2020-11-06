import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

const EscuelaNavbar = ({title}) => {
    return (
    <Navbar sticky="top" bg="light" expand="lg">
    <Navbar.Brand href="#home">{title}</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="#home">Inicio</Nav.Link>
        <Nav.Link href="#link">Temporadas</Nav.Link>
        <NavDropdown title="Listados" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">General de alumnos</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Por dias y entrenador</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Asistencia</NavDropdown.Item>
        </NavDropdown>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
    )

}

export default EscuelaNavbar;
