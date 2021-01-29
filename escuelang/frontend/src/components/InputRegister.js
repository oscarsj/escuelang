import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import store from '../store';
import trans from '../translations';


const InputRegister = ({register, onRegisterUpdated, readOnly, errors}) => {
  const lang = store.useSettingsStore((state) => state.language);  
  const fieldTranslations = trans.allTranslations[lang];

  const allMonitors = store.useMonitorStore(state => state.monitors);
  const allDays = store.useDaysStore(state => state.days);

  const daysTranslations = fieldTranslations.days;
  const registerTranslations = fieldTranslations.register;
  const registerId = register.id? register.id:"new";
  const [newRegister, setNewRegister] = useState(register);
  
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

  const handleChange = (field) =>
    (event) => {
        event.stopPropagation();
        event.preventDefault();
        const tmpRegister = {...newRegister};
        tmpRegister[field] = event.target.value;
        setNewRegister(tmpRegister);
        onRegisterUpdated(tmpRegister);
    }
  const handleChangeMonitor = (event) => {
    console.log("Monitor changed ", event.target.value);
    const tmpMonitor = allMonitors.find((monitor) => monitor.nick == event.target.value)
    const tmpRegister = {...newRegister,
      monitor: tmpMonitor.nick};
    setNewRegister(tmpRegister);
    onRegisterUpdated(tmpRegister);
  }

  const handleChangeDays = (event) => {
    console.log("Days changed ", event.target.id);
    console.log("Current days ", newRegister.days);
    const tmpRegister = {...newRegister};
    if (newRegister.days.includes(event.target.id)) {
      tmpRegister.days = newRegister.days.filter((day)=> day != event.target.id)
    } else {
      tmpRegister.days.push(event.target.id);
    }
    setNewRegister(tmpRegister);
    onRegisterUpdated(tmpRegister);
  }
    
  const handleChangeCompetition = () => {
    const tmpRegister = {...newRegister,
      competition: !newRegister.competition
    }
    setNewRegister(tmpRegister);
    onRegisterUpdated(tmpRegister);
  }
    return (<>
  <Form.Row>
  <Col xs={4}>
  <Form.Group>
  <Form.Label>{registerTranslations.monitor}</Form.Label>
    <Form.Control 
      id={`register-${registerId}-monitor`} 
      as="select"
      value={newRegister.monitor == 'undefined'? "select":newRegister.monitor}
      onChange={handleChangeMonitor}
      isInvalid={Boolean(errors?errors.monitor:false)}
      disabled={readOnly}>
      {(newRegister.monitor == 'undefined') && <option key={`monitor-select`}>select</option>}
      {allMonitors && allMonitors.map(monitor => 
      <option key={`monitor-${monitor.id}`}>{monitor.nick}</option>)}
    </Form.Control>
    <Form.Control.Feedback type="invalid">
        Error: {errors? errors.monitor:""}
    </Form.Control.Feedback>
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
       defaultChecked={newRegister.competition} 
       onChange={handleChangeCompetition}
       disabled={readOnly} />
  </Form.Group>
  </Col>
  </Form.Row> 
  <Form.Row>
  <Col xs={4}>
  <Form.Group>
    <Form.Label>{registerTranslations.days}</Form.Label>
      {allDays && allDays.map((day) => {
        return (
          <Form.Check 
            key={`check-day${day.id}`}
            type="switch"
            onChange={handleChangeDays}
            id={day.name}
            readOnly={readOnly} 
            defaultChecked={newRegister.days?newRegister.days.includes(day.name):false}
            label={daysTranslations[day.name]}
            disabled={readOnly}/>
          )}
        )}
  </Form.Group>
  </Col>
  </Form.Row>
</>
)
}

export default InputRegister;
