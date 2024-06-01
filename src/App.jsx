import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";

import Product from "./components/Product.jsx";

import { DUMMY_PRODUCTS } from "./dummy-products.js";

//when we create a context value , and provode  this value to wrap the context around the multile componenets  , possibly around all components of your app , this context value can easly be connected to state. So we can connect React State to he context value which is provided to entire application. Now we can rid of all those props , so dont need to pass the state or the state updating functions through multiple components layers anymore. Instead, since that context value , which is linked to state is provided to all componenets in your applications . So in shopping care context (name is up to us) we define the context value.
import { CartContext } from "./components/store/shopping-cart-context.jsx";

function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const cartCtx = {
    items:shoppingCart.items,
    addItemToCart:handleAddItemToCart
  }
  // Provider is valid value provide by the React for the component 
  return (
    // The default value set when creating the context is only used if a component that was not wrapped by the Provider component tries to access the context value
    <CartContext.Provider value = {cartCtx}>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={handleAddItemToCart} />
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
  );
}

export default App;
