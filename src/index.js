import ReactDOM from "react-dom"; /*Pour pouvoir utiliser ReactDOM*/
import React from "react"; /*Pour pouvoir utiliser les composants de classes*/
import App from "./app";
import Navbar from "./navbar";


let titre = "Bonjour le mode";
let salut = "Bienvenue !"

const conteneur = document.getElementById('root');
//const composant = <App mon_titre={titre} salutation={salut}/>

const template = (
  <div>
      <header>
        <Navbar />
      </header>
      <main>
        <App mon_titre={titre} salutation={salut}/>
        <img src="images/logo_shopify.png" alt="" id="logo_shopify" />   
        <img src="gg.jpg" alt="" id="logo_shopify" width={"200px"} height={"200px"}/>     
      </main>
  </div>
);

ReactDOM.render(template,conteneur);



