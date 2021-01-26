import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap'

const InputChild = ({child, onChildUpdated, fieldTranslations, readOnly, errors}) => {
  const [newChild, setNewChild] = useState(child);
  const handleChange = (field) =>
      (event) => {
          event.stopPropagation();
          event.preventDefault();
          const tmpChild = {...child};
          tmpChild[field] = event.target.value;
          console.log("InputChild: ", tmpChild);
          setNewChild(tmpChild);
          onChildUpdated(tmpChild);
      }
    
    const getInputForField = (field, type='text') => {
      return (  
      <Form.Group>
      <Form.Label>{fieldTranslations[field]}</Form.Label>
      <Form.Control 
        type={type}
        id={field} 
        placeholder={fieldTranslations[field]} 
        onChange={handleChange(field)} 
        readOnly={readOnly} 
        defaultValue={readOnly? newChild[field]:""}
        isInvalid={Boolean(errors?errors[field]:false)}/>
      <Form.Control.Feedback type="invalid">
        Error: {errors? errors[field]:""}
      </Form.Control.Feedback>
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
  {getInputForField('birthdate', 'date')}
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
