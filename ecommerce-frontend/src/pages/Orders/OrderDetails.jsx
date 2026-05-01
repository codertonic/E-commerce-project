import {OrdersAdd} from './OrdersAdd'
import axios from 'axios'

// import { useNavigate } from 'react-router';
export function OrderDetails({Order,loadCart}){
  
   
   
    return (
         <div className="order-details-grid">
                             {Order.products.map((OrdersProduct)=>{
                              const UpdateCartItem=async ()=>{
                              await   axios.post('https://ecommerce-project-backend-pkdr.onrender.com/api/cart-items',{
                               productId:OrdersProduct.product.id,
                               quantity:1                 });
                                 await loadCart();                                   
                              }
                              // console.log(OrdersProduct.product.id);
                               
                               return(
                           
                            <OrdersAdd OrdersProduct={OrdersProduct}
                            UpdateCartItem={UpdateCartItem}
                            loadCart={loadCart}
                            Order={Order}/>
                               );
                            })}
                             
                          </div>
    )
    
}
