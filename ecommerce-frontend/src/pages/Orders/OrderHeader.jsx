import {formatMoney} from '../../utils/money'
import dayjs from 'dayjs';
import { Header } from '../../components/Header';
export function OrderHeader({Order,cart}){
    return (
      <>
      <Header cart={cart}/>
        <div className="order-header">
                            <div className="order-header-left-section">
                              <div className="order-date">
                                <div className="order-header-label">Order Placed:</div>
                                <div>{dayjs(Order.OrderTimeMs).format('MMMM D')} </div>
                              </div>
                              <div className="order-total">
                                <div className="order-header-label">Total:</div>
                                <div>{formatMoney(Order.totalCostCents)} </div>
                              </div>                                        
                            </div>
                
                            <div className="order-header-right-section">
                              <div className="order-header-label">Order ID:</div>
                             
                               <div>{Order.id} </div>
                            </div>
                          </div>
                          </>
    )
}