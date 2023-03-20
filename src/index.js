import {createRoot} from 'react-dom/client';/*Pour pouvoir utiliser createRoot*/
import ReactDOM from "react-dom"; /*Pour pouvoir utiliser ReactDOM*/
import React, { StrictMode } from "react"; /*Pour pouvoir utiliser les composants de classes*/
import {BrowserRouter} from 'react-router-dom';

import "./css/style.css";
import App from "./technos/App";


/*
import App from "./app";
import Navbar from "./navbar";
import DisplayPic from "./displayPic";
import FilterableProductTable from "./produit";
import Correction from './correction';
import Apli, {TodoList,PostTable} from './test';

let titre = "Ndjomba secret";
let salut = "les Ndjombayeuses nouveau !"

const template = (
  <>
      <header>
        <Navbar />
      </header>
      <main>  
        <Apli/> 
        <div className="ecartement"></div>
        <PostTable/>
        <div className="ecartement"></div>
        <TodoList/>        
        <div className="ecartement"></div>     
        <Correction />
        <div className="ecartement"></div>
        <FilterableProductTable/>
        <div id="bienvenue">
          <App mon_titre={titre} salutation={salut}/>          
          <img src="./images/logo-secret.png" alt="" id="logo_secret"/>
        </div>
        <DisplayPic />     
      </main>
  </>
);
*/


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






