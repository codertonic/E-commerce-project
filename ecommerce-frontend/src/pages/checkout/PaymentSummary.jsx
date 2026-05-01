import {formatMoney} from '../../utils/money';
import axios from 'axios'
import { useNavigate } from 'react-router';
export function PaymentSummary({PaymentSummery,loadCart}){
  const Navigation=useNavigate();
  const UpdateToOrder=async()=>{
          await axios.post('https://ecommerce-project-backend-pkdr.onrender.com/api/orders');
          await loadCart();
          Navigation('/orders')
  }
    return (
        <div className="payment-summary">
                    <div className="payment-summary-title">
                      Payment Summary
                    </div>
                   {PaymentSummery && (
                     <>
                     <div className="payment-summary-row" >
                      <div data-testid="Amt">Items ({PaymentSummery.totalItems}):</div>
                      <div className="payment-summary-money" data-testid="payAmt">{formatMoney(PaymentSummery.productCostCents)}</div>
                    </div>
        
                    <div className="payment-summary-row">
                      <div>Shipping &amp; handling:</div>
                      <div className="payment-summary-money" data-testid="shopAmt">
                        {formatMoney(PaymentSummery.shippingCostCents)}  
                        </div>
                    </div>
        
                    <div className="payment-summary-row subtotal-row" >
                      <div>Total before tax:</div>
                      <div className="payment-summary-money" data-testid="BtaxAmt">{formatMoney(PaymentSummery.totalCostBeforeTaxCents)}  </div>
                    </div>
        
                    <div className="payment-summary-row">
                      <div>Estimated tax (10%):</div>
                      <div className="payment-summary-money">{formatMoney(PaymentSummery.taxCents)} </div>
                    </div>
        
                    <div className="payment-summary-row total-row">
                      <div>Order total:</div>
                      <div className="payment-summary-money">{formatMoney(PaymentSummery.totalCostCents)} </div>
                    </div>
        
                    <button className="place-order-button button-primary" onClick={UpdateToOrder} data-testid="Order-btn">
                      Place your order
                    </button>
                     </>
                   )}
                    
                </div>
    )
}