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
  // step 1: get id 
const storedCart = getShoppingCart();
let savedCart = []
for(const id in storedCart){
  // step 2: get the product by using id 
  const addedProduct = products.find(product => product.id === id);
  if(addedProduct){
     // step 3: get quantity of the products
  const quantity = storedCart[id];
  addedProduct.quantity = quantity;
  savedCart.push(addedProduct);
  }
};
setCart(savedCart)
},[products]);


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