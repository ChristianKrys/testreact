import Home from './Home';
import NavBar from './NavBar';
import {Routes,Route} from 'react-router-dom'
import Ajouter from './Ajouter';
import BlogDetail from './BlogDetail';
import NotFound from './NotFound';


const App = () => {
    return ( 
        <div className="app">
            <NavBar/>
            <div className="contenu">
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route path='/add' element={<Ajouter/>}/>
                    <Route path='/blogs/:id' element={<BlogDetail/>}/>  
                    <Route path='*' element={<NotFound/>} />
                </Routes>                
            </div>
        </div>
     );
}
 
export default App;