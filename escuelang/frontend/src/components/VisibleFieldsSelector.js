import React, { useState, useRef } from "react";
import { Form, Button, Overlay, Popover } from "react-bootstrap";

const VisibleFieldsSelector = (props) => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const onShow = (event) => {
        setShow(!false);
        if (event != null) {
            event.preventDefault();
            event.stopPropagation();
        }
        setTarget(event.target);
    }
    const onSubmit = (event) => {
        console.log(event.target)
        const selected = [...event.target];
        const result = selected
          .map((option) => option.checked? option.id : null)
          .filter((option) => option != null)
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
        //renderedOptions.push(<option value={key}>{props.translations[key]}</option>)
        renderedOptions.push(<Form.Check 
        type="switch"
        id={key}
        label={props.translations[key]}/>)
    }

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
      <Popover id="popover-basic">
<Popover.Title as="h3">Selecciona campos visibles</Popover.Title>
<Popover.Content>
  <Form onSubmit={onSubmit}>
    <Form.Group>
      {renderedOptions}
    </Form.Group>
  <Button className="m-1" variant="primary" type="submit">Guardar</Button>
  <Button className="m-1" variant="secondary" type="close" onClick={onCancel}>Cancelar</Button>
  </Form>     
</Popover.Content>
</Popover>
      </Overlay>
</div>
    )
}

export default VisibleFieldsSelector;