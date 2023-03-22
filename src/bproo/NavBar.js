import { NavLink } from "react-router-dom";

const NavBar = () => {
    return ( 
        <nav className="navbar">
            <div><NavLink  to="/" className="logo" >Bproo Blog</NavLink></div>
            <ul className="liens">
                <li>
                    <NavLink to="/" className="lien">Accueil</NavLink>
                </li>
                <li>
                    <NavLink to="/add" className="lien buttonArticle">Créer un article</NavLink>                    
                </li>
            </ul>
        </nav>
     );
}
 
export default NavBar;