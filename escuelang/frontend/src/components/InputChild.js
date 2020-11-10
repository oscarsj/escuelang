import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'

const InputChild = ({child, onChange, onSubmit, fieldTranslations={}}) => {
    const handleChange = (field) =>
      (event) => {
          let newChild = {...child};
          newChild[field] = event.target.value;
          onChange(newChild);
      }

    const getInputForField = (field) => {
      return (
      <>
      <Form.Label>{fieldTranslations[field]}</Form.Label>
      <Form.Control type='text' id={field} placeholder={fieldTranslations[field]} onChange={handleChange(field)}/>
      </>)
    }
    return (
  <Form onSubmit={onSubmit}>

  <Form.Row>
  <Col xs={4}>
    <Form.Group controlId="formGridName">
      {getInputForField('name')}
    </Form.Group>
  </Col>
  <Col>
    <Form.Group controlId="formGridSurname">
      {getInputForField('surname')}
    </Form.Group>
  </Col>
  </Form.Row>

  <Form.Row>
  <Col xs={7}>
  <Form.Group controlId="formGridAddress">
    {getInputForField('address')}
  </Form.Group>
  </Col>
  <Col xs={3}>
    <Form.Group controlId="formGridTown">
      {getInputForField('town')}
    </Form.Group>
  </Col>
  <Col xs={2}>
    <Form.Group controlId="formGridPostcode">
      {getInputForField('postcode')}
    </Form.Group>
  </Col>
  </Form.Row>

  <Form.Row>
    <Col xs={2}>
  <Form.Group controlId="formGridBirthdate">
    <Form.Label>Fecha de nacimiento</Form.Label>
    <Form.Control type='date'/>
  </Form.Group>
  </Col>
  <Col>
  <Form.Group controlId="formGridSchool">
      {getInputForField('school')}
    </Form.Group>
  </Col>
  <Col>
    <Form.Group controlId="formGridEmail">
      {getInputForField('email')}
    </Form.Group>
  </Col>
  <Col xs={2}>
    <Form.Group controlId="formGridDNI">
      {getInputForField('dni')}
    </Form.Group>
  </Col>
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridNotes">
      {getInputForField('notes')}
    </Form.Group>
  </Form.Row>
  <Button id='new' variant="primary" type="submit">Guardar</Button>
</Form>
)
    }

export default InputChild;
