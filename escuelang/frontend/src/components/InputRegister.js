import React, { useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap'
import daysApi from '../client/days';
import monitorsApi from '../client/monitors';


const InputRegister = ({register, onRegisterUpdated, fieldTranslations, readOnly, errors}) => {
  const daysTranslations = fieldTranslations.days;
  const registerTranslations = fieldTranslations.register;
  const [allDays, setAllDays] = useState([]);
  const [allMonitors, setAllMonitors] = useState([]);
  const registerId = register.id? register.id:"new";
  const [newRegister, setNewRegister] = useState(register);
  const [newMonitor, setNewMonitor] = useState({});
  const [newDays, setNewDays] = useState({});

  const getDayStatus = (days, allDays) => {
    const result = {};
    allDays.forEach(day => {
      result[day.name] = days.includes(day.name);
    });
    return result;
  }
  const getDayList = (days) => allDays.filter(day => days[day.name]).map(day => day.name)
  useEffect( () => { 
    daysApi
      .get()
      .then(days => {
        setAllDays(days);
        setNewDays(getDayStatus(register.days, days));
      });
    console.log("allDays: ", allDays);
    monitorsApi
      .get()
      .then(monitors => {
        setAllMonitors(monitors);
        if (registerId == 'new') {
          setNewMonitor(monitors[0]);
        } else {
          setNewMonitor(monitors.filter(
            (monitor) => monitor.nick == register.monitor
          )[0]);
        }
      });
  }, []);

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
        onRegisterUpdated({
          ...tmpRegister,
          monitor: newMonitor.nick,
          payments_set: [],
          days: getDayList(newDays)
        });
    }
  const handleChangeMonitor = (event) => {
    console.log("Monitor changed ", event.target.value);
    setNewMonitor(allMonitors.find((monitor => monitor.nick == event.target.value)));
    onRegisterUpdated({...register,
      monitor: event.target.value,
      payments_set: [],
      days: getDayList(newDays)
    });
  }
  const handleChangeDays = (event) => {
    console.log("Days changed ", event.target.id);
    const tmpDays = {...newDays};
    tmpDays[event.target.id] = !tmpDays[event.target.id];
    setNewDays(tmpDays);
    onRegisterUpdated({...register,
      monitor: newMonitor.nick,
      payments_set: [],
      days: getDayList(tmpDays)
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
      value={newRegister.monitor}
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
       defaultChecked={newRegister.competition} 
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
