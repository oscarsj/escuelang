import React, { useState } from 'react';
import Moment from 'moment';

const SeasonData = ({season}) => {
    return (
    <>
    <div className="h1 center-block">{season.name} ({season.course})</div>
    de {season.start_date? Moment(season.start_date).format("DD-MM-yy"):"(sin definir)"} a {season.end_date? Moment(season.end_date).format("DD-MM-yy"):"(sin definir)"},
    Precio base: {season.default_price} €, 
    {season.active? " Temporada activa, ":""} 
    {season.children? season.children.length: 0} alumnos registrados
    </>
    )
}
    
export default SeasonData;