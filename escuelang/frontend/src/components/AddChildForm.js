import React from 'react';
import { Form, Button } from 'react-bootstrap'
import InputChild from './InputChild';

const AddChildForm = ({child, onChange, onSubmit, fieldTranslations}) => {

    return (
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={onSubmit}>

    <InputChild 
        child={child} 
        onChange={onChange} 
        fieldTranslations={fieldTranslations} 
        readOnly={false}/>

    <Button id='new' variant="primary" type="submit">Guardar</Button>
    </Form>
    </div>
    )
}

export default AddChildForm;