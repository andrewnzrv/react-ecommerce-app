import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Error404 from "./pages/Error404";
import HomePage from "./pages/Homepage";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";
import { useState } from "react";
import CheckoutPage from "./pages/CheckoutPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@mantine/core";

function App() {
  //HIGHER ORDER STATE FOR THE DATA
  const [cart, setCart] = useState([]);
  const [checked, setChecked] = useState(false);

  return (
    <>
      <nav>
        <ul className="nav">
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/product">Products</Link>
            <Link to="/product/new">Add a new product</Link>
          </div>
          <div className="nav-icons">
            <div className="nav-cart">
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />({cart.length})
              </Link>
            </div>

            <div>
              <Switch
                onChange={(event) => {
                  setChecked(event.currentTarget.checked);
                }}
              />
            </div>
          </div>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/new" element={<NewProduct />} />
        <Route path="/products/:productId/update" element={<EditProduct />} />
        <Route
          path="/products/:productId"
          element={<ProductDetail setCart={setCart} checked={checked} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/product" element={<Product checked={checked} />} />
        <Route
          path="checkout"
          element={<CheckoutPage cart={cart} setCart={setCart} />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
