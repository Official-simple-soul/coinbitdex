import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Modal, Group } from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Login() {
  const [opened, setOpened] = useState(true);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const navigate = useNavigate();
  const close = () => {
    // Navigate to home page
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-auth-bg bg-no-repeat bg-cover bg-center">
      <Modal opened={opened} onClose={close} title="Login" centered>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            placeholder="Email"
            {...form.getInputProps("email")}
            required
            mt={14}
          />

          <PasswordInput
            placeholder="Password"
            {...form.getInputProps("password")}
            required
            mt={14}
          />

          <Button type="submit" fullWidth mt={14}>
            Login
          </Button>

          <Group mt="md">
            <div className="text-sm">
              Not a member?{" "}
              <Link className="text-blue-600 font-semibold" to={"/signup"}>
                Sign Up
              </Link>
            </div>
          </Group>
        </form>
      </Modal>
    </div>
  );
}

export default Login;
