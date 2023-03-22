import {createRoot} from 'react-dom/client';/*Pour pouvoir utiliser createRoot*/
import ReactDOM from "react-dom"; /*Pour pouvoir utiliser ReactDOM*/
import React, { StrictMode } from "react"; /*Pour pouvoir utiliser les composants de classes*/
import {BrowserRouter} from 'react-router-dom';

import "./css/style.css";
//import App from "./ndjomba/App"; //----- ndjomba ----
//import App from "./technos/App"; //----- techno ----
import App from "./bproo/App"; //----- bproo ----




const template = (
  <StrictMode>
    <BrowserRouter>
      <App/> 
    </BrowserRouter>          
  </StrictMode>
);


//ReactDOM.render(template,conteneur); //--ancien--
const conteneur = document.getElementById('root');
const racine = createRoot(conteneur);
racine.render(template);






