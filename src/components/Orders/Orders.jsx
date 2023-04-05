import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { removeFromDb } from '../../utilities/fakedb';


const Orders = () => {
const savedCart = useLoaderData();
const [cart, setCart] = useState(savedCart);
const handleRemoveFromCart = (id) =>{
const remaining = cart.filter(product => product.id !== id);
setCart(remaining);
removeFromDb(id)
}

  return (
    <div className='grid lg:grid-cols-4'>
     <div className='grid col-span-3 gap-4 px-5 mx-auto lg:grid-cols-1 my-12 w-[75%]'>
     {
      cart.map(product => <ReviewItem 
        key={product.id}
        handleRemoveFromCart = {handleRemoveFromCart}
       product={product}/>)
     }
     </div>
      <div className='col-span-1 mx-auto pl-14 my-12 rounded'>
      <Cart cart = {cart} />
    </div>
    </div>
  );
};

export default Orders;