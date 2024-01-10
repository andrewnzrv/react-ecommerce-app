import { useState } from "react";
import { Stepper, Button, Box, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import CartPreview from "../components/CartPreview";
import { Link } from "react-router-dom";
import styles from "../styles/CheckoutStepper.module.css";

function CheckoutStepper({ cart, setCart }) {
  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;
    if (isOutOfBounds) {
      return;
    } else if (form.validate().hasErrors) {
      return;
    }
    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      postcode: "",
      city: "",
      street: "",
      houseNum: "",
      email: "",
      termsOfService: false,
      cardNum: "",
      cardHolder: "",
      expDate: "",
      securityCode: "",
    },
    validate: (values) => {
      if (active === 0) {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
        };
      }
    },
  });

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step) =>
    highestStepVisited >= step && active !== step;

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="Address"
          allowStepSelect={shouldAllowSelectStep(0)}
        >
          <Box maw={1020} mx="auto" className={styles.content}>
            <CartPreview cart={cart} />
            <div className={styles.form}>
              <h2>Address</h2>
              <TextInput
                label="First Name"
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                {...form.getInputProps("lastName")}
              />
              <TextInput label="Postcode" {...form.getInputProps("postcode")} />
              <TextInput label="City" {...form.getInputProps("city")} />
              <TextInput label="Street" {...form.getInputProps("street")} />
              <TextInput
                label="House Number"
                {...form.getInputProps("houseNum")}
              />
              <TextInput label="Email" {...form.getInputProps("email")} />{" "}
            </div>
          </Box>
        </Stepper.Step>
        <Stepper.Step
          label="Payment"
          allowStepSelect={shouldAllowSelectStep(1)}
        >
          <Box maw={1020} mx="auto" className={styles.content}>
            <CartPreview cart={cart} />
            <div className={styles.form}>
              <h2>Payment details</h2>
              <TextInput
                label="Card Number"
                {...form.getInputProps("cardNum")}
              />
              <TextInput
                label="Card Holder"
                {...form.getInputProps("cardHolder")}
              />
              <TextInput
                label="Expiration Date"
                {...form.getInputProps("expDate")}
              />
              <TextInput
                label="Security Code"
                {...form.getInputProps("securityCode")}
              />
            </div>
          </Box>
        </Stepper.Step>
        <Stepper.Step label="Review" allowStepSelect={shouldAllowSelectStep(2)}>
          <Box maw={1020} mx="auto" className={styles.content}>
            <CartPreview cart={cart} />

            <div className={styles.form}>
              <h2>Review your personal details</h2>
              <p>
                {form.values.firstName} {form.values.lastName}
              </p>
              <p>
                {form.values.street} {form.values.houseNum},{" "}
                {form.values.postcode} {form.values.city}
              </p>
              <p>{form.values.email}</p>
              <p>Card number: {form.values.cardNum}</p>
              <p>Expiration date: {form.values.expDate}</p>
            </div>
          </Box>
        </Stepper.Step>

        <Stepper.Completed>
          <div className={styles.thankYou}>
            <h2>Thank you for your purchase!</h2>
          </div>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        {active === 0 && (
          <Link to="/cart">
            <Button variant="default">Return to Cart</Button>
          </Link>
        )}
        {(active <= 2) & (active > 0) && (
          <Button
            variant="default"
            onClick={() => handleStepChange(active - 1)}
          >
            Back
          </Button>
        )}
        {active < 2 && (
          <Button type="submit" onClick={() => handleStepChange(active + 1)}>
            Next step
          </Button>
        )}
        {active === 2 && (
          <Button type="submit" onClick={() => handleStepChange(active + 1)}>
            Confirm order
          </Button>
        )}
        {active === 3 && (
          <Link to="/product">
            <Button onClick={() => setCart([])}>Find more products</Button>
          </Link>
        )}
      </Group>
    </>
  );
}

export default CheckoutStepper;
