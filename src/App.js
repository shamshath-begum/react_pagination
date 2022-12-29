import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {
  let [products,setProducts]=useState([]);
  let[page,setPage]=useState(1);
  let prodApi=async()=>{
    try{
      let products=await axios.get("https://dummyjson.com/products?limit=100");
      console.log(products.data.products[0].thumbnail)
      if(products && products){
setProducts(products.data.products);
}
    }catch(error){
      console.log(error);
    }
  }
useEffect(()=>{
prodApi()
},[])

let selectPageHandler=(selectedPage)=>{
  if(
    selectedPage>=1 &&
    selectedPage<=products.length/10 &&
    selectedPage!==page
  )
  setPage(selectedPage)
};
  return <>
{
  products.length>0&& <div className='products'>
{
  products.slice(page*10-10,page*10).map((product)=>{
    return <span className='product__single' key={product.id}>
          <img src={product.thumbnail} alt={product.title}/>
          <span>{product.title}</span>
          </span>
  })}
  </div>
}
{
  products.length>0 && <div className='pagination' >
    <span
    className={page>1 ? "":"pagination__disable"}
     onClick={()=>selectPageHandler(page-1)}
    
    >«</span>
    {
      [...Array(products.length/10)].map((_,i)=>{
return <span 
className={page===i+1?"pagination__selected":""}
onClick={()=>selectPageHandler(i+1)} key={i}
        >{i+1}</span>
      })
    }
    <span onClick={()=>selectPageHandler(page+1)}
    className={page<products.length/10? "":"pagination__disable"}
    >»</span>
  </div>
}
  </>
    
}

export default App;
