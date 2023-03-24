import Home from './Home';
import NavBar from './NavBar';
import {Routes,Route} from 'react-router-dom'
import Ajouter from './Ajouter';
import BlogDetail from './BlogDetail';
import NotFound from './NotFound';
import Login from './Login';
import { useState } from 'react';
import Authentification from './contexts/Authentification';
import Profile from './Profile';
import Creercompte from './Creercompte';


const App = () => {    
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [userId,setUserId] = useState(null);    

    return ( 
        <Authentification.Provider value={{userId,setUserId,isAuthenticated,setIsAuthenticated}}>            
            <div className="app">
                <NavBar/>
                <div className="contenu">
                    <Routes>
                        <Route exact path='/' element={<Home/>}/>
                        <Route path='/add' element={<Ajouter/>}/>
                        <Route path='/blogs/:id' element={<BlogDetail/>}/> 
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/enregistrement' element={<Creercompte/>}/>
                        <Route path='*' element={<NotFound/>} />
                    </Routes>                
                </div>
            </div>
        </Authentification.Provider>
     );
}
 
export default App;