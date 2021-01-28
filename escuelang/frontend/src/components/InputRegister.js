import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap'


const InputRegister = ({register, onRegisterUpdated, fieldTranslations, readOnly, allDays, allMonitors, errors}) => {
  const getMonitorStatus = (registerId, currentRegister) => {
    if(allMonitors != undefined) { 
      if(registerId == 'new') {
        return allMonitors[0];
      } else {
        return allMonitors.filter(
          (monitor) => monitor.nick == currentRegister.monitor
        )[0];
      }
    }
  }
  const getDayStatus = (days, allDays) => {
    const result = {};
    if (allDays != undefined) {
      allDays.forEach(day => {
        result[day.name] = days!=undefined? days.includes(day.name):false;
      });
    }
    return result;
  }
  const daysTranslations = fieldTranslations.days;
  const registerTranslations = fieldTranslations.register;
  const registerId = register.id? register.id:"new";
  const [newRegister, setNewRegister] = useState(register);
  const [newMonitor, setNewMonitor] = useState(getMonitorStatus(registerId, register.monitor));
  const [newDays, setNewDays] = useState(getDayStatus(register.days, allDays));
  const [newCompetition, setNewCompetition] = useState(register.competition);

  const getDayList = (days) => allDays.filter(day => days[day.name]).map(day => day.name)
  
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
        const tmpRegister = {...newRegister,
          monitor: newMonitor.nick,
          payments_set: [],
          days: getDayList(newDays),
          competition: newCompetition};
        tmpRegister[field] = event.target.value;
        setNewRegister(tmpRegister);
        onRegisterUpdated(tmpRegister);
    }
  const handleChangeMonitor = (event) => {
    console.log("Monitor changed ", event.target.value);
    const tmpMonitor = allMonitors.find((monitor => monitor.nick == event.target.value))
    setNewMonitor(tmpMonitor);
    const tmpRegister = {...newRegister,
      monitor: tmpMonitor.nick,
      payments_set: [],
      days: getDayList(newDays),
      competition: newCompetition};
    setNewRegister(tmpRegister);
    onRegisterUpdated(tmpRegister);
  }
  const handleChangeDays = (event) => {
    console.log("Days changed ", event.target.id);
    const tmpDays = {...newDays};
    tmpDays[event.target.id] = !tmpDays[event.target.id];
    setNewDays(tmpDays);
    onRegisterUpdated({...newRegister,
      monitor: newMonitor.nick,
      payments_set: [],
      days: getDayList(tmpDays),
      competition: newCompetition
    });
  }
  const handleChangeCompetition = (event) => {
    setNewCompetition(!newCompetition);
    onRegisterUpdated({...newRegister,
      monitor: newMonitor.nick,
      payments_set: [],
      days: getDayList(newDays),
      competition: !newCompetition
    });
  }
    return (<>
  <Form.Row>
  <Col xs={4}>
  <Form.Group>
  <Form.Label>{registerTranslations.monitor}</Form.Label>
    <Form.Control 
      id={`register-${registerId}-monitor`} 
      as="select"
      value={newMonitor? newMonitor.nick:""}
      onChange={handleChangeMonitor}
      isInvalid={Boolean(errors?errors.monitor:false)}
      disabled={readOnly}>
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
       defaultChecked={newCompetition} 
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
            defaultChecked={register.days? register.days.includes(day.name): false}
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
