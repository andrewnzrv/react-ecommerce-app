import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";

function CheckoutPersonalDetails() {
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
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      termsOfService: (value) =>
        value === false ? "You must agree to sell your privacy" : null,
    },
  });
  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput label="First Name" {...form.getInputProps("firstName")} />
        <TextInput label="Last Name" {...form.getInputProps("lastName")} />

        <TextInput label="Postcode" {...form.getInputProps("postcode")} />

        <TextInput label="City" {...form.getInputProps("city")} />

        <TextInput label="Street" {...form.getInputProps("street")} />

        <TextInput label="House Number" {...form.getInputProps("houseNum")} />

        <TextInput label="Email" {...form.getInputProps("email")} />

        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default CheckoutPersonalDetails;
