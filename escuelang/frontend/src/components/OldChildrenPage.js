import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import ChildrenList from './ChildrenList';
import childrenApi from "../client/children";
import trans from "../translations";


const OldChildrenPage = ({fieldTranslations}) => {
    const [oldChildren, setOldChildren] = useState("")
    const [error, setError] = useState("");
    const [errors, setErrors] = useState("");
    useEffect(() => {
        childrenApi
        .getAll()
        .then(children => setOldChildren(children))
    }, []);

    const onChildUpdated = (event, newChild) => {
      event.stopPropagation();
      event.preventDefault();
      console.log(`child updated: ${newChild.name} ${newChild.surname}`);
      childrenApi
        .update(newChild.id, newChild)
        .then((result) => {
            setErrors({});
            setError("");
            console.log("Result of update: ", result);
            const updatedChildIndex = oldChildren.findIndex(child => child.id == result.id);
            console.log("found index: ", updatedChildIndex);
            const children = [...oldChildren];
            children[updatedChildIndex] = result;
            console.log("New children: ", children);
            setOldChildren(children);
        })
        .catch(err => {
          if (err.response) {
              console.log('Error in update child', err.response);
              setError("Ha habido errores al guardar. Revise los valores introducidos");
              setErrors(err.response.data);
          } else if (err.request) {
              // client never received a response, or request never left
          } else {
              // anything else
          }
      })

      }
    const onChildDeleted = (event, childId) => {
      event.stopPropagation();
      event.preventDefault();
      if (window.confirm(trans.oldChildrenTranslations.confirmDeleteChild)) {
        childrenApi
          .deleteChild(childId)
          .then((result) => {
            console.log("OldChildren page deleted child ", childId);
            setOldChildren(oldChildren.filter((child) => child.id != childId));
          })
          .catch()
      }
    }
    return (
        <>
        <Card className="bg-dark text-white" style={{ bottom_marging: "50px", heigth: '300rem' }}>
        <Card.Body>
          <Card.Title>Antiguos alumnos</Card.Title>
        </Card.Body>
        </Card>
        <ChildrenList 
          fieldTranslations={fieldTranslations} 
          children={oldChildren}
          onChildUpdated={onChildUpdated}
          onChildDeleted={onChildDeleted}
          errors={errors}
          error={error}
          />
        </>
    )
}

export default OldChildrenPage;