import styles from "../styles/CartPreview.module.css";

function CartPreview({ cart }) {
  let priceTotal = 0;
  cart.map((product) => (priceTotal += product.price));

  return (
    <div className={styles.cartPreview}>
      <h4>Order overview</h4>
      <ul className={styles.productList}>
        {cart.map((product) => (
          <div className={styles.product}>
            <p>{product.title}</p>
            <p>€{product.price}</p>
          </div>
        ))}
      </ul>
      <div className={styles.priceTotal}>
        <p>Total price:</p>
        <p>€{priceTotal}</p>
      </div>
    </div>
  );
}

export default CartPreview;
