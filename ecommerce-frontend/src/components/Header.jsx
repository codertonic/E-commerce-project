import './Header.css'
import {useState} from 'react'
import {Link } from "react-router-dom";
import {NavLink,useNavigate,useSearchParams } from 'react-router'

export function Header({cart=[]}){
  let totalQuantity =0; 
  // cart.forEach((cartItem) => {
  //   totalQuantity +=cartItem.quantity;
  // }); 
  if (Array.isArray(cart)) {
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
}
  const Navigation=useNavigate();
  // This UseState is used to Track the search
  const [inputVal,setinputVal]=useState("");
   //Get the Text
  const [searchParams]=useSearchParams();
  const searchText=searchParams.get('search');
  const [search,setSearch]=useState(searchText||' ');
  // this function is used to save What we type in Search Bar
  const TrackFun=(event)=>{
    const TrackInputVal=event.target.value;
    setinputVal(TrackInputVal);
   
  }
  const fun=()=>{
          console.log(inputVal);
          Navigation(`/?search=${inputVal}`)
  }
 
  
  return(
        <>
        <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search"
        value={inputVal}
         onChange={TrackFun}/>

        <button className="search-button" onClick={fun}>
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div  className="cart-quantity">{totalQuantity}</div>
          {/* <div className="cart-text">{totalQuantity}</div> */}
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
        </>
    )
}