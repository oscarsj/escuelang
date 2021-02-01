import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import ChildrenList from './ChildrenList';
import childrenApi from "../client/children";
import {useOldChildrenStore} from "../store";

const OldChildrenPage = () => {
    const setChildren = useOldChildrenStore((state) => state.setChildren)

    useEffect(() => {
        childrenApi
        .getAll()
        .then(children => setChildren(children))
    }, []);

    return (
        <>
        <Card className="bg-dark text-white" style={{ bottom_marging: "50px", heigth: '300rem' }}>
        <Card.Body>
          <Card.Title>Antiguos alumnos</Card.Title>
        </Card.Body>
        </Card>
        <ChildrenList />
        </>
    )
}

export default OldChildrenPage;