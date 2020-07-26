import React from 'react';
import './App.css';
import Products from './components/Products';
import Product from './components/Product';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Cart from './components/Cart';
import Cookie from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
// import Icon from '@ant-design/icons';
import {Badge} from 'antd'
import NotificationBadge from 'react-notification-badge';

function App() {


  //count of product in cart
  const cart = useSelector(state => state.cart);
  
  let numOfProduct = 0;
  cart.cartItems.map(item => 
    numOfProduct = numOfProduct + parseInt(item.qty)
  )
  
 
  return (
   
    <BrowserRouter>
    <div className="App">
        <div className="grid-container">
          <header className="header">
          <Link to="/" className="link">Shopping Cart</Link>

          <div className="header-links">

           {/* notification ===> number of products in cart */}
            <div class="notifi">
            <NotificationBadge count={numOfProduct} />
            </div>

            <Link to={'/cart/'+ ''}><FaShoppingCart/>
            </Link>

         

            </div>
          </header>
          <main className="main">
            <div className="content">
              <Route exact path="/" component={Products}/>
              <Route path="/product/:id" component={Product} />
              <Route path="/cart/:id?" component={Cart}/>
            </div>
          </main>
        </div>
  
    </div>

    </BrowserRouter>

  );
}


export default App;
