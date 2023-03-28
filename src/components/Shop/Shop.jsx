import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
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

  return (
    <div className='shop-container'>
      <div className="products-container">
        {
          products.map(product => <Product 
            key = {product.id}
            product = {product}
            />)
        }
      </div>
      <div className="cart-container">
        <h4 >Order Summary</h4>
      </div>
    </div>
  );
};

export default Shop;