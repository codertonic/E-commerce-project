
import axios from 'axios'
import {useState,useEffect,Fragment} from 'react'
import {OrderContain} from './OrderContain'

import './orders.css'


export function OrderItem({cart}){
  const [Orders,setOrder]=useState([]);
  useEffect(()=>{
    const fetchOrderdata=async ()=>{
         const response=await axios.get('/api/orders?expand=products')
            setOrder(response.data)
    }
         fetchOrderdata();
          
  },[])

    return(
        <>
        <title>Orders</title>
       
         <div className="header">
      <div className="left-section">
        <a href="/" className="header-link">
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

    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      {/* <div className="orders-grid">
        {Orders.map((Order)=>{
          return (
               <div key={Order.id} className="order-container">

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

          <div className="order-details-grid">
            {Order.products.map((OrdersProduct)=>{
               return(
                <Fragment key={OrdersProduct.product.id}>
                  <div className="product-image-container">
              <img src={OrdersProduct.product.image} />
            </div>
             

            <div className="product-details">
              <div className="product-name">
                {OrdersProduct.product.name}
              </div>
              <div className="product-delivery-date">
              Arriving on:  {dayjs(OrdersProduct.estimatedDeliveryTimeMs).format('dddd,MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {OrdersProduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <a href="/tracking">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

            
                </Fragment>
               );
            })}
             
          </div>
        </div>    
           );
        })} 
         
      </div> */}
      <OrderContain Orders={Orders} cart={cart}/>
    </div>
         </>
    );
}