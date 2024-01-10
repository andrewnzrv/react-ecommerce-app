import CheckoutStepper from "../components/CheckoutStepper";
import styles from "../styles/CheckoutPage.module.css";

function CheckoutPage({ cart, setCart }) {
  return (
    <div className={styles.stepperDiv}>
      <div className={styles.stepperContent}>
        <CheckoutStepper cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default CheckoutPage;
