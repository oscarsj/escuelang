import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'

const InputChild = ({child, onChange, onSubmit}) => {
    const handleChange = (field) =>
      (event) => {
          let newChild = {...child};
          newChild[field] = event.target.value;
          onChange(newChild);
      }

    return (
  <Form onSubmit={onSubmit}>
    <Form.Group>
    <Row>
    <Col><Form.Control type='text' id='name' value={child.name} onChange={handleChange('name')}/></Col>
    <Col><Form.Control type='text' id='surname' value={child.surname} onChange={handleChange('surname')}/></Col>
    <Col><Form.Control type='text' id='address' value={child.address} onChange={handleChange('address')}/></Col>
    <Col><Form.Control type='text' id='postcode' value={child.postcode} onChange={handleChange('postcode')}/></Col>
    <Col><Form.Control type='text' id='dni' value={child.dni} onChange={handleChange('dni')}/></Col>
    <Button id='new' variant="primary" type="submit">Guardar</Button>
    </Row>
    </Form.Group>
  </Form>
          )
    }

export default InputChild;
