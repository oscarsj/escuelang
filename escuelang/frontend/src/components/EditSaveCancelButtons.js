import React, { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs'
import { Button } from 'react-bootstrap'


const EditSaveCancelButtons = ({editMode, onSetEditMode}) => {
    const handleToogle = (event) => {
        event.stopPropagation();
        event.preventDefault();
        onSetEditMode(!editMode);
    }
    const handleCancel = (event) => {
        onSetEditMode(false);
    }
    const getButtons = () => {
        return editMode? 
        (<>
            <Button id='update' variant="primary" type="submit" style={{ padding: "10px", marginRight: "10px"}} size='sm'>Guardar</Button>
            <Button id='cancel' variant="secondary" type="reset" style={{ padding: "10px"}} size='sm' onClick={handleCancel}>Cancelar</Button>
        </>)
          : 
        (<Button id='enable' variant="secondary" type="submit" onClick={handleToogle}><BsPencilSquare/></Button>) 
    }

    return (<>
        {getButtons()}
    </>)
}

export default EditSaveCancelButtons;