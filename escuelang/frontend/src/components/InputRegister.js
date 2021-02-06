import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import {
  useSettingsStore,
  useMonitorStore,
  useDaysStore } from '../store';
import { allTranslations } from '../translations';


const InputRegister = ({register, onRegisterUpdated, readOnly, errors}) => {
  const lang = useSettingsStore((state) => state.language);  
  const fieldTranslations = allTranslations[lang];

  const allMonitors = useMonitorStore(state => state.monitors);
  const allDays = useDaysStore(state => state.days);

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
    console.log("Days changed ", event.target.selectedOptions[0].id);
    console.log("Current days ", newRegister.days);
    const tmpRegister = {...newRegister,
      days: event.target.selectedOptions[0].id
    };
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
  <Col xs={3}>
  <Form.Group>
  <Form.Label>{registerTranslations.monitor}</Form.Label>
    <Form.Control 
      id={`register-${registerId}-monitors-${allMonitors.length}`} 
      as="select"
      value={newRegister.monitor == 'undefined'? "":newRegister.monitor}
      onChange={handleChangeMonitor}
      isInvalid={Boolean(errors?errors.monitor:false)}
      disabled={readOnly}>
      <option key="monitor-empty"></option>
      {allMonitors && allMonitors.map(monitor => 
      <option key={`monitor-${monitor.id}`}>{monitor.nick}</option>)}
    </Form.Control>
    <Form.Control.Feedback type="invalid">
        Error: {errors? errors.monitor:""}
    </Form.Control.Feedback>
  </Form.Group>
  </Col>
  <Col xs={3}>
  <Form.Group>
    <Form.Label>{registerTranslations.days}</Form.Label>
    <Form.Control 
      id={`register-${registerId}-days-${allDays.length}`} 
      as="select"
      value={newRegister.days == undefined? "":daysTranslations[newRegister.days]}
      onChange={handleChangeDays}
      isInvalid={Boolean(errors?errors.days:false)}
      disabled={readOnly}>
      <option key="days-empty"></option>
      {allDays && allDays.map(days => 
      <option key={`days-${days.id}`} id={days.name}>{daysTranslations[days.name]}</option>)}
    </Form.Control>
    <Form.Control.Feedback type="invalid">
        Error: {errors? errors.days:""}
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
</>
)
}

export default InputRegister;
