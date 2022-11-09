import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

axios
  .get('/api/persons')
  .then(response => {
    const persons = response.data
    root.render(
      <React.StrictMode>
        <App persons={persons}/>
      </React.StrictMode>
    );
  })




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
