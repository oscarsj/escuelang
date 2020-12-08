import React, { useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap'
import daysApi from '../client/days';
import monitorsApi from '../client/monitors';


const InputRegister = ({register, onRegisterUpdated, fieldTranslations, readOnly, errors}) => {
  const daysTranslations = fieldTranslations.days;
  const registerTranslations = fieldTranslations.register;
  const [allDays, setAllDays] = useState([]);
  const [allMonitors, setAllMonitors] = useState([]);
  const registerId = register? register.id:"new";
  useEffect( () => { 
    daysApi
      .get()
      .then(days => setAllDays(days));
    console.log(allDays);
    monitorsApi
      .get()
      .then(monitors => {
        setAllMonitors(monitors);
        console.log("Monitors: ", monitors);
      });
  }, []);
  
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
      <Form.Label>{registerTranslations[field]}</Form.Label>
      <Form.Control 
        type={type}
        id={`${registerId}-${field}`}
        placeholder={registerTranslations[field]} 
        onChange={handleChange(field)} 
        readOnly={readOnly} 
        defaultValue={readOnly? newRegister[field]:""}
        isInvalid={Boolean(errors?errors[field]:false)}/>
      <Form.Control.Feedback type="invalid">
        Error: {errors? errors[field]:""}
      </Form.Control.Feedback>
      </Form.Group>)
    }

    return (<>
  <Form.Row>
  <Col xs={4}>
  <Form.Group>
  <Form.Label>{registerTranslations['monitor']}</Form.Label>
      <Form.Control 
        id={`${registerId}-monitor`} 
        as="select">
      {allMonitors && allMonitors.map(monitor => 
        <option key={`monitor-${monitor.id}`}>{monitor.nick}</option>)}
  </Form.Control>
  </Form.Group>
  </Col>
  <Col>
      {getInputForField('price_month')}
  </Col>
  <Col xs={2}>
  <Form.Group controlId="formBasicCheckbox">
  <Form.Label></Form.Label>
    <Form.Check
       type="checkbox" 
       id={`${registerId}-competition`} 
       label={registerTranslations['competition']} 
       defaultChecked={newRegister.competition} />
  </Form.Group>
  </Col>
  </Form.Row> 
  <Form.Row>
  <Col xs={4}>
  <Form.Group>
    <Form.Label>{registerTranslations['days']}</Form.Label>
      {allDays && allDays.map((day) => {
        return (
          <Form.Check 
            key={`check-day${day.id}`}
            type="switch"
            id={`${registerId}-check${day.id}`}
            defaultChecked={register.days? register.days.includes(day.name): false}
            label={daysTranslations[day.name]}/>
          )}
        )}
  </Form.Group>
  </Col>
  </Form.Row>
</>
)
}

export default InputRegister;
