import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Homepage";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";
import { useState } from "react";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  //HIGHER ORDER STATE FOR THE DATA

  const [cart, setCart] = useState([])


  return (
    <>
      <nav>
        <ul className="nav">
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/product">Products</Link>
            <Link to="/product/new">Add New Product</Link>
          </div>
          <div className="cart">
            <Link to="/cart">Cart({cart.length})</Link>
          </div>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/new" element={<NewProduct />} />
        <Route path="/products/:productId/update" element={<EditProduct />} />
        <Route
          path="/products/:productId"
          element={<ProductDetail setCart={setCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/product" element={<Product />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="*" element={<h1>404 page</h1>} />
      </Routes>
    </>
  );
}

export default App;
