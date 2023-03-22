
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Ajouter = (props) => {

    const t_date = new Date();
    const tmp_date = t_date.toLocaleDateString()+" "+t_date.getHours()+":"+t_date.getMinutes()+":"+t_date.getSeconds();
    
    //id:0,  Ajouté automatiquement par le serveur
    const initBlog = {        
        title:'',
        author:'',
        body:'',
        email:'',
        date: tmp_date
    }    
    
    const [newBlog,setNewBlog] = useState(initBlog)
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();


    function handleSubmit(evt){
        evt.preventDefault();
        handleAddBlog(newBlog); 
        setNewBlog(initBlog);
    }

    function handleOnChange(e){
        const target = e.target;        
        setNewBlog({...newBlog,id:newBlog.id,[target.name]:target.value});        
    }

    const url = 'http://localhost:8000/blogs';
    function handleAddBlog(newBlog){
        setIsLoading(true);
        fetch(url,{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(newBlog)
        })
        .then(()=>{
            //console.log('article ajouté avec succes');
            setIsLoading(false);

            navigate('/');   //------- redirection apres enregistrement à la racine ---
            
            //navigate(-1);
            //navigate(1);
        })
        .then(()=>{
            //console.log('Echec d\'enregistrement');
            setIsLoading(false);
            navigate('/');   //------- redirection apres enregistrement à la racine ---
        });
    }

    return ( 
        <div className="creat-blog">
            <h2>Ajouter un blog</h2>            
            <form onSubmit={(evt)=>handleSubmit(evt)}>
                <label htmlFor="techno-name">Titre de l'article :</label><br/>
                <input required type="text" name="title" id="techno-name" value={newBlog.title} onChange={(e)=>(handleOnChange(e))}/><br/>
                <label htmlFor="techno-category">Selectionnez un auteur :</label><br/>
                <select name="author" id="techno-category" value={newBlog.author} onChange={(e)=>(handleOnChange(e))}>
                    <option value=""></option>
                    <option value="TontonEBOGO">Tonton EBOGO</option>
                    <option value="Jean-PirrePARPING">Jean-Pirre PARPING</option>
                    <option value="EDINGLamour">EDING Lamour</option>
                    <option value="other">Other</option>                    
                </select><br/>
                <label htmlFor="techno-description">Contenu de l'article :</label><br/>
                <textarea cols="50" rows="5" name="body" id="techno-description" value={newBlog.body} onChange={(e)=>(handleOnChange(e))}/><br/>                                
                {!isLoading && <input type="submit" value="Ajouter le blog" />}
                {isLoading && <input type="submit" value="Enregistrement en cours ..." disabled/>}                                              
            </form>
        </div>
     );
}

export default Ajouter;