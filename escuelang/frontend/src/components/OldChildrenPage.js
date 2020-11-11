import React, { useState } from 'react';
import ChildrenList from './ChildrenList';
import { useEffect } from 'react';
import childrenApi from "../client/children";


const OldChildrenPage = ({fieldTranslations}) => {
    const [oldChildren, setOldChildren] = useState("")
  
    useEffect(() => {
        childrenApi
        .getAll()
        .then(children => setOldChildren(children))
    }, []);
    const onChildUpdated = (newChild) => {
        console.log("Result of update: ", newChild);
        const updatedChildIndex = oldChildren.findIndex(child => child.id == newChild.id);
        console.log("found index: ", updatedChildIndex);
        const children = [...oldChildren];
        children[updatedChildIndex] = newChild;

        console.log("New children: ", children);
        setOldChildren(children);
      }
    return (
        <>
        <div className="h1 center-block">Antiguos alumnos</div>
        <ChildrenList 
          fieldTranslations={fieldTranslations} 
          children={oldChildren}
          onChildUpdated={onChildUpdated}/>
        </>
    )
}

export default OldChildrenPage;