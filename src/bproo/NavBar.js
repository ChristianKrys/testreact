import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Authentification from "./contexts/Authentification";


const NavBar = () => {
    const {isAuthenticated,setIsAuthenticated} = useContext(Authentification);

    function handleDeconnexion(){
        setIsAuthenticated(false);
    }

    return ( 
        <nav className="navbar">
            <div><NavLink  to="/" className="logo" >EencSoft Blog</NavLink></div>
            <ul className="liens">
                <li>
                    <NavLink to="/" className={({isActive})=>(isActive?"lien buttonArticle":"lien")}>Accueil</NavLink>
                </li>
                {(isAuthenticated && <>
                    <li>
                        <NavLink to="/add" className={({isActive})=>(isActive?"lien buttonArticle":"lien")}>Créer un article</NavLink>                    
                    </li>
                    <li>
                        <NavLink to="/profile" className={({isActive})=>(isActive?"lien buttonArticle":"lien")}>Mon compte</NavLink>                    
                    </li>
                    <li>
                        <NavLink to="/" onClick={handleDeconnexion} className="lien btn_deconnexion">Déconnexion</NavLink>                    
                    </li>
                </>) || (
                !isAuthenticated && <>
                    <li>
                        <NavLink to="/login" className={({isActive})=>(isActive?"lien buttonArticle":"lien")}>Se connecter</NavLink>                    
                    </li>
                    <li>
                        <NavLink to="/enregistrement" className={({isActive})=>(isActive?"lien buttonArticle":"lien")} >S'enregistrer</NavLink>                    
                    </li>
                </>)
                }

            </ul>
        </nav>
     );
}
 
export default NavBar;