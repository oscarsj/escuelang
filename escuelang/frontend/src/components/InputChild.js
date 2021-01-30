import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap'
import store from '../store';
import trans from '../translations';


const InputChild = ({child, onChildUpdated, readOnly, errors}) => {
  const lang = store.useSettingsStore((state) => state.language);  
  const fieldTranslations = trans.allTranslations[lang].child;

  const [newChild, setNewChild] = useState(child?child:{});
  const handleChange = (field) =>
      (event) => {
          event.stopPropagation();
          event.preventDefault();
          const tmpChild = {...newChild};
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
        defaultValue={newChild? newChild[field]:""}
        isInvalid={Boolean(errors?errors[field]:false)}/>
      <Form.Control.Feedback type="invalid">
        Error: {errors? errors[field]:""}
      </Form.Control.Feedback>
      </Form.Group>)
    }
          
    return (<div key={newChild.id}>
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
  </div>
)
}

export default InputChild;
