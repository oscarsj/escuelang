import React from 'react';
import { Accordion, Card } from 'react-bootstrap'
import ChildDetails from './ChildDetails';

const Child = ({child}) => {
    return (<>
<tr>
<td><Accordion.Toggle key={child.id} as={Card.Header} eventKey={child.id}>
{child.name}
</Accordion.Toggle>
</td>
<td>
<Accordion.Toggle key={child.id} as={Card.Header} eventKey={child.id}>
{child.surname}
</Accordion.Toggle>
</td>
<td><Accordion.Toggle key={child.id} as={Card.Header} eventKey={child.id}>
    {child.birthdate}
</Accordion.Toggle>
</td>
<td><Accordion.Toggle key={child.id} as={Card.Header} eventKey={child.id}>
    {child.address}
</Accordion.Toggle>
</td>
</tr>
<tr>
<Accordion.Collapse colSpan="12" eventKey={child.id}>
<td colSpan="12">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti esse modi cum iusto veritatis odio ullam? Voluptatibus, laboriosam delectus dolor repudiandae, doloremque voluptatem eum maiores sint, facere facilis id explicabo!
    <ChildDetails child={child}/>
</td>
</Accordion.Collapse>
</tr>
</>
)
    }

export default Child;
