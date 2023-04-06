import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Cart = ({cart, handleClearCart, children}) => {
  // const cart = props.cart;

let totalPrice = 0;
let totalShipping = 0;
let quantity = 0;
for(const product of cart){
  // if(product.quantity === 0){
  //   product.quantity = 1;
  // }
  // product.quantity = product.quantity || 1;
  totalPrice += + product.price * product.quantity;
  totalShipping += +product.shipping;
  quantity += + product.quantity
};
const tax = (totalPrice * 7 / 100);
const grandTotal = (totalPrice + totalPrice + tax);
  return (
    <div className='cart'>
        <h4 >Order Summary</h4>
        <p>Selected Items: {quantity}</p>
        <p>Total Price: ${totalPrice}</p>
        <p>Total Shipping: ${totalShipping}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
        <button onClick={handleClearCart} className='flex justify-between  text-white w-[88%] m-5 bg-red-700 rounded-md text-xl p-2 items-center'>
          <span>Clear Cart</span>
    <FontAwesomeIcon icon={faTrashAlt}/>
        </button>
        {children}
    </div>
  );
};

export default Cart;