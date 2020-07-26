import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function Product(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    //from action
    dispatch(detailsProduct(props.match.params.id));

  return () => {
    // 
  };
},[]);

//add to cart
const addToCart= ()=>{
  // console.log(localStorage.getItem('quantity'));
  //  var currentquantity = parseInt(localStorage.getItem('quantity')) + qty;
  //  localStorage.setItem('quantity',currentquantity);

    props.history.push("/cart/"+props.match.params.id+"?qty="+qty)

}

  
  return (
    <div>
    
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img className="product-image"
                    src={`/images/${product.image}`} alt="product"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
               
                <li>
                <b>Price:</b> ${product.price}
                </li>
                <li>
                <b>Description:</b>
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Price: {product.price}</li>
               <li>
                   Status: {product.countInStock>0?"Available":"Unavilable"}
               </li>
                <li>
                  Qty:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {/* Available quantity of this product */}
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                    {/* if product available */}
                  {product.countInStock > 0 && (
                    <button
                      onClick={addToCart}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>

        </>
      )}
    </div>
  );
}
export default Product;
