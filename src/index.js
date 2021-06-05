import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Installer React-router et Importer BrowserRouter 
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    {/* Entourer toute l'app, avec le composant BrowserRouter */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
