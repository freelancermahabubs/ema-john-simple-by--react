import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
  const {img, name, price, quantity, ratings, id, ratingsCount, seller, shipping, stock, category} = props.product;
  const handleAddToCart = props.handleAddToCart;
 
  return (
    <div className='product'>
      <img src={img} alt="" />
      <h6 className='product-name'>{name}</h6>
     <div className='product-info'>
     <p>Price: ${price}</p>
      <p>Manufacturer: {seller}</p>
      <p>Rating: {ratings} Stars</p>
     </div>
     <button onClick={()=> handleAddToCart(props.product)} className='btn-add-to-cart'>
      Add to Cart
       <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

export default Product;