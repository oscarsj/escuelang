import React, { useState } from 'react';
import ChildrenList from './ChildrenList';
import { useEffect } from 'react';
import childrenApi from "../client/children";
import trans from "../translations";


const OldChildrenPage = ({fieldTranslations}) => {
    const [oldChildren, setOldChildren] = useState("")
  
    useEffect(() => {
        childrenApi
        .getAll()
        .then(children => setOldChildren(children))
    }, []);

    const onChildUpdated = (event, newChild) => {
      event.stopPropagation();
      event.preventDefault();
      console.log("child updated: ", event.target);
      childrenApi
        .update(newChild.id, newChild)
        .then((result) => {
            setEditMode(false);
            setErrors({});
            setError("");
            console.log("Result of update: ", newChild);
            const updatedChildIndex = oldChildren.findIndex(child => child.id == newChild.id);
            console.log("found index: ", updatedChildIndex);
            const children = [...oldChildren];
            children[updatedChildIndex] = newChild;
      
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
        <div className="h1 center-block">Antiguos alumnos</div>
        <ChildrenList 
          fieldTranslations={fieldTranslations} 
          children={oldChildren}
          onChildUpdated={onChildUpdated}
          onChildDeleted={onChildDeleted}/>
        </>
    )
}

export default OldChildrenPage;