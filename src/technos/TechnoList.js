import AfficheTechno from './AfficheTechno';

const TechnoList = (props) => {
    const {technos,handleDelete} = props;

    return ( 
        <>            
            <div className="techno-list">    
                <h2>All Technos</h2> 
                <div className='techno-element' >
                {
                    technos.map((techno,index)=>{
                        return (<AfficheTechno key={techno.name+""+index} techno={techno} handleDelete={handleDelete}/>);
                    })
                }
                </div>                       
            </div>
        </>
     );
}
 
export default TechnoList;