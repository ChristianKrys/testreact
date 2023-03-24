import { useEffect, useState } from "react";

const ImageUpload = () => {
    const [urlPicture,setUrlPicture] = useState();
    let objUrl = null;

    useEffect(() => {

        //--- Destructeur : liberer la mémoir lors de la destruction de l'objet -----------
        return ()=> (objUrl !== null && objUrl !== undefined) ? URL.revokeObjectURL(objUrl):null;
    }, []);

    const _previewPicture = (e)=>{   
        //------ Selection du premier fichier e.target.files[0], vue que multiple={false} dans <input> -----
        if(e.target.files && e.target.files.length !== 0 && e.target.files !== undefined ){
            objUrl = URL.createObjectURL(e.target.files[0]);                      
            //setUrlPicture(objUrl);
        }  
        setUrlPicture(URL.createObjectURL(e.target.files[0]));                
    }

    return ( 
        <div className="userIdentityPhoto">                                                                                      
            <input id="urlPhoto" onChange={(e)=>{_previewPicture(e)}} type="file" accept="image/*" multiple={false} name="urlPhoto" hidden/>
            <label htmlFor="urlPhoto">
                {true && <div className="cadrePhoto"><img src={urlPicture} alt="user photo" /></div>} 
                <div className="messagePhoto">Charger votre photo ggggg</div>
            </label>
        </div>
     );
}
 
export default ImageUpload;