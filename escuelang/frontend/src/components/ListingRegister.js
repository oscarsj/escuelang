import React from 'react';
import {Table, Card} from 'react-bootstrap';
import {BsSquare} from 'react-icons/bs';

export class ListingRegister extends React.PureComponent {
    constructor(props) {
        super(props);
        this.registers = props.registers;
        this.inputRef = React.createRef();
        this.fields = props.fields;
        this.translations = props.translations;
    }
    isFieldChild(field) {
        return field in this.translations['child']
    }

    render() {
      return (
    <Card style={{ heigth: '100rem' }}>
    <Card.Body>
    <Card.Title>Escuela de fútbol</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Alumnos</Card.Subtitle>
    <Card.Text>
        <Table bordered>
          <thead>
            {this.fields.map((field)=><th key={`th${field}`}>{this.translations[this.isFieldChild(field)?'child':'register'][field]}</th>)}
            {this.props.assistance && ([...Array(30)].map((id) => <th key={`th${id}`}></th>))}
          </thead>
          <tbody>
          {this.registers && this.registers.map((register) => 
            <tr key={register.id}>
             {this.fields.map((field) => <td key={`${field}-${register.id}`}>{this.isFieldChild(field)?register.child[field]:register[field]}</td>)}
             {this.props.assistance && ([...Array(30)].map((e, id) => <td key={`td-${register.id}-assisstance-${id}`}><BsSquare/></td>))}
            </tr>)}
          </tbody>
        </Table>
    </Card.Text>
    </Card.Body>
    </Card>
      );
    }
  }

export default ListingRegister;