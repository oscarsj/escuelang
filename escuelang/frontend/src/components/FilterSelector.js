import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {
  useSettingsStore,
  useMonitorStore,
  useDaysStore } from '../store';
import { allTranslations } from '../translations';
import { MdCancel } from "react-icons/md";

const FilterSelector = ({fields, onFilterUpdated, translations}) => {
    const lang = useSettingsStore((state) => state.language);  
  
    const allMonitors = useMonitorStore(state => state.monitors);
    const allDays = useDaysStore(state => state.days);
    const fieldTranslations = allTranslations[lang];
    const daysTranslations = fieldTranslations.days;

    const [field, setField] = useState();

    const getInputControl = (field) => {
        if(field == 'days') {
            return (<Form.Control 
                id="filter-days"
                as="select"
                size="sm"
                onChange={onNewFilter}>
                <option key="days-empty">Elige día</option>
                {allDays && allDays.map(day => 
                <option key={day.name} value={daysTranslations[day.name]}>{daysTranslations[day.name]}</option>)}
                </Form.Control>)
        }
        if (field == 'monitor') {
            return (<Form.Control 
                id="filter-monitors"
                as="select"
                size="sm"
                onChange={onNewFilter}>
                <option key="monitors-empty">Elige monitor</option>
                {allMonitors && allMonitors.map(monitor => 
                <option key={monitor.nick} value={monitor.nick}>{monitor.nick}</option>)}
                </Form.Control>)
        }
        return (<Form.Control 
            type='text'
            id='content'
            size="sm"
            placeholder='filtro...' 
            onChange={onNewFilter} 
        />)
    }
    const handleReset = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setField(undefined);
    }
    const onNewFilter = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const content = event.target.value;
        onFilterUpdated(field && content? {field: field, content: content}:undefined)
    };
    return (<Form inline>
    <Form.Group>
    <Form.Label>
          Filtrar: 
    </Form.Label>
    <Form.Control 
      id="filter-fields"
      as="select"
      value={field}
      size="sm"
      onChange={(event) => setField(event.target.value)}
      >
      <option key="field-empty">Elige un campo...</option>
      {fields && fields.map(field => 
      <option key={field} value={field}>{translations[field]}</option>)}
    </Form.Control>
    </Form.Group>
    {getInputControl(field)}
    <Button variant="outline-secondary" size="sm" onClick={handleReset} >
    <MdCancel/>
    </Button>
    </Form>);
}

export default FilterSelector;