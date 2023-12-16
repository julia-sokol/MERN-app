// Is required for writing JSX code.
import React from 'react';
// Is used for rendering React components into the DOM.
import ReactDOM from 'react-dom/client';
import './index.css';
// A root component of the application.
import App from './App';
// Are used for managing state and providing it to components within the application.
import { RecipesContextProvider } from './context/RecipesContext';
import { AuthContextProvider } from './context/AuthContext'

/*Create a new root-level render tree. It takes the DOM element with the ID 'root' as an argument. 
 This is the root element where the entire React application will be mounted. */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*A tool that helps identify common mistakes in the code and provides 
  better development warnings. It is used as a wrapper around the application. */
  <React.StrictMode>
    <AuthContextProvider>
      <RecipesContextProvider>
        <App />
      </RecipesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)