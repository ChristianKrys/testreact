const AfficheTechno = (props) => {
    const {techno,handleDelete} = props;
    const initTechno = {
        name:'',
        category:'',
        description:''
    }   
    function deleteTechno(id){
        handleDelete(id);        
    }
        
    return ( 
        <div className="technology">
            <h3 id="tech-name">{techno.name}</h3>
            <p id="category">{techno.category}</p>
            <p id="description">{techno.description}</p>
            <button className="btn-delete" onClick={()=>{deleteTechno(techno.id)}}>Delete</button>
        </div>
     );
}
 
export default AfficheTechno;