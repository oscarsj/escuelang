import React, { useState, useRef } from "react";
import { Form, Button, Overlay, Popover } from "react-bootstrap";

const VisibleFieldsSelector = ({onSubmit, initialFields, translations}) => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [visibleFields, setVisibleFields] = useState(initialFields);
    const ref = useRef(null);

    const onShow = (event) => {
        setShow(!show);
        if (event != null) {
            event.preventDefault();
            event.stopPropagation();
        }
        setTarget(event.target);
    }
    const handleSubmit = (event) => {
        console.log(event.target)
        const selected = [...event.target];
        const result = selected
          .map((option) => option.checked? option.id.replace('check','') : null)
          .filter((option) => option != null)
        setShow(false);
        setVisibleFields(result);
        onSubmit(result);
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

    for (var key in translations) {
       renderedOptions.push(
            <Form.Check inline
            key={`check${key}`}
            type="switch"
            id={`check${key}`}
            defaultChecked={visibleFields.includes(key)}
            label={translations[key]}
            size="lg"/>); 
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
  <Form onSubmit={handleSubmit}>
    <Form.Group>
      {renderedOptions}
    </Form.Group>
  <Button className="m-1" variant="primary" type="submit" size="sm">Aplicar</Button>
  <Button className="m-1" variant="secondary" type="close" size="sm" onClick={onCancel}>Cancelar</Button>
  </Form>     
</Popover.Content>
</Popover>
      </Overlay>
</div>
    )
}

export default VisibleFieldsSelector;