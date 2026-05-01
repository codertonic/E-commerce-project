import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import {useState} from 'react'
import {DeliveryOption} from './DeliveryOption'
import axios from 'axios'
//this useState & Method is used to Update the value
export function UpdateData({cartItem,DeleteItem,selectedDeliverydate,loadCart,deliveryOptions}){
     const[Track,setQuantity]=useState(false);
      const HideInput=()=>{
         if(Track){
           setQuantity(false);
         }else{
           setQuantity(true);
         }
       }                                       
                //This useState is used to track the input and update the quantity
       const [NumQuantity,AddQuantity]=useState(cartItem.quantity);
       const TrackQuantity=(event)=>{
        const trackqunatity=Number(event.target.value)
        AddQuantity(trackqunatity);
       }
       const UpdateQuantity= async()=>{
          if(Track){
         await   axios.put(`https://ecommerce-project-backend-pkdr.onrender.com/api/cart-items/${cartItem.product.id}`,
              { quantity:Number(NumQuantity)
  } );
  await loadCart();
      setQuantity(false);
          }
          else{
            setQuantity(true);
          }
       }
       // Write the UseState to Change Update text into Save 
       const [change,UpdateChange]=useState(false);
       const FunUpdate=()=>{
        if(change){
            UpdateChange(false);
        }else{
            UpdateChange(true);
        }
       }

          
    return (
        <div key={cartItem.productId} className="cart-item-container">
                            <div className="delivery-date">
                              Delivery date: {dayjs(selectedDeliverydate.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>                                           
                
                            <div className="cart-item-details-grid">
                              <img className="product-image"
                                src={cartItem.product.image} />
                
                              <div className="cart-item-details">
                                <div className="product-name">
                                  {cartItem.product.name}
                                </div>
                                <div className="product-price">
                                 {formatMoney(cartItem.product.priceCents)}
                                </div>
                              
                                <div className="product-quantity">
                                  <span>
                                    Quantity:{Track?  (<input type="Number" className="InputBox" 
                                    value={NumQuantity}
                                    onChange={TrackQuantity}/>)
                                    :(<span className="quantity-label">{cartItem.quantity}</span>)} 
                                  </span>
                                  <span className="update-quantity-link link-primary" 
                                  onClick={()=>{
                                     UpdateQuantity();
                                     FunUpdate()
                                  }}
                                  >
                                   {change?"Save":"Update"}                                                     
                                  </span>
                                  <span className="delete-quantity-link link-primary" onClick={DeleteItem}>
                                    Delete
                                  </span>
                                </div>
                              </div>
                      
                              
                              <DeliveryOption cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
                            </div>
                          </div>
    )
}