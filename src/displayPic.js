import React, {useState, useEffect, useRef} from 'react';

export default function DisplayPic(){
    
    const listImages = ['sacret-1.jpg','sacret-2.png','sacret-3.jpg','sacret-4.png'];
    const [tabImages,setTabImages] = useState([...listImages]); 
    const [cacherBoutonSupprime,steCacherBoutonSupprime] = useState(-1);
    const [actif,setActif] = useState(false);
    const viderTout = useRef(false);
    
    let saisie = null
    function inputTextonChange(event){
        saisie = event.target.value;
    }

    function buttononChargerClick(){
        if (saisie !== null){
            const newListe = [...tabImages,saisie];
            setTabImages(newListe);
        }
    }

    function InputTemplate(){ // Composant enfant
        let annulerId = ""
        return(
            <div id="form">            
                <input type="text" onChange={inputTextonChange} placeholder="Entrez le nom du fichier" />
                <button onClick={buttononChargerClick} >Charger</button>
                <button id={viderTout.current?"Annuler":""} 
                    onClick={
                        ()=>{
                            viderTout.current = !viderTout.current;
                            setActif(!actif);
                            console.log("viderTout.current : "+viderTout.current);                            
                        }} >{viderTout.current?"Activer":"Annuler"}</button>
            </div>
        )
    }


    function ImageDisplay(){
        return(
            <>
                <div id="imageFrame">
                    {tabImages.map((imageName,index)=> {                                
                        return (
                            <div className='cadreImage' key={index} 
                                onMouseEnter={()=>steCacherBoutonSupprime(index)} 
                                onMouseLeave={()=>steCacherBoutonSupprime(-1)}>
                                
                                
                                <div className={`suppImage ${(cacherBoutonSupprime >= 0)?"":"cacher"}`} onClick={()=>setTabImages(tabImages.filter((nomImane,i) => nomImane !== imageName))}>X</div>                                   
                                <img className='secret' src={"images/"+imageName}/>                        
                            </div>
                        )
                        } 
                    )}                                
                </div>
            </>
        );
    }

    useEffect(()=>{
        console.log("Appel de useEffet");

        return()=>{
            //--- Destructeur ---
            console.log("Appel du destructeur");
        }
    },[]);

    
    return(         
        <>            
            {viderTout.current?console.log(<ImageDisplay/>):<ImageDisplay />}
            <InputTemplate /> 
            {console.log("Appel du render")}
        </>               

    );
}







