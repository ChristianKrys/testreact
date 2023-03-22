
import Apps from "./apps";
import Navbar from "./navbar";
import DisplayPic from "./displayPic";
import FilterableProductTable from "./produit";
import Correction from './correction';
import Apli, {TodoList,PostTable} from './test';

let titre = "Ndjomba secret";
let salut = "les Ndjombayeuses nouveau !"

const template = (
  <>
      <header>
        <Navbar />
      </header>
      <main>  
        <Apli/> 
        <div className="ecartement"></div>
        <PostTable/>
        <div className="ecartement"></div>
        <TodoList/>        
        <div className="ecartement"></div>     
        <Correction />
        <div className="ecartement"></div>
        <FilterableProductTable/>
        <div id="bienvenue">
          <Apps mon_titre={titre} salutation={salut}/>          
          <img src="./images/logo-secret.png" alt="" id="logo_secret"/>
        </div>
        <DisplayPic />     
      </main>
  </>
);


const App = () => {
    return ( 
        <>{template}</>
     );
}
 
export default App;
