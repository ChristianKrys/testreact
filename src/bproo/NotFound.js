import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();


    return ( 
        <div className="blog-404">
            <h2>Oooooooooops ....</h2>
            <p style={{color:'red',fontWeight:'bold',marginTop:'50px',marginBottom:'50px'}}>Cette page n'existe pas</p>
            <div className="btn-retour" onClick={()=>{navigate(-1)}}>Retour</div>
            <div className="btn-retour" onClick={()=>{navigate('/')}}>Accueil</div>
        </div>
     );
}
 
export default NotFound;
