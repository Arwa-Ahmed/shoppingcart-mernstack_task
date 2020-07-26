
import axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";


const addToCart = (productId, qty) => async (dispatch, getState) => {

    try {
        //get product
        const { data } = await axios.get('https://shoppingcart-mernstackapp.herokuapp.com/products/' + productId);
        // console.log(data.product[0])
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data.product[0]._id,
                name: data.product[0].name,
                image: data.product[0].image,
                price: data.product[0].price,
                countInStock: data.product[0].countInStock,
                qty: qty
            }
        })

        //save the current items in cookie
        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch (error) {

    }
}


//remove product from cart
const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));

}

export { addToCart, removeFromCart }