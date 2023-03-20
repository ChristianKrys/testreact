import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    return ( 
        <div className="menu_techno">
            <ul>
                <li><NavLink to="/" className={({ isActive })=>(isActive ? "activeLink" : undefined)} >Home</NavLink></li>
                <li><NavLink to="/add" className={({ isActive })=>(isActive ? "activeLink" : undefined)} >Add Techno</NavLink></li>
                <li><NavLink to="/list" className={({ isActive })=>(isActive ? "activeLink" : undefined)}>All Technos</NavLink></li>
            </ul>
        </div>
     );
}
 
export default NavBar;

