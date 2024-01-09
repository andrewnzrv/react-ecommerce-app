import styles from "../styles/CartPreview.module.css";

function CartPreview({ cart }) {
  let priceTotal = 0;
  cart.map((product) => (priceTotal += product.price));

  return (
    <div>
      <ul>
        {cart.map((product) => (
          <div>
            <p>{product.title}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </ul>
      <div>Total price: {priceTotal}</div>
    </div>
  );
}

export default CartPreview;
