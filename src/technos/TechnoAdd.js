import { useState } from "react";

const TechnoAdd = (props) => {
    const initTechno = {
        id:'',
        name:'',
        category:'',
        description:''
    }
    const {handleAddTechno} = props;
    const [newTechno,setNewTechno] = useState(initTechno)

/*     const techno = {
        name:'React',
        category:'front',
        description:'learn react'
    } */

    function handleSubmit(evt){
        evt.preventDefault();
        handleAddTechno(newTechno);        
    }

    function handleOnChange(e){
        const target = e.target;        
        setNewTechno({...newTechno,id:newTechno.name,[target.name]:target.value});
    }

    return ( 
        <div className="techno-add">
            <h2>Add a techno</h2>
            <form onSubmit={(evt)=>handleSubmit(evt)}>
                <label htmlFor="techno-name">Name :</label><br/>
                <input type="text" name="name" id="techno-name" value={newTechno.name} onChange={(e)=>(handleOnChange(e))}/><br/>
                <label htmlFor="techno-category">Select a category :</label><br/>
                <select name="category" id="techno-category" value={newTechno.category} onChange={(e)=>(handleOnChange(e))}>
                    <option value=""></option>
                    <option value="front">Front</option>
                    <option value="back">Back</option>
                    <option value="fullstack">Full Stack</option>
                    <option value="other">Other</option>                    
                </select><br/>
                <label htmlFor="techno-description">Description :</label><br/>
                <textarea cols="30" rows="5" name="description" id="techno-description" value={newTechno.description} onChange={(e)=>(handleOnChange(e))}/><br/>
                <input type="submit" value="Add Techno" />
            </form>
        </div>
     );
}

export default TechnoAdd;