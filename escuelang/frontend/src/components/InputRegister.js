import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap'

const InputRegister = ({register, onRegisterUpdated, fieldTranslations, readOnly, errors}) => {
  const [newRegister, setNewRegister] = useState(register);
  const handleChange = (field) =>
      (event) => {
          event.stopPropagation();
          event.preventDefault();
          const tmpRegister = {
              ...newRegister,
              field: event.target.value,
          };
          setNewRegister(tmpRegister);
          onRegisterdUpdated(tmpRegister);
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
      {getInputForField('monitor')}
  </Col>
  <Col>
      {getInputForField('price_month')}
  </Col>
  </Form.Row>
  <Form.Row>
  <Col xs={7}>
    {getInputForField('competition', 'check')}
  </Col>
  </Form.Row>
</>
)
}

export default InputRegister;
