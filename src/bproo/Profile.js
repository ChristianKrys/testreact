import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentification from "./contexts/Authentification";
import ImageUpload from "./ImageUpload";
import useRecuperation from "./useRecuperation";

const Profile = () => {



    const emptyUser = {
        nom:'',
        prenom:'',
        telephone:'',
        urlPhoto:''
    }           
        
    
    const fileElem = useRef();    
    const navigate = useNavigate();
    const {userId,isAuthenticated,setIsAuthenticated} = useContext(Authentification); 
    const [userData,setUserData] = useState(emptyUser);
    //const [urlPicture,setUrlPicture] = useState();

    //const [isLoadingCurrentUser,setIsLoadingCurrentUser] = useState(false);
    let isLoadingCurrentUser = false;

    const url = 'http://localhost:8000/profile';
    //const {datas,isLoading,error} = useRecuperation(url);
    let error = null;
    let isLoading = false;

    //------ current user ----------    
    
    //setUserData((datas === null)?emptyUser:datas); 


    useEffect(()=>{ 
        let currentUser = {...emptyUser};                 
        isLoading = true;

        //*******/
        (async ()=>{
            const abortCtrl = new AbortController(); //---- pour permettre l'arrêt d'une requête en cours ------- 
            //fetch('http://localhost:8000/blogs')
            await fetch(url,{signal:abortCtrl.signal})
                .then((reponse)=>{
                    if(!reponse.ok){
                        throw Error('Désolé, une erreur est survenue');
                    }                
                    return reponse.json();
                })
                .then((data)=>{
                    if(data !== null) {
                        data.forEach(element => {
                            if(element.id===userId){
                                currentUser = {...element}; 
                                setUserData(currentUser);
                                isLoading = false;                    
                            }
                        });
                    }                              
                })
                .catch((err)=>{
                    if(err.name === "AbortError"){
                        //console.log(err.message);
                    }else{
                        error = err.message+". "+error; 
                        isLoading = false; 
                    }              
                })
                return ()=>abortCtrl.abort(); //------ finalisation de l'arrêt de la requête ----------
        })();
        //******/ 

    },[]);
    

    function handleOnChange(e){
        const target = e.target;        
        if(target.name === "urlPhoto"){
            //----- Récupération de l'objet à prévisualiser,Selection du premier fichier e.target.files[0], vue que multiple={false} dans <input> -------            
            //setUrlPicture(URL.createObjectURL(e.target.files[0])); 
            const urlObj = URL.createObjectURL(e.target.files[0]);

            //---- sauvegarde un nom du fichier ------
            setUserData({...userData,[target.name]:urlObj}); 
                        
        }else{
            setUserData({...userData,[target.name]:target.value}); 
        }
    }
    
    const handleSupprime = (id)=>{        
        //---- procedure de suppression de profile ---------
        let url_delete = 'http://localhost:8000/profile/'+id;
        fetch(url_delete,{method: 'DELETE'})
            .then((response)=>{
                console.log('Suppression reussie','response.status : '+response.status,'response.ok : '+response.ok);
                if(!response.ok){
                    throw Error('Echec de suppression');
                }

                url_delete = 'http://localhost:8000/identifiants/'+id;
                fetch(url_delete,{method: 'DELETE'});


                isLoadingCurrentUser = false;
                setIsAuthenticated(false);
                navigate('/login');
            })
            .catch((err)=>{
                console.log(err.message);
            })
    }

    function addUser(){
        const newWrlPhoto = "images/fem1.jpg";

        const url = 'http://localhost:8000/profile';
        fetch(url,{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({...userData,["urlPhoto"]:newWrlPhoto})
        })
        .then((response)=>{
            //console.log('article ajouté avec succes');
            isLoadingCurrentUser = false;
            if(!response.ok){
                throw Error('Echec d\'ajout');
            }

            navigate('/');   //------- redirection apres enregistrement à la racine ---
            
            //navigate(-1);
            //navigate(1);
        })
        .then(()=>{
            //console.log('Echec d\'enregistrement');
            isLoadingCurrentUser = false;
            navigate('/');   //------- redirection apres enregistrement à la racine ---
        })
        .catch((err)=>{
            console.log(err.message);
        });
    }

    function updateUser(newUserData){
        const newWrlPhoto = "images/fem1.jpg";

        const url = 'http://localhost:8000/profile/'+userId;
        fetch(url,{
            method: 'PATCH',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({...newUserData,["urlPhoto"]:newWrlPhoto})
        })
        .then((response)=>{
            //console.log('article ajouté avec succes');
            isLoadingCurrentUser = false;
            if(!response.ok){
                throw Error('Echec de modification');
            }

            navigate('/');   //------- redirection apres enregistrement à la racine ---
            
            //navigate(-1);
            //navigate(1);
        })
        .then(()=>{
            //console.log('Echec d\'enregistrement');
            isLoadingCurrentUser = false;
            navigate('/');   //------- redirection apres enregistrement à la racine ---
        })
        .catch((err)=>{
            console.log(err.message);
        });
    }
    

    function handleSubmit(e){

        //------ Ajout de nouweau profil -------        

        e.preventDefault();

        isLoadingCurrentUser = true;
        if(userId!==0 && userId!==null){
            updateUser({
                nom:userData.nom,
                prenom:userData.prenom,
                telephone:userData.telephone,
                urlPhoto:userData.urlPhoto
            });
        }else{
            addUser();
        }
    }

    
    return ( 
        <div className="profile">            
            <div className="div_message_profile">
                {(isLoading || isLoadingCurrentUser) && <h2>Chargement en cours ... </h2>}
                {error && <h2 style={{color:'red'}}>{error}</h2>}
            </div>
            <div className="div_form_profile">
                <form action="" onSubmit={handleSubmit} className="form_profile">            
                    <fieldset className="fieldset_form">
                        <legend className="fieldset_form_legend">Mon  profile</legend>
                        <div className="userIdentity">
                            <div className="userIdentityData">                                
                                <label htmlFor="nom" className="label_form">Entrer votre nom</label>                        
                                <input onChange={(e)=>{handleOnChange(e)}} type="text" id="nom" className="nom sai_text" name="nom" value={userData.nom} placeholder="Entrer votre nom" required/>

                                <label htmlFor="prenom" className="label_form">Entrer votre prénom</label>                        
                                <input onChange={(e)=>{handleOnChange(e)}} type="text" id="prenom" className="prenom sai_text" name="prenom" value={userData.prenom} placeholder="Entrer votre prénom"/>

                                <label htmlFor="telephone" className="label_form">Entrer votre numéro de téléphone</label>                        
                                <input onChange={(e)=>{handleOnChange(e)}} type="text" id="telephone" className="telephone sai_text" name="telephone" value={userData.telephone} placeholder="+237 XXX XXX XXX"/>
                            </div>                            
                            <div className="userIdentityPhoto">                                                                                      
                                <input onChange={(e)=>{handleOnChange(e)}} type="file" accept="image/*" multiple={false} id="urlPhoto" className="urlPhoto sai_text" name="urlPhoto" hidden/>
                                <label htmlFor="urlPhoto">                                    
                                    {userData.urlPhoto && <div className="cadrePhoto"><img src={userData.urlPhoto} alt="user photo" /></div>}
                                    Charger votre photo
                                </label>
                            </div>                            
                        </div>
                        

                        <div className="btn_profile">
                            {(!isLoading && !isLoadingCurrentUser) && <input name="btn_validation" id="btn_validation_profile" className="btn_validation" type="submit" value={'Enregistrer'} />}
                            {(!isLoading && !isLoadingCurrentUser) && <input onClick={()=>handleSupprime(userId)} name="btn_supprime" className="btn_supprime" type="button" value={'Supprimer'} />}
                            {(isLoading || isLoadingCurrentUser) && <input type="submit" className="btn_indisponible" value="Enregistrement en cours ..." disabled/>} 
                        </div>                                             
                    </fieldset>
                </form>
            </div>
        </div>
     );
}
 
export default Profile;

