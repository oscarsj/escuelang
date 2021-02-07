import React, {useState, useRef} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { ListingRegister } from './ListingRegister';
import { AiOutlinePrinter } from 'react-icons/ai';

const PrintDialog = ({registers}) => {
    const [show, setShow] = useState(false);
    const [assistance, setAssistance] = useState(false);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

return (<>
    <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Listados</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <ListingRegister
        ref={componentRef}
        registers={registers}
        assistance={assistance} />
    </Modal.Body>
    <Modal.Footer>
    <Button onClick={()=> setAssistance(!assistance)} variant="secondary">{assistance? "Quitar ":"Añadir "}asistencia</Button>
    <Button onClick={handlePrint} variant="primary"><AiOutlinePrinter/></Button>
    </Modal.Footer>
    </Modal>
      
    <Button onClick={() => setShow(true)}><AiOutlinePrinter/></Button>
    </>)
}

export default PrintDialog;