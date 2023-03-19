import React, {useState,useEffect,useRef} from 'react';

function useIncrement(initial=0,pas=1){
    const [count,setCount] = useState(initial);
    const increment = function (){setCount(c => c + pas)}

    return [count,increment];
}


function useAutoIncrement(init,step){
    let timer;

    const [count,setCount] = useState(init);
    const increment = function (){
        setCount(v=>v+step);
        console.log('Appel increment');    
    }    

    useEffect(()=>{
        console.log('Appel du constructeur');
                
        timer = setInterval(increment,1000);       

        return function (){
            clearInterval(timer);
            console.log('Appel du destructeur');
        }
    },[]);

    return [count,increment];
}

function Compteur(){
    const [count,increment] = useAutoIncrement(0,1);

    return <button onClick={increment}>Incrémenter {count}</button>
}

function useToggle(initValue=true){
    const [value,setValue] = useState(initValue);
    const toggle = function (){setValue(v=>!v)}

    return [value,toggle];
}

//const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10');
//const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

function useFetch(url){    
    const [todos,setTodos] = useState([]);
    const [loading,setLoading] = useState(true);

    function extract(){
        (async function (){            
            const response = await fetch(url);
            const responseData = await response.json()
            if(response.ok){
                setTodos(responseData);
            }else{
                alert(JSON.stringify(responseData));
            }
            setLoading(false)
        })()
    }

    function setTodosList(t){
        setTodos(t);
        setLoading(false);
    }
    
    useEffect(extract,[]);

    return [todos,loading,setTodosList];
}

export function PostTable(){
    const [todos,loading,setTodosList] = useFetch('https://jsonplaceholder.typicode.com/comments?_limit=10');        
    if(loading){return 'Chargement en cours...'}
    return <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Contenu</th>
            </tr>
        </thead>
        <tbody>
            {todos.map(t => <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.body}</td>
            </tr>)}
        </tbody>
    </table>
}

export function TodoList(){ 
    const [todos,loading,setTodosList] = useFetch('https://jsonplaceholder.typicode.com/todos?_limit=10');    

    if(loading){return 'Chargement en cours...'}

    return <ul>
        {todos.map(t => <li key={t.id}>{t.title}</li>)}
    </ul>
}

export default function Apli(){

    const [compteurVivible,toggleCompteur] = useToggle(true);

    return <div>        
        Afficher le Compteur
        <input type="checkbox" onChange={toggleCompteur} checked={compteurVivible}  />
        <br/>
        {compteurVivible && <Compteur />}        
    </div>
}




