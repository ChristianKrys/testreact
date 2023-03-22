import React, {useState, useEffect, useRef} from 'react';

const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function ProductRow_({product}){
    const name = product.stocked ? product.name : <span style={{color:'red'}}>{product.name}</span>
    console.log('render row')
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
}

const ProductRow = React.memo(ProductRow_);

function ProductCategoryRow({category}){
    return <tr>
        <th colSpan={2}>{category}</th>
    </tr>
}

function ProductTable({products,filterText,inStockOnly}){
    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
        if((inStockOnly && !product.stocked)||(product.name.indexOf(filterText)===-1)){return}
        
        if(product.category !== lastCategory){
            lastCategory = product.category;
            rows.push(<ProductCategoryRow key={lastCategory} category={lastCategory}/>)
        }
        rows.push(<ProductRow key={product.name} product={product}/>)
    });
    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
}

function SearchBar(props){   
    const {filterText,inStockOnly} = props;
    function handlefilterTextChange(e){
        props.onFilterTextChange(e.target.value)
    }
    function handlesetInStockOnlyChange(e){
        props.onStockChange(e.target.checked)
    }

    return <div>
        <div><input type="text" value={filterText} placeholder='Recherche...' onChange={handlefilterTextChange}/></div>
        <div>
            <input type="checkbox" checked={inStockOnly} id="stock" onChange={handlesetInStockOnlyChange}/>
            <label htmlFor="stock">Produit en stock seulement</label>
        </div>
    </div>
}

function FilterTableProduct({products}){
    const [filterText,setFilterText] = useState('');
    const [inStockOnly,setInStockOnly] = useState(false);
    
    function handlefilterTextChange(filterText){setFilterText(filterText)}
    function handlesetInStockOnlyChange(inStockOnly){setInStockOnly(inStockOnly)}

    //const {products} = props;
    return <>        
        <SearchBar 
            filterText={filterText} inStockOnly={inStockOnly}
            onFilterTextChange={handlefilterTextChange}
            onStockChange={handlesetInStockOnlyChange}
        />
        <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}/>
    </>;
}



export default function Correction(){
    return <FilterTableProduct products={PRODUCTS} />
}



