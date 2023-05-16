import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarAlt } from "@fortawesome/free-solid-svg-icons";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [cart, setCart] = useState([]);
  const { totalProducts } = useLoaderData();

  // const itemsPerPage = 10; //TODO: Make it dynamic
  const totalPage = Math.ceil(totalProducts / itemsPerPage);

  // const pageNumbers = [];
  // for(let i =1, i < totalPage; i++){
  //   pageNumbers.push(i)
  // }
  const pageNumbers = [...Array(totalPage).keys()];
  // console.log(totalProducts);

  /**
   * Done: 1. Determine the total number of items:
   * TODO: 2. Decide on the number of items per page:
   * Done: 3. Calculate the total number of page:
   * Done: 4. Determine the current page:
   */
  // useEffect(() => {
  //   const loadProducts = async () => {
  //     try {
  //       const jsonData = "http://localhost:5000/products";
  //       const res = await fetch(jsonData);
  //       const data = await res.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   loadProducts();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);
  useEffect(() => {
    // step 1: get id
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    fetch(`http://localhost:5000/productsByIds`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        let savedCart = [];
        for (const id in storedCart) {
          // step 2: get the product by using id
          const addedProduct = cartProducts.find(
            (product) => product._id === id
          );
          if (addedProduct) {
            // step 3: get quantity of the products
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, []);

  const handleAddToCart = (product) => {
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, the set quantity = 1;
    // if exist update quantity by 1
    const exist = cart.find((pd) => pd._id === product._id);
    if (!exist) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exist];
    }
    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 15, 20];
  function handleSelectChange(e) {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  }
  return (
    <>
      <div className="shop-container">
        <div className="product-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <div className="col-span-1">
          <Cart handleClearCart={handleClearCart} cart={cart}>
            <Link to="/order">
              <button className="bg-yellow-300 flex justify-between  text-black w-[88%] m-5 rounded-md text-xl p-2 items-center">
                Review Order
                <FontAwesomeIcon icon={faCarAlt} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* Pagination*/}
      <div className="pagination">
        <p>
          Current Page: {currentPage} and items per page: {itemsPerPage}
        </p>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => setCurrentPage(number)}
            style={{ marginRight: "20px" }}
          >
            {number + 1}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
