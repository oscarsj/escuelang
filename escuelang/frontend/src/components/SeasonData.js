import React, { useState } from 'react';
import { Form, Col, Alert, Card } from 'react-bootstrap';
import EditSaveCancelButtons from './EditSaveCancelButtons';
import seasonsApi from '../client/seasons';
import store from '../store';
import trans from "../translations";


const SeasonData = () => {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [errors] = useState({});

  const season = store.useSeasonStore(state => state.season);
  const setSeason = store.useSeasonStore(state => state.setSeason);
  const [newSeason, setNewSeason] = useState(season);

  const lang = store.useSettingsStore(state=>state.language);
  const fieldTranslations = trans.allTranslations[lang].season;
    
  const handleChange = (field) =>
    (event) => {
        event.stopPropagation();
        event.preventDefault();
        const tmpSeason = {...newSeason};
        tmpSeason[field] = event.target.value;
        setNewSeason(tmpSeason);
    }

  const handleSeasonUpdated = (event) => {
      console.log("New season data: ", newSeason);
      event.preventDefault();
      event.stopPropagation();
      const seasonData = Object.assign(season, newSeason);
      console.log("Setting season data: ", seasonData);
      seasonsApi
        .update(season.id, seasonData)
        .then((result) => {
            setEditMode(false);
            setSeason(result);
        })
        .catch((err) => {
            console.log("Error updating season: ", err.response);
            setError(err.response.error);
        })
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
        defaultValue={season[field]}
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
        defaultValue={season.name}
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
        defaultValue={season.course}
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