import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FilterSelector = ({fields, onFilterUpdated, translations}) => {

    const [field, setField] = useState();

    const onNewFilter = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const content = event.target.value;
        onFilterUpdated(field && content? {field: field, content: content}:undefined)
    };
    return (<Form inline>
        <Form.Label htmlFor="inlineFormInputName2" srOnly>
          Field
        </Form.Label>
    <Form.Control 
      id={`filter-${fields}`} 
      as="select"
      value={field}
      onChange={(event) => setField(event.target.value)}
      >
      <option key={`monitor-empty`}></option>
      {fields && fields.map(field => 
      <option key={field} value={field}>{translations[field]}</option>)}
    </Form.Control>
    <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
        Filter string
    </Form.Label>
    <Form.Control 
      type='text'
      id='content'
      placeholder='content' 
      onChange={onNewFilter} 
    />
    
    <Button type="reset" className="mb-2">
        Cancel
    </Button>
    </Form>);
}

export default FilterSelector;