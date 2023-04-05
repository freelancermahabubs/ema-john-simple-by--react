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
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, the set quantity = 1;
    // if exist update quantity by 1
    const exist = cart.find(pd => pd.id === product.id);
    if(!exist){
      product.quantity = 1;
      newCart = [...cart, product]
    }
    else{
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter(pd => pd.id !== product.id);
      newCart = [...remaining, exist]
    }
    setCart(newCart);
   addToDb(product.id)
  }

  return (
    <div className="shop-container">
      <div className="product-container">
        {
          products.map(product => <Product 
            key = {product.id}
            product = {product}
            handleAddToCart = {handleAddToCart}
            />)
        }
      </div>
      <div className="col-span-1">
        <Cart cart={cart}/>
      </div>
    </div>
  );
};

export default Shop;