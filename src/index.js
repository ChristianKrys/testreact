import ReactDOM from "react-dom"; /*Pour pouvoir utiliser ReactDOM*/
import React from "react"; /*Pour pouvoir utiliser les composants de classes*/
import App from "./app";
import Navbar from "./navbar";
import DisplayPic from "./displayPic";


let titre = "Bonjour le mode";
let salut = "les Ndjombayeuses !"

const conteneur = document.getElementById('root');
//const composant = <App mon_titre={titre} salutation={salut}/>

const template = (
  <>
      <header>
        <Navbar />
      </header>
      <main>        
        <div id="bienvenue">
          <App mon_titre={titre} salutation={salut}/>          
          <img src="./images/logo-secret.png" alt="" id="logo_secret"/>
        </div>
        <DisplayPic />

             
      </main>
  </>
);

ReactDOM.render(template,conteneur);



