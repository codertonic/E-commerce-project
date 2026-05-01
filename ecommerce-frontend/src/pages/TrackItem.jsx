import './tracking.css'
import dayjs from 'dayjs'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import {Header} from  '../components/Header'


export function TrackItem({cart}){
   const {orderId, productId }=useParams();
  //  console.log(productId);
   const [order, setTrack]=useState(null);
  useEffect(()=>{
         const fetchTrack=async ()=>{
             const response=await axios.get(`https://ecommerce-project-backend-pkdr.onrender.com/api/orders/${orderId}?expand=products`);
                      //  console.log(response.data);
                     setTrack(response.data);
         }
         fetchTrack();
  },[orderId])
  if(!order){
    return null;
  }
  
 const OrderProduct=order.products.find((OrderProduct)=>{
     
    //  console.log(OrderProduct.productId);
    return OrderProduct.productId===productId;
 })

 const totalDeliverytime=OrderProduct.estimatedDeliveryTimeMs-order.orderTimeMs;
 const timePassed=dayjs().valueOf()-order.orderTimeMs;
 let result=(timePassed/totalDeliverytime)*100;
//  console.log(result);
 if(result >100){
  result=100;
 }
 // check our delivery status;
 const isPreparing= result <33;
 const isShipped=result>=33 && result  < 100 ;
const  isDelivered=result==100;


  
    return(
        <>
         
        <title>Tracking</title>
       
        <div className="header">
      <div className="left-section">
        <a href="/.html" className="header-link">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </a>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <a className="orders-link header-link" href="/orders">

          <span className="orders-text">Orders</span>
        </a>

        <a className="cart-link header-link" href="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">3</div>
          <div className="cart-text">Cart</div>
        </a>
      </div>
    </div>
 <Header cart={cart} />
    <div className="tracking-page">
      <div className="order-tracking">
        <a className="back-to-orders-link link-primary" href="/orders">
          View all orders
        </a>

        <div className="delivery-date">
          {result>=100 ? "Delivered:":"Arriving On:"}
        {dayjs(OrderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
           
           {/* {dayjs(OrderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')} */}
        </div>

        <div className="product-info">
          {/* Black and Gray Athletic Cotton Socks - 6 Pairs */}
          {OrderProduct.product.name};
        </div>

        <div className="product-info">
          {/* Quantity: 1 */}
          {OrderProduct.product.quantity}
        </div>

        <img className="product-image" src={OrderProduct.product.image} />

        <div className="progress-labels-container">
          <div className={`progress-label ${isPreparing && 'current-status'}`}>
            Preparing
          </div>
          <div className={`progress-label ${isShipped && 'current-status'}`}>
            Shipped
          </div>
          <div className={`progress-label ${isDelivered && 'current-status'}`}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{width:`${result}%`}}></div>
        </div>
      </div>
    </div>
        </>
    )
} 