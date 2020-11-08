import React from 'react';
import { Table } from 'react-bootstrap'

const ChildDetails = ({child}) => {
    return (
    
        <Table striped bordered hover>
        <tr><td>Fecha de nacimiento:</td><td>{child.birthdate}</td></tr>
        <tr><td>Dirección:</td><td>{child.address}</td></tr>
        <tr><td>Ciudad:</td><td>{child.town}</td></tr>
        <tr><td>DNI:</td><td>{child.dni}</td></tr>
        <tr><td>Colegio:</td><td>{child.school}</td></tr>
        <tr><td>Email:</td><td>{child.email}</td></tr>        
        </Table>

    )
}

export default ChildDetails;