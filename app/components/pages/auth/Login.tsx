import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Modal, Group } from '@mantine/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';
import { extractFriendlyFirebaseError } from '~/utils/helper';
import { notifications } from '@mantine/notifications';

function Login() {
  const [opened, setOpened] = useState(true);
  const { login, loading } = useAuth();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length >= 6 ? null : 'Password must be at least 6 characters',
    },
  });

  const navigate = useNavigate();
  const close = () => {
    navigate('/');
  };

  const handleLogin = async (values: any) => {
    try {
      await login(values.email, values.password);
      // navigate('/dashboard', { replace: true });
      window.location.replace('/dashboard');
    } catch (err) {
      const error = extractFriendlyFirebaseError(err);
      notifications.show({
        title: 'Error',
        message: error,
        color: 'red',
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-auth-bg bg-no-repeat bg-cover bg-center">
      <Modal opened={opened} onClose={close} title="Login" centered>
        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <TextInput
            placeholder="Email"
            {...form.getInputProps('email')}
            required
            mt={14}
            size="sm"
          />

          <PasswordInput
            placeholder="Password"
            {...form.getInputProps('password')}
            required
            mt={14}
            size="sm"
          />

          <Button loading={loading} type="submit" fullWidth mt={14}>
            Login
          </Button>

          <Group mt="md">
            <div className="text-sm">
              Not a member?{' '}
              <Link className="text-blue-600 font-semibold" to={'/signup'}>
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
