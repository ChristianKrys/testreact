
import React from "react"; /*Pour pouvoir utiliser les composants de classes*/
//import "./css/style.css";

/* function App(props){
    return <h1 className="heading">Hello world !<br/>{props.mon_titre}</h1>;
} 
 */

class Apps extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {etat1:"",etat2:""} ;
        document.title = this.props.mon_titre;
    }



    render(){        
        return <h1 className="heading">Hello, {this.props.salutation}</h1>;
    }
}

export default Apps;


