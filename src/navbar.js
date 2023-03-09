

function Navbar(props){
    return(
        /*-- barre de navigation --*/
        <nav id="navbar">            
            <div id="lien_menu">                
                <img src="./images/logo-secret.png" alt="" id="logo_secret_navBar"/>               
                <a href="#">Solution</a>
                <a href="#">Tarification</a>
                <a href="#">Ressources</a>
            </div>
            <div id="menu_connexion">
                <div id="bouton_SeConnecter">Se connecter</div>
                <div id="bouton_Demarrer_Essai_Gratuit">Démarrer un essai gratuit</div>
            </div>
        </nav>
    );
}


export default Navbar;


