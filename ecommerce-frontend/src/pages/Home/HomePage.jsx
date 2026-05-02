 import axios from 'axios'
import {useEffect, useState} from 'react'
import  {Header} from '../../components/Header'
// import {products } from '../../starting-ecommerce/data/products'
import {ProductGrid} from './ProductGrid'
import './HomePage.css'
import { useSearchParams } from 'react-router'

export function HomePage({cart, loadCart}){
  const [products,setProducts]=useState([]);
 const [SearchParams]=useSearchParams();
 const search=SearchParams.get('search')
  // In begin we use products data in js so we fetch the data from api(BE) that's why we use that !
  useEffect(()=>{
        const getHomeData = async ()=>{
         const response= await   axios.get('https://ecommerce-project-backend-pkdr.onrender.com/api/products')
         // don't forget to uncomt this line 
         const urlpath=search
         ? `https://ecommerce-project-backend-pkdr.onrender.com/api/products?search=${search}`
         :`https://ecommerce-project-backend-pkdr.onrender.com/api/products`;
          const Res=await axios.get(urlpath);
         
        setProducts(response.data)
        setProducts(Res.data);
        }
       
    getHomeData()
          
  },[search])
  // for the Cart-item 
  
        
    
  return(
        <>
        <title>E-commerce Project</title>
      
          <Header cart={cart}/>
          {/* <Header/> */}
    <div className="home-page">
      {/* <div className="products-grid">
      {products.map((product)=>{
        return (
          <div key={product.id} className="product-container">
          <div className="product-image-container">
            <img className="product-image"
              src={product.image} />
          </div>

          <div className="product-name limit-text-to-2-lines">
            {product.name}
          </div>

          <div className="product-rating-container">
            <img className="product-rating-stars"
              src={`images/ratings/rating-${product.rating.stars*10}.png`} />
            <div className="product-rating-count link-primary">
              {product.rating.count}
            </div>
          </div>

          <div className="product-price">
           {formatMoney(product.priceCents)}
          </div>

          <div className="product-quantity-container">
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="product-spacer"></div>

          <div className="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button className="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
        )
      })} 
        
      </div> */}
      <ProductGrid products={products} loadCart={loadCart} />
    </div> </> 
    ) 
}