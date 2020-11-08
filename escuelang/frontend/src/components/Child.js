import React from 'react';
import { Accordion, Card } from 'react-bootstrap'
import ChildDetails from './ChildDetails';

const Child = ({child}) => {
    return (<>
<tr>
<td>
    {child.name}
</td>
<td>
    {child.surname}
</td>
<td>
    {child.birthdate}
</td>
<td>{child.address}
</td>
</tr>
<tr>
<td colSpan="12">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti esse modi cum iusto veritatis odio ullam? Voluptatibus, laboriosam delectus dolor repudiandae, doloremque voluptatem eum maiores sint, facere facilis id explicabo!
    <ChildDetails child={child}/>
</td>
</tr>
</>
)
    }

export default Child;
