import React, { useState } from 'react';
import { Form, Col, Alert } from 'react-bootstrap'
import EditSaveCancelButtons from './EditSaveCancelButtons';
import seasons from '../client/seasons';


const SeasonData = ({season, fieldTranslations, onSeasonUpdated}) => {
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [newSeason, setNewSeason] = useState(season);
    
    const handleChange = (field) =>
      (event) => {
          event.stopPropagation();
          event.preventDefault();
          setNewSeason({
              ...newSeason,
              field: event.target.value
        });
      }
      const handleSeasonUpdated = (event) => {
          console.log("New season data: ", newSeason);
          event.preventDefault();
          event.stopPropagation();
          console.log("New season data: ", newSeason);
          const seasonData = Object.assign(newSeason, season);
          seasons
            .update(season.id, seasonData)
            .then((result) => {
                setEditMode(false);
                onSeasonUpdated(result);
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
    return (
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
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
  </div>
)
}

    
export default SeasonData;