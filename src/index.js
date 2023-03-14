import {createRoot} from 'react-dom/client';/*Pour pouvoir utiliser createRoot*/
import ReactDOM from "react-dom"; /*Pour pouvoir utiliser ReactDOM*/
import React from "react"; /*Pour pouvoir utiliser les composants de classes*/
import App from "./app";
import Navbar from "./navbar";
import DisplayPic from "./displayPic";
import "./css/style.css";
import FilterableProductTable from "./produit";


let titre = "Ndjomba secret";
let salut = "les Ndjombayeuses nouveau !"


const template = (
  <>
      <header>
        <Navbar />
      </header>
      <main>        
        <FilterableProductTable />
        <div id="bienvenue">
          <App mon_titre={titre} salutation={salut}/>          
          <img src="./images/logo-secret.png" alt="" id="logo_secret"/>
        </div>
        <DisplayPic />     
      </main>
  </>
);

//ReactDOM.render(template,conteneur); //--ancien--
const conteneur = document.getElementById('root');
const racine = createRoot(conteneur);
racine.render(template);



