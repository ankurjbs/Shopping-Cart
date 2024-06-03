// auppose we have to use context value here . so we have to import here. And to use this context ,React provides a special type hook name useContext.
import { useContext } from "react";
import { CartContext } from "./store/shopping-cart-context";

export default function Cart({ onUpdateItemQuantity }) {
  const { items } = useContext(CartContext);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  // Since context.provider provides a value (define in app.js CartContext.Provider). React also provide a another component in respect of context i.e. CartContext.Consumer. This componenet can be used to wrap the JSX Code that should have access to a context value with it (In follwing jsx code items define anobe using useContext). This Consumer component needs a special kind of child though between opening and closing tag of Context.Consumer
  {
    /* <CartContext.Consumer>{(cartCtx) => {
    return <div id="cart"></div>
  }}</CartContext.Consumer>; */
  }

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
