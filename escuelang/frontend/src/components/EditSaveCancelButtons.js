import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { ImBin } from 'react-icons/im';
import { Button } from 'react-bootstrap';


const EditSaveCancelButtons = ({editMode, onSetEditMode, onDelete}) => {
    const handleToogle = (event) => {
        event.stopPropagation();
        event.preventDefault();
        onSetEditMode(!editMode);
    }
    const handleCancel = (event) => {
        onSetEditMode(false);
    }
    const deleteRegister = (event) => {
        event.stopPropagation();
        event.preventDefault();
        onSetEditMode(false);
        onDelete(event);
    }
    const getButtons = () => {
        return editMode? 
        (<>
            <Button id='update' variant="primary" type="submit" style={{ padding: "10px", marginRight: "10px"}} size='sm'>Guardar</Button>
            <Button id='cancel' variant="secondary" type="reset" style={{ padding: "10px"}} size='sm' onClick={handleCancel}>Cancelar</Button>
        </>)
          : 
        (<>
            <Button id='enable' variant="primary" type="submit" onClick={handleToogle} style={{ padding: "5px", marginRight: "5px"}}><BsPencilSquare/></Button>
            {onDelete && <Button id='enable' variant="secondary" type="submit" onClick={(event) => { if (window.confirm('¿Estás seguro de querer borrar?')) deleteRegister(event) } } style={{ padding: "5px", marginRight: "10px"}}><ImBin/></Button>}
        </>) 
    }

    return (<>
        {getButtons()}
    </>)
}

export default EditSaveCancelButtons;