import React, { useState } from 'react';


const SeasonData = ({season}) => {
    return (
    <>
    <div className="h1 center-block">{season.name} ({season.course})</div>
    </>
    )
}
    
export default SeasonData;