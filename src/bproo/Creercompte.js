import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentification from "./contexts/Authentification";
import useRecuperation from "./useRecuperation";

const Creercompte = () => {    
    const emptyIdentifiants = {
        login:'',
        password:'', 
        email:''   
    }
    let err_msg = "";
    let codeVerification = "";
    let code_msg = "";


    const url = 'http://localhost:8000/identifiants';
    const {datas,isLoading,error} = useRecuperation(url);
    const [identifiants,setIdentifiants] = useState(emptyIdentifiants);
    const navigate = useNavigate();
    const {userId,setUserId,isAuthenticated,setIsAuthenticated} = useContext(Authentification); 
    const [error_msg,setError_msg] = useState();

    //const [isLoadingCurrentUser,setIsLoadingCurrentUser] = useState(false); 
    let isLoadingCurrentUser = false; 
    
    function handleOnChange(e){
        const target = e.target;
        setIdentifiants({...identifiants,[target.name]:target.value}); 
        setError_msg('');
    }

    function getRandomIntCode(){
        let c_min = Math.ceil(1000);
        let c_max = Math.floor(9999);
        let nbr = Math.floor(Math.random()*(c_max-c_min)+c_min);
        return "R"+nbr;
    }

    function addUser(userData){
        
        isLoadingCurrentUser = true;
        const url = 'http://localhost:8000/identifiants';
        fetch(url,{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(userData)
        })
        .then((response)=>{
            //console.log('article ajouté avec succes');
            isLoadingCurrentUser = false;
            if(!response.ok){
                throw Error('Echec de création de compte');
            }

            navigate('/login');   //------- redirection apres enregistrement à la racine ---
            setIdentifiants(emptyIdentifiants);

            setIsAuthenticated(false);
            alert("Bienvenue "+userData.login+"\n\n Veuillez vous connecter");
            //navigate('/profile'); 
            
            //navigate(-1);
            //navigate(1);
        })
        .then(()=>{
            //console.log('Echec d\'enregistrement');
            isLoadingCurrentUser = false;
            navigate('/login');   //------- redirection apres enregistrement à la racine ---
            setIdentifiants(emptyIdentifiants);
        })
        .catch((err)=>{
            isLoadingCurrentUser = false;
            console.log(err.message); 
            setError_msg(err.message);                      
        });
    }


    function handleSubmit(evt){
        
        evt.preventDefault();         
        
        let nonDisponible = false;
        datas.forEach((item)=>{
            if((item.email !== '') && (item.email === identifiants.email)){
                nonDisponible = true;                  
                err_msg = "l'adresse : "+item.email+" a déjà un compte";            
            }
            if((item.login !== '') && (item.login === identifiants.login) && (item.password === identifiants.password)){
                nonDisponible = true; 
                err_msg = "Identifiant et mot de passe indisponible";
            }                       
        });

        if (!nonDisponible) {
            //----- identifiants disponibles, verification d'email ----
            //----- Envoi d'un code de verification par mail -----
            codeVerification = getRandomIntCode();
            
            let codeSaisi = prompt("Vous allez recevoir un code par mail \n\n Veuillez entrer ce code : "+codeVerification);
            if(codeVerification === codeSaisi){
                //------- Code vérifié ------
                //alert("------- Code vérifié ------");
                
                addUser(identifiants);                

                console.log("Nouveau compte créé")
                
            }else{
                code_msg = "Code incorrecte";
                console.log(code_msg);
            }
            
        }else{
            console.log(err_msg);
            setError_msg(err_msg); 
        }    
        isLoadingCurrentUser = false;                  
    }


    return ( 
        <div className="Creercompte">                   
            {(isLoading || isLoadingCurrentUser ) && <h2>Vérification en cours ... </h2>}
            {error && <h2 style={{color:'red'}}>{error}</h2>}
            {(error_msg !== "") && <h2 style={{color:'red'}}>{error_msg}</h2>}

            <form action="" onSubmit={handleSubmit} className="form_login">            
                <fieldset className="fieldset_form">                                        
                    <legend className="fieldset_form_legend">Créer un compte</legend>

                    <label htmlFor="email" className="label_form">Entrer votre adresse email</label>
                    <input onChange={(e)=>{handleOnChange(e)}} type="email" id="email" className="email sai_text" name="email" value={identifiants.email} placeholder="xxxx@yyy" required/>

                    <label htmlFor="login" className="label_form">Identifiant</label>
                    <input onChange={(e)=>{handleOnChange(e)}} type="text" id="login" className="login sai_text" name="login" value={identifiants.login} placeholder="Entrer votre Identifiant" required/>

                    <label htmlFor="password" className="label_form">Mot de passe</label>
                    <input onChange={(e)=>{handleOnChange(e)}} type="password" id="password" className="password sai_text" name="password" value={identifiants.password} required/>                

                    {<input className={(!isLoading && !isLoadingCurrentUser)?"btn_validation":"btn_indisponible"} type="submit" value={(!isLoading && !isLoadingCurrentUser)?'Créer':"Enregistrement en cours ..."} disabled={!(!isLoading && !isLoadingCurrentUser)} />}                                             
                </fieldset>
            </form>
        </div>

     );
}
 
export default Creercompte;
