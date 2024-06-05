// reducer is a function that reduce one or more complex value to a simpler one value for state managment purposes.
import { Children, createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../../dummy-products";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});
function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state, // not needed here bcz we have only one value
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }
  return state;
}
export default function CartContextProvider({ children }) {
  // useReducer hooks gives you an array with exactly two elements. First element you will get back will be your state  thats managed by the useReducer , and second element will get back wil be a dispatch function (so called actions)
  // so now a reducer function that will get triggered by dispatching values and that will then produce a new state  (i.e. shoppingCartState). For this we have to create a reducerFunction (i.e shoppingCartReducer) . That accept two parameter , a state parameter and an action parameter. This reducerFunction (shoppingCartReducer) ultimately called by react after you dispatched (shoppingCartDispatch) will recieve  action on this fn (shoppingCartReducer).

  // second parameter will be default state for shoppingCartReducer.
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
  }

  const cartCtx = {
    // items: shoppingCart.items, // before implementing reducer
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
