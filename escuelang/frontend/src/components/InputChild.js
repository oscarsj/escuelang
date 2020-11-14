import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap'

const InputChild = ({child, onChildUpdated, fieldTranslations, readOnly, errors}) => {
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
      <Form.Group>
      <Form.Label>{fieldTranslations[field]}</Form.Label>
      <Form.Control 
        type='text' 
        id={field} 
        placeholder={fieldTranslations[field]} 
        onChange={handleChange(field)} 
        readOnly={readOnly} 
        defaultValue={readOnly? newChild[field]:""}/>
     {errors[field] && <div>
        Error: {errors[field][0]}
      </div>}
      </Form.Group>)
    }

    return (<>
  <Form.Row>
  <Col xs={4}>
      {getInputForField('name')}
  </Col>
  <Col>
      {getInputForField('surname')}
  </Col>
  </Form.Row>
  <Form.Row>
  <Col xs={7}>
    {getInputForField('address')}
  </Col>
  <Col xs={3}>
      {getInputForField('town')}
  </Col>
  <Col xs={2}>
      {getInputForField('postcode')}
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
    {errors.birthdate && 
        <div>{errors.birthdate[0]}</div>
    }
  </Form.Group>
  </Col>
  <Col>
      {getInputForField('school')}
  </Col>
  <Col>
      {getInputForField('email')}
  </Col>
  <Col xs={2}>
      {getInputForField('dni')}
  </Col>
  </Form.Row>
  <Form.Row>
  <Col>
      {getInputForField('notes')}
  </Col>
  </Form.Row>
  </>
)
}

export default InputChild;
