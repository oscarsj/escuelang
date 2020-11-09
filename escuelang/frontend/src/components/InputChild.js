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
    <Form.Group as={Col} controlId="formGridName">
      {getInputForField('name')}
    </Form.Group>

    <Form.Group as={Col} controlId="formGridSurname">
      {getInputForField('surname')}
    </Form.Group>
  </Form.Row>
  
  <Form.Row>
  <Form.Group controlId="formGridAddress">
    {getInputForField('address')}
  </Form.Group>

    <Form.Group as={Col} controlId="formGridTown">
      {getInputForField('town')}
    </Form.Group>
    <Form.Group as={Col} controlId="formGridPostcode">
      {getInputForField('postcode')}
    </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group controlId="formGridBirthdate">
    <Form.Label>Fecha de nacimiento</Form.Label>
    <Form.Control type='date' />
  </Form.Group>
  <Form.Group as={Col} controlId="formGridSchool">
      {getInputForField('school')}
    </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridEmail">
      {getInputForField('email')}
    </Form.Group>
    <Form.Group as={Col} controlId="formGridDNI">
      {getInputForField('dni')}
    </Form.Group>
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
