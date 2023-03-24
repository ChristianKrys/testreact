import React, { useContext } from "react";
import { useState,useEffect } from "react";
import useRecuperation from "./useRecuperation";
import { useNavigate } from "react-router-dom";
import Authentification from "./contexts/Authentification";


const Login = () => {
    
    const emptyIdentifiants = {
        login:'',
        password:'',
        email:'',
        userId:0      
    }
    
    const url = 'http://localhost:8000/identifiants';
    const {datas,isLoading,error} = useRecuperation(url);
    const [identifiants,setIdentifiants] = useState(emptyIdentifiants);
    const navigate = useNavigate();
    const {userId,setUserId,isAuthenticated,setIsAuthenticated} = useContext(Authentification);    

    function handleOnChange(e){
        const target = e.target;
        setIdentifiants({...identifiants,[target.name]:target.value});        
    }
    function handleSubmit(evt){
        evt.preventDefault(); 
        
        let isIdentified = false;
        datas.forEach((item)=>{
            if((item.login !== '') && (item.login === identifiants.login) && (item.password === identifiants.password)){
                isIdentified = true; 
                setUserId(item.id);              
            }
        })
        
        setIsAuthenticated(isIdentified);
        if(isIdentified){
            //---- Identification reconnue ------
            setIdentifiants(emptyIdentifiants);
            navigate('/');            
        }else{
            alert("Désolé, Identifiants inconnus !!");
        }                      
    }

    return ( <div className="">                       
        <form action="" onSubmit={handleSubmit} className="form_login">            
            <fieldset className="fieldset_form">
                {isLoading && <h2>Vérification en cours ... </h2>}
                {error && <h2 style={{color:'red'}}>{error}</h2>}

                <legend className="fieldset_form_legend">Entrez vos identifiants</legend>
                <label htmlFor="login" className="label_form">Identifiant</label>
                <input onChange={(e)=>{handleOnChange(e)}} type="text" id="login" className="login sai_text" name="login" value={identifiants.login} placeholder="Entrer votre Identifiant" required/>
                <label htmlFor="password" className="label_form">Mot de passe</label>
                <input onChange={(e)=>{handleOnChange(e)}} type="password" id="password" className="password sai_text" name="password" value={identifiants.password} required/>                

                {!isLoading && <input className="btn_validation" type="submit" value={'Connexion'} />}
                {isLoading && <input type="submit" value="Enregistrement en cours ..." disabled/>}                                              
            </fieldset>
        </form>
    </div>
     );
}
 
export default Login;