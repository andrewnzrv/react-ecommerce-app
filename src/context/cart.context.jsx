import { createContext, useState } from "react"; // <== UPDATE

const CartContext = createContext();

function CartProviderWrapper(props) {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart }}>
      {props.children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProviderWrapper };
