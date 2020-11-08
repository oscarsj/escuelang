import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {Link} from "react-router-dom";

const EscuelaNavbar = ({title}) => {
    return (
    <Navbar sticky="top" bg="light" expand="lg">
    <Navbar.Brand href="#home">{title}</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link to="/" href="/" as={Link}>
        Temporada actual
        </Nav.Link>
        <Nav.Link to="/seasons" href="/seasons" as={Link}>
        Otras temporadas
        </Nav.Link>
        <Nav.Link to="/children" href="/children" as={Link}>
        Antiguos alumnos
        </Nav.Link>
        <NavDropdown title="Listados" id="basic-nav-dropdown">
            <NavDropdown.Item href="/reports/general">General de alumnos</NavDropdown.Item>
            <NavDropdown.Item href="/reports/days">Por dias y entrenador</NavDropdown.Item>
            <NavDropdown.Item href="/reports/attendance">Asistencia</NavDropdown.Item>
        </NavDropdown>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
    )

}

export default EscuelaNavbar;
