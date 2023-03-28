import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([])
  useEffect(()=>{
    const loadProducts = async()=>{
     try{
      const jsonData = ('products.json')
      const res = await fetch(jsonData)
      const data = await res.json()
      setProducts(data)
     }
     catch(error){
      console.log(error)
     }
    }
    loadProducts()
  },[]);
useEffect(()=> {
const storedCart = getShoppingCart()
console.log(storedCart)
},[])
  const handleAddToCart = (product) =>{
    const newCart = [...cart, product];
    setCart(newCart);
   addToDb(product.id)
  }

  return (
    <div className='shop-container'>
      <div className="products-container">
        {
          products.map(product => <Product 
            key = {product.id}
            product = {product}
            handleAddToCart = {handleAddToCart}
            />)
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}/>
      </div>
    </div>
  );
};

export default Shop;