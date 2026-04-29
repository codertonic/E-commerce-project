import {OrderDetails} from './OrderDetails';
import { OrderHeader } from './OrderHeader';


export function OrderContain({Orders,cart}){
    return (
         <div className="orders-grid">
                {Orders.map((Order)=>{
                  return (
                       <div key={Order.id} className="order-container">
        
                 {/* this components for OrderHeader */}
                 <OrderHeader Order={Order} cart={cart}/>         
                  
                  <OrderDetails Order={Order}  />
                </div>    
                   );
                })} 
                 
              </div>
    )
}