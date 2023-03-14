import React, {useState, useEffect, useRef} from 'react';

const productsJSON = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

let products = [...productsJSON];

  let categoryTab = [];
  let cat = "";
  products.forEach(element => {
    if((cat.search(element.category) === -1)&&(element.category != "")){
        categoryTab.push(element.category);        
        cat+=element.category;
    }
  });

  

  //{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"}
  function ProductRow(props){
    return(
        <div className='ProductRow'>
            <div className={(props.stocked===false) ? 'left stockEpuise' : 'left'}>{props.name}</div>
            <div className='right'>{props.price}</div>
        </div>
    );
 }

 function ProductCategoryRow(props){
    return(
        <div className='ProductCategoryRow'>{props.category}</div>
    );
 }

  function ProductTable(){

    return(
        <>
          <div className='headerRow'><ProductRow name="Name" price="Price"/></div>  
          {            
            categoryTab.map((category)=>{
                return(
                    <div key={category}>
                        <ProductCategoryRow category={category} />
                        {products.map((produit,index)=>{                             
                            if (produit.category == category) {
                                return(<div key={category+""+index}><ProductRow name={produit.name} price={produit.price} stocked={produit.stocked} /></div>)
                            }
                            else{return null}
                        })}
                    </div>
                ) ;
            }

            )
          }

        </>
    );
  }

function rechercheSansCasse(texte1="",motChercher1=""){
    let texte = texte1;  //"Engagez vous qu'ils disent, Rengagez vous qu'ils disent ";
    let motChercher = motChercher1; //'/engagez/i'; 
    texte = texte.toLocaleUpperCase();
    motChercher = motChercher.toLocaleUpperCase();
    return texte.includes(motChercher);

    //console.log(reg,reg.test(texte)?'Trouvé':'Non trouvé');
}


  export default function FilterableProductTable(){

    const [searchInput,setSearchInput] = useState("");
    const [checkbox,setCheckbox] = useState(false);

    function tableFilter(searchInput,checkbox){        
        products = [...productsJSON];
        if(checkbox){
            //--- Only products in stock -----
            products = [];
            productsJSON.forEach(element => {if(element.stocked === true){products.push(element);} });
        }
        let products_int = [...products];
        products = [];
        products_int.forEach(element => {
            if(rechercheSansCasse(element.category,searchInput)||rechercheSansCasse(element.name,searchInput)){            
                products.push(element);                
            } 
        });         
    }
    
    function handleOnChange(e){
        const target = e.target;
        if(target.type === "search"){setSearchInput(target.value);}
        if(target.type === "checkbox"){setCheckbox(target.checked);}             
    }
    
    return(
    <>
        <div id="SearchBarID">
            <input type="search" name="search" id="search" placeholder='Search...' value={searchInput}  onChange={handleOnChange}/>
            <div>
                <input type="checkbox" name="checkbox" id="checkbox" checked={checkbox} onChange={handleOnChange}/>
                <label htmlFor="checkbox">Only show products in stock</label>
            </div>                 
            <>{tableFilter(searchInput,checkbox)}</>               
        </div>
        <ProductTable />
    </>
    );
  }







