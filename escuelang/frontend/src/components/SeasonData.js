import React, { useState } from 'react';
import { Form, Col, Alert, Card } from 'react-bootstrap';
import EditSaveCancelButtons from './EditSaveCancelButtons';
import { useSeasonStore, useSettingsStore } from '../store';
import { allTranslations } from "../translations";


const SeasonData = ({onSeasonUpdated}) => {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [errors] = useState({});

  const season = useSeasonStore(state => state.season);
  const [newSeason, setNewSeason] = useState(season);

  const lang = useSettingsStore(state=>state.language);
  const fieldTranslations = allTranslations[lang].season;
    
  const handleChange = (field) =>
    (event) => {
        event.stopPropagation();
        event.preventDefault();
        const tmpSeason = {...newSeason};
        tmpSeason[field] = event.target.value;
        setNewSeason(tmpSeason);
    }

  const onUpdateSuccess = () => {

  }

  const onUpdateFailure = (err) => {
    setError(err);
  }

  const handleSeasonUpdated = (event) => {
      console.log("New season data: ", newSeason);
      event.preventDefault();
      event.stopPropagation();
      onSeasonUpdated(newSeason, onUpdateSuccess, onUpdateFailure);
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
        readOnly={!editMode} 
        defaultValue={newSeason[field]}
        isInvalid={Boolean(errors?errors[field]:false)}/>
      <Form.Control.Feedback type="invalid">
        Error: {errors? errors[field]:""}
      </Form.Control.Feedback>
      </Form.Group>)
    }
    return (<>
    {(editMode && <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={handleSeasonUpdated}>
        {(error && <Alert variant="danger">{error}</Alert>)}
    
    <Form.Row>
  <Col xs={4}>
  <Form.Control 
        type='text'
        id='name' 
        placeholder={fieldTranslations.name} 
        onChange={handleChange('name')} 
        readOnly={!editMode} 
        defaultValue={newSeason.name}
        isInvalid={Boolean(errors?errors.name:false)}/>
      <Form.Control.Feedback type="invalid">
        Error: {errors? errors.name:""}
      </Form.Control.Feedback>
  </Col>
  <Col xs={4}>
  <Form.Control 
        type='text'
        id='course' 
        placeholder={fieldTranslations.course} 
        onChange={handleChange('course')} 
        readOnly={!editMode} 
        defaultValue={newSeason.course}
        isInvalid={Boolean(errors?errors.course:false)}/>
      <Form.Control.Feedback type="invalid">
        Error: {errors? errors.course:""}
      </Form.Control.Feedback>
  </Col>
  </Form.Row>
  <Form.Row>
  <Col xs={4}>
      {getInputForField('start_date', 'date')}
  </Col>
  <Col>
      {getInputForField('end_date', 'date')}
  </Col>
  <Col xs={4}>
    {getInputForField('default_price')}
  </Col>
  </Form.Row>
  <EditSaveCancelButtons editMode={editMode} onSetEditMode={setEditMode}/>
  </Form>
  </div>)}
  {(!editMode && 
  <Card className="bg-dark text-white" style={{ heigth: '300rem' }}>
  <Card.Body>
    <Card.Title>Temporada {season.name}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{season.course}</Card.Subtitle>
    <Card.Text>
    <div>De {season.start_date} a {season.end_date}</div>
    <div>Precio por alumno {season.default_price}</div>
    </Card.Text>
    <Card.Link href="#"><EditSaveCancelButtons editMode={editMode} onSetEditMode={setEditMode}/></Card.Link>
  </Card.Body>
</Card>
    )}
  </>
)
}

    
export default SeasonData;