import styles from "../styles/CartPreview.module.css";

function CartPreview({ cart }) {
  let priceTotal = 0;
  cart.map((product) => (priceTotal += product.price));

  return (
    <div className={styles.cartPreview}>
      <h2>Your cart ({cart.length} items)</h2>
      <ul className={styles.productList}>
        {cart.map((product) => (
          <div className={styles.product}>
            <p>{product.title}</p>
            <p className={styles.productPrice}>{product.price} €</p>
          </div>
        ))}
      </ul>
      <div className={styles.priceTotal}>
        <p>Total price:</p>
        <p>{priceTotal} €</p>
      </div>
    </div>
  );
}

export default CartPreview;
