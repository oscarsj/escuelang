import React, { useState, useRef } from "react";
import { Form, Button, Overlay, Popover } from "react-bootstrap";
import {visibleFieldsTranslations} from '../translations';
import {useSettingsStore} from '../store';

const VisibleFieldsSelector = ({onSubmit, initialFields, translations}) => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [visibleFields, setVisibleFields] = useState(initialFields);
    const ref = useRef(null);
    const lang = useSettingsStore((state) => state.language);  
    const trans = visibleFieldsTranslations[lang];
    
    const onShow = (event) => {
        setShow(!show);
        if (event != null) {
            event.preventDefault();
            event.stopPropagation();
        }
        setTarget(event.target);
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();  
      console.log(event.target)
        const selected = [...event.target];
        const result = selected
          .map((option) => option.checked? option.id.replace('check','') : null)
          .filter((option) => option != null)
        setShow(false);
        setVisibleFields(result);
        onSubmit(result);
        setTarget(event.target);
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
<Button className="mb-2" variant="outline-secondary" size="sm" onClick={onShow}>
    {trans.show_button}
</Button>
<Overlay
        show={show}
        target={target}
        placement="right"
        container={ref.current}
        containerPadding={20}
      >
      <Popover id="popover-basic">
<Popover.Title as="h3">{trans.title}</Popover.Title>
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