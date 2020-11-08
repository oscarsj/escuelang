import React, { useState } from 'react';
import ChildrenList from './ChildrenList';
import { useEffect } from 'react';
import childrenApi from "../client/children";


const OldChildrenPage = () => {
    const [oldChildren, setOldChildren] = useState("")
  
    useEffect(() => {
        childrenApi
        .getAll()
        .then(children => setOldChildren(children))
    }, []);
    
    return (
        <>
        <div className="h1 center-block">Antiguos alumnos</div>
        <ChildrenList children={oldChildren}/>
        </>
    )
}

export default OldChildrenPage;