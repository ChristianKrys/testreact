import Bloglist from './Bloglist';
import useRecuperation from './useRecuperation';


//window.localStorage.setItem("myTodos",JSON.stringify(myTodos)); 
const Home = () => {
    
    const url = 'http://localhost:8000/blogs?_sort=id&_order=desc';
    const {datas:blogs,isLoading,error} = useRecuperation(url);

    return ( 
        <div className="home">                       
            {isLoading && <h2>Chargement en cours ... </h2>}
            {error && <h2 style={{color:'red'}}>{error}</h2>}
            {blogs && <Bloglist blogs={blogs} title={"Liste des blogs"}/>}
        </div>
     );
}
 
export default Home;