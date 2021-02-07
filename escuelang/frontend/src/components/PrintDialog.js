import React, {useState, useRef} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { ListingRegister } from './ListingRegister';
import { AiOutlinePrinter } from 'react-icons/ai';
import {
    useDaysStore } from '../store';

const PrintDialog = ({registers, fields, translations}) => {
    const [show, setShow] = useState(false);
    const [assistance, setAssistance] = useState(false);
    const allDays = useDaysStore(state => state.days);
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

return (<>
    <Modal show={show} size="lg"
      centered
      scrollable
      onHide={() => setShow(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Listado</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <ListingRegister
        ref={componentRef}
        registers={registers}
        assistance={assistance}
        translations={translations}
        days={allDays}
        fields={fields} />
    </Modal.Body>
    <Modal.Footer>
    <Button onClick={()=> setAssistance(!assistance)} variant="secondary">{assistance? "Quitar ":"Añadir "}asistencia</Button>
    <Button onClick={handlePrint} variant="primary"><AiOutlinePrinter/></Button>
    </Modal.Footer>
    </Modal>
      
    <Button onClick={() => setShow(true)} size='sm' variant='outline-secondary'><AiOutlinePrinter/></Button>
    </>)
}

export default PrintDialog;