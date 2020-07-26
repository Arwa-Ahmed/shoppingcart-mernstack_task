import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';


function Cart(props) {

    //get cart items

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;
    // console.log(cartItems);

    const productId = props.match.params.id;
    // console.log(productId);

    // get quantity from url
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    // console.log(qty)
    const dispatch = useDispatch();

    //remove item from cart
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, []);

    
   
    //quantity decrement
    const decrement = (product_id) => {

        var qtyvalue = document.querySelector('#qty_' + product_id).value;
        if (qtyvalue > 1) {
            document.querySelector('#qty_' + product_id).value = qtyvalue - 1;
            var newvalue = parseInt(document.querySelector('#qty_' + product_id).value);
            dispatch(addToCart(product_id, newvalue))
          
        }
    }
    //quantity incerement
    const incerement = (product_id, countInStock) => {
        var qtyvalue = document.querySelector('#qty_' + product_id).value;
        if (qtyvalue < countInStock) {
            document.querySelector('#qty_' + product_id).value = parseInt(qtyvalue) + 1;
            var newvalue = parseInt(document.querySelector('#qty_' + product_id).value);
            dispatch(addToCart(product_id, newvalue));

        }
    }

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shopping Cart
                    </h3>
                </li>
                {/* if cart is empty */}
                {cartItems.length === 0 ?
                    <div>
                        Cart is empty
                    </div>
                    //   cart have items
                    : cartItems.map(item =>
                        <li key={item.product}>
                            <div className="cart-image">
                                <img src={`/images/${item.image}`} alt="product" />
                            </div>
                            <div className="cart-name">
                                
                                <div>
                                    <Link to={"/product/" + item.product}>
                                        {item.name}
                                    </Link>

                                </div>
                            </div>
                        
                            <div className="item-qty" >
                                <input type='button' value='-' className='qtyminus btn-piont' id={"qtyminus_" + item.product} field='quantity' onClick={() => decrement(item.product)} />
                                <input type='text' readOnly="readonly" name='quantity' className='qty' id={"qty_" + item.product} min="0" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, parseInt(e.target.value)))} />
                                <input type='button' value='+' className='qtyplus btn-piont' field='quantity' id={"qtyplus_" + item.product} onClick={() => incerement(item.product, item.countInStock)} />
                            </div>

                            <div className="cart-price">
                                ${item.price}
                            </div>
                            <div className="item-remove">
                                <a  className="btn-piont" onClick={() => removeFromCartHandler(item.product)} >
                                    &#10006; </a>
                            </div>
                        </li>

                    )
                }

                <li>
                    <div className="cart-action">
                        <h3>
                            Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                             :
                            $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                        </h3>
                        <button onClick={addToCart} className="button primary">
                      Checkout
                    </button>
                    </div>

                </li>

            </ul>

        </div>

    </div>
}
export default Cart;