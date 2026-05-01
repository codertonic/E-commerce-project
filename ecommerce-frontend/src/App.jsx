import { Routes,Route } from 'react-router'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { Header } from './components/Header'
import {HomePage} from './pages/Home/HomePage'
import {CheckoutPage} from './pages/checkout/CheckoutPage'
import {OrderItem} from './pages/Orders/OrderItem'
import {TrackItem} from './pages/TrackItem'


// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

 
 
function App() {
  const [cart,setCart]=useState([]);
  // const [count, setCount] = useState(0)
  const loadCart=async ()=>{
         const response =await axios.get('https://ecommerce-project-backend-pkdr.onrender.com/api/cart-items?expand=product')
             setCart(response.data)  ;
    } ; 
  useEffect(() =>{    
   loadCart();            
  },[])
   
  return (
    <>
    <Header cart={cart} loadCart={loadCart}/>
    <Routes>
       
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />} />
      
      <Route path="checkout" element={ <CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrderItem cart={cart} loadCart={loadCart}/>}/>
      <Route path="/tracking/:orderId/:productId" element={<TrackItem cart={cart}  />}></Route>
      
      
      
    </Routes>
    
    </>
    
    
    
  )
}

export default App
