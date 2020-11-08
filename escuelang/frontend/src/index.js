import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import courses from './client/courses';

courses
  .getAll()
  .then(
      ReactDOM.render(
            <App />,
            document.getElementById('app')
      )
  )
