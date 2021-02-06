import React, { useState } from 'react';
import { Form, Col, Alert, Card } from 'react-bootstrap';
import EditSaveCancelButtons from './EditSaveCancelButtons';
import { useSettingsStore } from '../store';
import { allTranslations } from "../translations";


const SeasonData = ({season, onSeasonUpdated}) => {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
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
    setNewSeason(season);
    setError();
    setErrors({});
    setEditMode(false);
  }

  const onUpdateFailure = (err) => {
    setError(err);
    setErrors(err.data);
  }
  const handleCancelEdit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setNewSeason(season);
    setEditMode(false);
}
  const handleSeasonUpdated = (event) => {
      console.log("New season data: ", newSeason);
      event.preventDefault();
      event.stopPropagation();
      onSeasonUpdated(newSeason, onUpdateSuccess, onUpdateFailure);
    }

    const getInputForField = (field, type='text') => {
      return (  
      <Form.Group id={`${season.id}-${field}`}>
      <Form.Label>{fieldTranslations[field]}</Form.Label>
      <Form.Control
        type={type}
        id={`${season.id}-${field}`}
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
  {(editMode && (season != undefined) && <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
  <Form onSubmit={handleSeasonUpdated}>
    {(error && <Alert variant="danger">{error}</Alert>)}
  <Form.Row>
  <Col xs={4}>
  {getInputForField('name')}
  </Col>
  <Col xs={4}>
  {getInputForField('course')}
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
  <EditSaveCancelButtons
    editMode={editMode}
    onSetEditMode={setEditMode}
    onCancel={handleCancelEdit}/>
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
    <Card.Link href="#">
    <EditSaveCancelButtons
      editMode={editMode} 
      onSetEditMode={setEditMode}
      onCancel={handleCancelEdit}/></Card.Link>
  </Card.Body>
</Card>
    )}
  </>
)
}

    
export default SeasonData;