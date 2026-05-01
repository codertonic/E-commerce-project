import {useState}from 'react';
import { formatMoney } from '../../utils/money';
import axios from 'axios';
export function Product({product,loadCart}){
     const [quantity,setQuantity]=useState(1);
     // This State is used to Show the Added popup;
     const [Check,UpdateCheck]=useState(false );
     // this function is used to show that popup
     const ShowPop=()=>{
      UpdateCheck(true);
      setTimeout(()=>{
        UpdateCheck(false);
      },2000);
     }
      const UpdateState=(event) => {
                  const Selectquantity = Number(event.target.value);
                  setQuantity(Selectquantity);
                  
                }
      const AddQuantity=async () => {
                await axios.post('https://ecommerce-project-backend-pkdr.onrender.com/api/cart-items', {
                  productId: product.id,
                  quantity:quantity
                })
                await loadCart()
              }
     
     return (
       <div  className="product-container" data-testid="product-container">
                    <div className="product-image-container">
                      <img className="product-image"
                      data-testid="product-Image"
                        src={product.image} />
                    </div>
          
                    <div className="product-name limit-text-to-2-lines">
                      {product.name}
                    </div>
          
                    <div className="product-rating-container">
                      <img className="product-rating-stars" data-testid="rating-test"
                        src={`images/ratings/rating-${product.rating.stars*10}.png`} />
                      <div className="product-rating-count link-primary">
                        {product.rating.count}
                      </div>
                    </div>
          
                    <div className="product-price">
                     {formatMoney(product.priceCents)}
                    </div>
         

            <div className="product-quantity-container" >
              <select data-testid="productCon"
                value={quantity}
                onChange={UpdateState}>
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

            <div className="added-to-cart" style={{opacity:Check?1:0}}>
              <img src="images/icons/checkmark.png" />
              Added
            </div>

            <button
              className="add-to-cart-button button-primary" data-testid="check-click" 
               onClick={()=>{
                     AddQuantity();
                     ShowPop();
              }}>
              Add to Cart
            </button>
          </div>
     )
}