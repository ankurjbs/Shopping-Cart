import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";

import Product from "./components/Product.jsx";

import { DUMMY_PRODUCTS } from "./dummy-products.js";

//when we create a context value , and provode  this value to wrap the context around the multile componenets  , possibly around all components of your app , this context value can easly be connected to state. So we can connect React State to he context value which is provided to entire application. Now we can rid of all those props , so dont need to pass the state or the state updating functions through multiple components layers anymore. Instead, since that context value , which is linked to state is provided to all componenets in your applications . So in shopping care context (name is up to us) we define the context value.
import CartContextProvider from "./components/store/shopping-cart-context.jsx";

function App() {
  // Provider is valid value provide by the React for the component
  return (
    // The default value set when creating the context is only used if a component that was not wrapped by the Provider component tries to access the context value
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
