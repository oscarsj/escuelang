import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import seasons from './client/seasons';

seasons
  .getActive()
  .then(season =>
    seasons.getActiveChildren()
    .then(children => 
        ReactDOM.render(
            <App season={season} children={children.map((register) => register.child)}/>,
            document.getElementById('app')
        )
  )
)
