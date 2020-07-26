import {
     PRODUCT_LIST_REQUEST,
      PRODUCT_LIST_SUCCESS,
       PRODUCT_LIST_FAIL,
       PRODUCT_DETAILS_REQUEST,
       PRODUCT_DETAILS_SUCCESS,
       PRODUCT_DETAILS_FAIL
} from "../constants/productConstans";
import axios from 'axios';

const listProducts = ()=> async (dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("https://shoppingcart-mernstackapp.herokuapp.com/products/");
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data.products.doc});
    }catch(error){
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.message});

    }
   
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
      const { data } = await axios.get('https://shoppingcart-mernstackapp.herokuapp.com/products/' + productId);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product[0] });
     // console.log(data.product[0]);
    } catch (error) {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
  };

export {
    listProducts,
    detailsProduct
};