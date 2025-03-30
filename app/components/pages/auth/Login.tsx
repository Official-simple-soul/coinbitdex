import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Modal,
  Group,
  Text,
  Stack,
} from '@mantine/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';
import { extractFriendlyFirebaseError } from '~/utils/helper';
import { notifications } from '@mantine/notifications';
import { fetchUser } from '~/services/axios';
import { auth } from '~/config/firebase';
import { sendEmailVerification } from 'firebase/auth';

function Login() {
  const [opened, setOpened] = useState(true);
  const { login, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [emailVerifiedStatusModal, setEmailVerifiedStatusModal] =
    useState(false);
  const [resendLoading, setResendLoading] = useState(false);

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

  const handleResendVerification = async () => {
    if (!auth.currentUser) return;

    setResendLoading(true);
    try {
      await sendEmailVerification(auth.currentUser);
      notifications.show({
        title: 'Success',
        message: 'Verification email resent successfully',
        color: 'green',
      });
    } catch (err) {
      const error = extractFriendlyFirebaseError(err);
      notifications.show({
        title: 'Error',
        message: error,
        color: 'red',
      });
    } finally {
      setResendLoading(false);
    }
  };

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const user = await login(values.email, values.password);
      const userInfo = await fetchUser(user.user.uid);

      if (!user?.user?.emailVerified) {
        setEmailVerifiedStatusModal(true);
        return;
      }

      if (!userInfo?.isBlocked) {
        window.location.replace('/dashboard');
      } else {
        logout();
        notifications.show({
          title: 'Account Blocked',
          message:
            'Your account has been blocked. Please contact support for further assistance.',
          color: 'red',
        });
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
      <Modal
        opened={emailVerifiedStatusModal}
        onClose={() => setEmailVerifiedStatusModal(false)}
        title="Email Verification Required"
        centered
      >
        <Stack>
          <Text>
            Your email address has not been verified yet. Please check your
            inbox for the verification email we sent you.
          </Text>

          <Text size="sm" color="dimmed">
            You need to verify your email before you can access your account.
          </Text>

          <Group grow mt="md">
            <Button
              variant="default"
              onClick={() => {
                setEmailVerifiedStatusModal(false);
                logout();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleResendVerification}
              loading={resendLoading}
              loaderProps={{ type: 'bars' }}
              color="blue"
            >
              Resend Verification
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}

export default Login;
