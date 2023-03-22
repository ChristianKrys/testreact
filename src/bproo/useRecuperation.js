import {useState,useEffect} from 'react';

const useRecuperation = (url) => {
    const [datas,setDatas] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        const abortCtrl = new AbortController(); //---- pour permettre l'arrêt d'une requête en cours ------- 

        //fetch('http://localhost:8000/blogs')
        fetch(url,{signal:abortCtrl.signal})
            .then((reponse)=>{
                if(!reponse.ok){
                    throw Error('Désolé, une erreur est survenue');
                }                
                return reponse.json();
            })
            .then((data)=>{
                setTimeout(()=>{
                    //--- Simulation de l'attente du serveur -----
                    setIsLoading(false);
                    setDatas(data); 
                },1000)                              
            })
            .catch((err)=>{
                if(err.name === "AbortError"){
                    //console.log(err.message);
                }else{
                    setError(err.message); 
                    setIsLoading(false); 
                }              
            })
            return ()=>abortCtrl.abort(); //------ finalisation de l'arrêt de la requête ----------
    }, [url]);

    return {datas,isLoading,error}

}
 
export default useRecuperation;