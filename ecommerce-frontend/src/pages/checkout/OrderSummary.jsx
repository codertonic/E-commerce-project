
import axios from 'axios'
import {UpdateData} from './UpdateData';
export function OrderSummary ({cart,deliveryOptions,loadCart}){
 
 
    return (
        <div className="order-summary">
        
                  {deliveryOptions.length>0 && cart.map((cartItem)=>{
                    const selectedDeliverydate=deliveryOptions
                    .find((deliveryOption)=>{
                      return deliveryOption.id===cartItem.deliveryOptionId;
                    })  
                    const DeleteItem=async  ()=>{
                        await axios.delete(`./api/cart-items/${cartItem.productId}`)
                        await loadCart();
                    } 
                    
                     
                    return(
                  //     <div key={cartItem.productId} className="cart-item-container">
                  //   <div className="delivery-date">
                  //     Delivery date: {dayjs(selectedDeliverydate.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                  //   </div>                                           
        
                  //   <div className="cart-item-details-grid">
                  //     <img className="product-image"
                  //       src={cartItem.product.image} />
        
                  //     <div className="cart-item-details">
                  //       <div className="product-name">
                  //         {cartItem.product.name}
                  //       </div>
                  //       <div className="product-price">
                  //        {formatMoney(cartItem.product.priceCents)}
                  //       </div>
                      
                  //       <div className="product-quantity">
                  //         <span>
                  //           Quantity:{Track?  <input type="number" className="InputBox"/>
                  //           :<span className="quantity-label">{cartItem.quantity}</span>} 
                  //         </span>
                  //         <span className="update-quantity-link link-primary" onClick={HideInput}>
                  //           Update                                                         
                  //         </span>
                  //         <span className="delete-quantity-link link-primary" onClick={DeleteItem}>
                  //           Delete
                  //         </span>
                  //       </div>
                  //     </div>
              
                      
                  //     <DeliveryOption cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
                  //   </div>
                  // </div>
                  <UpdateData cartItem={cartItem}
                  DeleteItem={DeleteItem}
                  selectedDeliverydate={selectedDeliverydate}
                  loadCart={loadCart}
                  deliveryOptions={deliveryOptions}/>
                    )
                  })}
                  
                </div>
    )
}