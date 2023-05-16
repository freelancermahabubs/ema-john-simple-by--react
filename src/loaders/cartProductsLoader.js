import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
  const storedCart = getShoppingCart();
  // console.log(storedCart);
  const ids = Object.keys(storedCart);
  console.log(ids);
  const loadedProducts = await fetch(`http://localhost:5000/productsByIds`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(ids),
  });
  const products = await loadedProducts.json();
  console.log(products);
  // if cart data is in databse, you have to use async await

  const saveCart = [];
  for (const id in storedCart) {
    const addedProduct = products.find((pd) => pd._id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      saveCart.push(addedProduct);
    }
  }

  // if you need to send two things
  // return [products, saveCart]
  // another opitons
  // return {products, cart: saveCart}
  return saveCart;
};
export default cartProductsLoader;
