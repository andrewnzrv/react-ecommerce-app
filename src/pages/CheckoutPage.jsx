import CheckoutStepper from "../components/CheckoutStepper";

function CheckoutPage({ cart, setCart }) {
  return <CheckoutStepper cart={cart} setCart={setCart} />;
}

export default CheckoutPage;
