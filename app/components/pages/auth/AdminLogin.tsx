import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Modal, Group } from '@mantine/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';
import { extractFriendlyFirebaseError } from '~/utils/helper';
import { notifications } from '@mantine/notifications';
import { fetchUser } from '~/services/axios';

function AdminLogin() {
  const [opened] = useState(true);
  const { login, logout } = useAuth();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const user = await login(values.email, values.password);

      const adminUser = await fetchUser(user.user.uid);
      if (adminUser?.role === 'admin') {
        window.location.replace('/admin/dashboard');
      } else {
        notifications.show({
          title: 'Error',
          message: 'You must be an admin to access this page.',
          color: 'red',
        });
        logout();
        close();
      }
    } catch (err) {
      const error = extractFriendlyFirebaseError(err);
      notifications.show({
        title: 'Error',
        message: error,
        color: 'red',
      });
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-auth-bg bg-no-repeat bg-cover bg-center">
      <Modal opened={opened} onClose={close} title="Admin Login" centered>
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
        </form>
      </Modal>
    </div>
  );
}

export default AdminLogin;
