import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import TechnoAdd from "./TechnoAdd";
import TechnoList from "./TechnoList";

const App = () => {
    
    const technoKey='techno';
    const [technos,setTechnos] = useState([]);

    function saveTechno(techno){
        window.localStorage.setItem(technoKey,JSON.stringify(techno)); 
    }

    function handleAddTechno(techno){
        if(techno.id !== null && techno.id !== ''){
            saveTechno([...technos,techno])
            setTechnos([...technos,techno]); 
        }                          
    }

    function handleDelete(id){
        const delTechno = technos.filter(techno=>(techno.id!==id));  
        saveTechno(delTechno);      
        setTechnos(delTechno);                
    }
    

    useEffect(() => {
        const tech = window.localStorage.getItem(technoKey);
        if(tech === null){
            //fetch();
        }else{            
            setTechnos(JSON.parse(tech));
        }
    }, []);

    return (
        <>            
            <NavBar/>
            <Routes>                  
                <Route path="/" element={<Home/>}/>
                <Route path="/add" element={<TechnoAdd handleAddTechno={handleAddTechno}/>}/>
                <Route path="/list" element={<TechnoList technos={technos} handleDelete={handleDelete}/>}/>          
            </Routes> 
        </>
     );
}
 
export default App;

