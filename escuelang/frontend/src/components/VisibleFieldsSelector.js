import React, { useState, useRef } from "react";
import { Form, Button, Overlay, OverlayTrigger, Popover } from "react-bootstrap";

const VisibleFieldsSelector = (props) => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const onShow = (event) => {
        setShow(true);
        if (event != null) {
            event.preventDefault();
            event.stopPropagation();
        }
        setTarget(event.target);
    }
    const onSubmit = (event) => {
        const selected = [...event.target.elements[0].selectedOptions];
        const result = selected.map((option) => option.value)
        setShow(false);
        props.onSubmit(result);
        setTarget(event.target);
        event.preventDefault();
        event.stopPropagation();
    }
    const onCancel = (event) => {
        setShow(false);
        if (event != null) {
            event.preventDefault();
            event.stopPropagation();
        }
        setTarget(event.target);
    }
    const renderedOptions = []
    for (var key in props.translations) {
        renderedOptions.push(<option value={key}>{props.translations[key]}</option>)
    }
    const popover = (
<Popover id="popover-basic">
<Popover.Title as="h3">Selecciona campos visibles</Popover.Title>
<Popover.Content>
  <Form onSubmit={onSubmit}>
    <Form.Group>
    <Form.Control id='fields' as="select" multiple>
      {renderedOptions}
    </Form.Control>
    </Form.Group>
  <Button className="m-1" variant="primary" type="submit">Guardar</Button>
  <Button className="m-1" variant="secondary" type="close" onClick={onCancel}>Cancelar</Button>
  </Form>     
</Popover.Content>
</Popover>
      );

    return (
        <div ref={ref}>
<Button className="mb-2" variant="outline-primary" size="sm" onClick={onShow}>
    Campos visibles
</Button>
<Overlay
        show={show}
        target={target}
        placement="right"
        container={ref.current}
        containerPadding={20}
      >
        {popover}
      </Overlay>
</div>
    )
}

export default VisibleFieldsSelector;