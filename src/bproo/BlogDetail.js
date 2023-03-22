import { useParams } from "react-router-dom";
import useRecuperation from "./useRecuperation";
import {useNavigate} from 'react-router-dom';

const BlogDetail = () => {
    const {id} = useParams();  
    const navigate = useNavigate();

    const url = 'http://localhost:8000/blogs/'+id;       
    const {datas:blog,isLoading,error} = useRecuperation(url);      
    
    const handleDelete = (id)=>{        
        const url_delete = 'http://localhost:8000/blogs/'+id;
        fetch(url_delete,{method: 'DELETE'})
            .then((response)=>{
                console.log('Suppression reussie','response.status : '+response.status,'response.ok : '+response.ok);
                if(!response.ok){
                    throw Error('Echec de suppression');
                }

                navigate('/');
            })
            .catch((err)=>{
                console.log(err.message);
            })
    }
    
    return ( 
        <div className="">                        
            {isLoading && <h2>Chargement en cours ... </h2>}
            {error && <h2 style={{color:'red'}}>{error}</h2>}
            {blog && (
                <div className="blog">
                    <h2 className="blog-title">{blog.title}</h2>
                    <small className="blog-description-date">{"Publié le : "+blog.date}</small>
                    <p className="blog-body">{blog.body}</p>
                    <p className="blog-author">{"Publié par : "+blog.author}</p>
                    <div className="btn-delete" onClick={()=>handleDelete(blog.id)}>Supprimer</div>
                </div>
            )}
        </div>
     );
}
 
export default BlogDetail;


