import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import CheckoutPersonalDetails from "./CheckoutPersonalDetails";

function CheckoutStepper() {
  const [active, setActive] = useState(1);
  const [highestStepVisited, setHighestStepVisited] = useState(active);
  const handleStepChange = (nextStep) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;
    if (isOutOfBounds) {
      return;
    }
    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };
  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step) =>
    highestStepVisited >= step && active !== step;
  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="Personal details"
          allowStepSelect={shouldAllowSelectStep(0)}
        >
          <CheckoutPersonalDetails />
        </Stepper.Step>
        <Stepper.Step
          label="Payment details"
          allowStepSelect={shouldAllowSelectStep(1)}
        >
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step
          label="Confirmation"
          allowStepSelect={shouldAllowSelectStep(2)}
        >
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
        <Button onClick={() => handleStepChange(active + 1)}>Next step</Button>
      </Group>
    </>
  );
}

export default CheckoutStepper;
