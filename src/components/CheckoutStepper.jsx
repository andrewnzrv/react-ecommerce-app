import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import CheckoutPersonalDetails from "./CheckoutAddress";
import { useForm } from "@mantine/form";

function CheckoutStepper() {
  const [active, setActive] = useState(1);
  const [highestStepVisited, setHighestStepVisited] = useState(active);
  const handleStepChange = (nextStep) => {
    console.log();
    const isOutOfBounds = nextStep > 3 || nextStep < 0;
    if (isOutOfBounds) {
      return;
    }
    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [checkoutDetails, setCheckoutDetails] = useState({
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
  });*/

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
          <CheckoutPersonalDetails
            firstName={checkoutDetails.firstName}
            lastName={checkoutDetails.lastName}
            postcode={checkoutDetails.postcode}
            city={checkoutDetails.city}
            street={checkoutDetails.street}
            houseNum={checkoutDetails.houseNum}
            email={checkoutDetails.email}
            termsOfService={checkoutDetails.termsOfService}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Payment"
          allowStepSelect={shouldAllowSelectStep(1)}
        >
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Review" allowStepSelect={shouldAllowSelectStep(2)}>
          Step 3 content: Get full access
        </Stepper.Step>

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={() => handleStepChange(active - 1)}>
          Back
        </Button>
        <Button type="submit" onClick={() => handleStepChange(active + 1)}>
          Next step
        </Button>
      </Group>
    </>
  );
}

export default CheckoutStepper;
