import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const VisibleFieldsSelector = (props) => {
    const [show, setShow] = useState(false);
    const onSubmit = (event) => {
        const selected = [...event.target.elements[0].selectedOptions];
        const result = selected.map((option) => option.value)
        setShow(false);
        props.onSubmit(result);
        event.preventDefault();
        event.stopPropagation();
    }
    const onCancel = (event) => {
        setShow(false);
        if (event != null) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    const renderedOptions = []
    for (var key in props.translations) {
        renderedOptions.push(<option value={key}>{props.translations[key]}</option>)
    }
    return (
<>
<Button className="m-1" variant="outline-primary" size="sm" onClick={() => setShow(!show)}>
    Campos visibles
</Button>
<Modal show={show} onHide={onCancel}>
  <div className="container">
  <Form onSubmit={onSubmit}>
    <Form.Group>
    <Form.Label>Selecciona campos visibles</Form.Label>
    <Form.Control id='fields' as="select" multiple>
      {renderedOptions}
    </Form.Control>
    </Form.Group>
  <Button className="m-1" variant="primary" type="submit">Guardar</Button>
  <Button className="m-1" variant="secondary" type="close" onClick={onCancel}>Cancelar</Button>
  </Form>
  </div>
</Modal>
</>
    )
}

export default VisibleFieldsSelector;