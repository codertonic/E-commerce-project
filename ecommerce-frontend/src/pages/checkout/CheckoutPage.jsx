import {CheckoutHeader} from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import {PaymentSummary} from './PaymentSummary';

import {useState,useEffect} from 'react'
import axios from 'axios'
import './CheckoutHeader.css'
import './checkout.css'


export function CheckoutPage({cart,loadCart }){
  const [deliveryOptions,setDeliveryOptions]=useState([]);
  const [PaymentSummery,setPayment]=useState(null);
  
  // delivery Options Api & Payment Api
  useEffect(()=>{
       const fetchCheckOut=async ()=>{
             let response=await axios.get('https://ecommerce-project-backend-pkdr.onrender.com/api/delivery-options?expand=estimatedDeliveryTime')
    
        setDeliveryOptions(response.data);}
 fetchCheckOut();
  },[]);

  useEffect(()=>{
      const fetchPayment=async ()=>{
            let  response=await   axios.get('https://ecommerce-project-backend-pkdr.onrender.com/api/payment-summary')
    
      setPayment(response.data);
  
       
      
       
      } 
    
    fetchPayment();
  },[cart])

  
  
 
    return (
        <>
           <title>Checkout</title>
        
          < CheckoutHeader/>
    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        
        <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
        

        {/* <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>
           {PaymentSummery && (
             <>
             <div className="payment-summary-row">
              <div>Items ({PaymentSummery.totalItems}):</div>
              <div className="payment-summary-money">{formatMoney(PaymentSummery.productCostCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">
                {formatMoney(PaymentSummery.shippingCostCents)}  
                </div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{formatMoney(PaymentSummery.totalCostBeforeTaxCents)}  </div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatMoney(PaymentSummery.taxCents)} </div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{formatMoney(PaymentSummery.totalCostCents)} </div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
             </>
           )}
            
        </div> */}
        <PaymentSummary  PaymentSummery={PaymentSummery} loadCart={loadCart}/>
        
      </div>
    </div>
        </>
    )
}