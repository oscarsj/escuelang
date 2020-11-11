import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap'

const InputChild = ({child, onChildUpdated, fieldTranslations, readOnly}) => {
  const [newChild, setNewChild] = useState(child);
  const handleChange = (field) =>
      (event) => {
          event.stopPropagation();
          event.preventDefault();
          let tmpChild = {...child};
          tmpChild[field] = event.target.value;
          setNewChild(tmpChild);
          onChildUpdated(tmpChild);
      }

    const getInputForField = (field) => {
        return (
        <>
        <Form.Label>{fieldTranslations[field]}</Form.Label>
        <Form.Control 
          type='text' 
          id={field} 
          placeholder={fieldTranslations[field]} 
          onChange={handleChange(field)} 
          readOnly={readOnly} 
          defaultValue={readOnly? newChild[field]:""}/>
        </>)
      }

    return (<>
  <Form.Row>
  <Col xs={4}>
    <Form.Group>
      {getInputForField('name')}
    </Form.Group>
  </Col>
  <Col>
    <Form.Group>
      {getInputForField('surname')}
    </Form.Group>
  </Col>
  </Form.Row>
  <Form.Row>
  <Col xs={7}>
  <Form.Group >
    {getInputForField('address')}
  </Form.Group>
  </Col>
  <Col xs={3}>
    <Form.Group>
      {getInputForField('town')}
    </Form.Group>
  </Col>
  <Col xs={2}>
    <Form.Group>
      {getInputForField('postcode')}
    </Form.Group>
  </Col>
  </Form.Row>

  <Form.Row>
    <Col xs={2}>
  <Form.Group>
    <Form.Label>Fecha de nacimiento</Form.Label>
    <Form.Control 
      type='date' 
      readOnly={readOnly}
      onChange={handleChange('birthdate')}
      defaultValue={readOnly? newChild.birthdate:""}/>
  </Form.Group>
  </Col>
  <Col>
  <Form.Group>
      {getInputForField('school')}
    </Form.Group>
  </Col>
  <Col>
    <Form.Group>
      {getInputForField('email')}
    </Form.Group>
  </Col>
  <Col xs={2}>
    <Form.Group>
      {getInputForField('dni')}
    </Form.Group>
  </Col>
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col}>
      {getInputForField('notes')}
    </Form.Group>
  </Form.Row>
  </>
)
    }

export default InputChild;
