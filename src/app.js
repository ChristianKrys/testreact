
import React from "react"; /*Pour pouvoir utiliser les composants de classes*/
import "./css/style.css";

/* function App(props){
    return <h1 className="heading">Hello world !<br/>{props.mon_titre}</h1>;
} 
 */

class App extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {etat1:"",etat2:""}        
    }



    render(){        
        return <h1 className="heading">
                    Hello world !<br/>
                    {this.props.mon_titre}<br/>
                    {this.props.salutation}
                </h1>;
    }
}

export default App;


