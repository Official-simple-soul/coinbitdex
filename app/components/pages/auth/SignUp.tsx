import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Select,
  Checkbox,
  Button,
  Group,
  Modal,
  Stack,
  Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { countryData, ObjCountryCode } from './countryCode';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';
import { extractFriendlyFirebaseError } from '~/utils/helper';
import { notifications } from '@mantine/notifications';
import { useFunctions } from '~/providers/FunctionsProvider';
import { reload, sendEmailVerification } from 'firebase/auth';
import { auth } from '~/config/firebase';

function SignUp() {
  const [opened, setOpened] = useState(true);
  const [verificationModalOpened, setVerificationModalOpened] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const { register, storeUser, loading } = useAuth();
  const { sendMail } = useFunctions();
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      country: '',
      phonePrefix: '',
      phone: '',
      email: '',
      password: '',
      terms: false,
    },

    validate: {
      firstName: (value) => (value ? null : 'First name is required'),
      lastName: (value) => (value ? null : 'Last name is required'),
      country: (value) => (value ? null : 'Country of residence is required'),
      phone: (value) => (/^\d+$/.test(value) ? null : 'Invalid phone number'),
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length >= 6 ? null : 'Password must be at least 6 characters',
      terms: (value) => (value ? null : 'You must agree to the privacy policy'),
    },
  });

  const navigate = useNavigate();
  const close = () => {
    navigate('/');
  };

  const handleRegister = async (values: any) => {
    const phone = values.phonePrefix + values.phone;
    try {
      const user = await register(values.email, values.password);

      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setVerificationEmail(values.email);
        setVerificationModalOpened(true);
      } else {
        throw new Error('No authenticated user found');
      }

      await storeUser({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        country: values.country,
        phone,
        uid: user.uid,
        password: values.password,
      });

      await sendMail({
        email: values.email,
        message: `New user registration. ${values.firstName} just joined the app`,
      });

      // navigate('/login', { replace: true });
    } catch (err) {
      const error = extractFriendlyFirebaseError(err);
      notifications.show({
        title: 'Error',
        message: error,
        color: 'red',
      });
    }
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

  const handleVerificationComplete = async () => {
    if (!auth.currentUser) return;
    setResendLoading(true);
    try {
      await reload(auth.currentUser);

      if (auth.currentUser.emailVerified) {
        setResendLoading(false);
        navigate('/dashboard', { replace: true });
      } else {
        notifications.show({
          title: 'Email Not Verified',
          message: 'Please verify your email before continuing',
          color: 'yellow',
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
      setResendLoading(false);
    }
  };

  useEffect(() => {
    if (
      form.values.country &&
      ObjCountryCode[form.values.country as keyof typeof ObjCountryCode]
    ) {
      form.setValues({
        phonePrefix:
          ObjCountryCode[form.values.country as keyof typeof ObjCountryCode]
            ?.prefix || '',
      });
    }
  }, [form.values.country]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-auth-bg bg-no-repeat bg-cover bg-center">
      <Modal opened={opened} onClose={close} title="Register" centered>
        <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
          <TextInput
            placeholder="First Name"
            {...form.getInputProps('firstName')}
            required
            mt={14}
          />

          <TextInput
            placeholder="Last Name"
            {...form.getInputProps('lastName')}
            required
            mt={14}
          />

          <Select
            placeholder="Select country"
            data={countryData}
            {...form.getInputProps('country')}
            required
            mt={14}
          />

          <div className="flex items-center gap-1 mt-4">
            <TextInput
              placeholder="+1"
              {...form.getInputProps('phonePrefix')}
              required
              style={{ width: '20%' }}
              onClick={() =>
                notifications.show({
                  title: 'Hello',
                  message: 'Please select your country',
                  color: 'yellow',
                })
              }
              readOnly
            />
            <TextInput
              placeholder="Phone Number"
              {...form.getInputProps('phone')}
              required
              style={{ flex: '1' }}
            />
          </div>

          <TextInput
            placeholder="example@email.com"
            {...form.getInputProps('email')}
            required
            mt={14}
          />

          <PasswordInput
            placeholder="Your password"
            {...form.getInputProps('password')}
            required
            mt={14}
          />

          <Checkbox
            label={
              <span>
                I agree to the <a href="#">privacy policy</a>
              </span>
            }
            {...form.getInputProps('terms', { type: 'checkbox' })}
            required
            mt={14}
          />

          <Group mt="md">
            <Button loading={loading} type="submit">
              Sign up
            </Button>
            <div className="text-sm">
              Already a member?{' '}
              <Link className="text-blue-600 font-semibold" to={'/login'}>
                Log In
              </Link>
            </div>
          </Group>
        </form>
      </Modal>
      <Modal
        opened={verificationModalOpened}
        onClose={() => setVerificationModalOpened(false)}
        title="Verify Your Email"
        centered
        withCloseButton={false}
      >
        <Stack>
          <Text>
            We've sent a verification link to{' '}
            <strong>{verificationEmail}</strong>. Please check your inbox and
            click the link to verify your email address. Check your mail spam if link did not appear in inbox
          </Text>

          <Text size="sm" color="dimmed">
            Click "Continue" below only after you've completed email
            verification.
          </Text>

          <Group grow mt="md">
            <Button
              variant="outline"
              onClick={handleResendVerification}
              loading={resendLoading}
              loaderProps={{ type: 'bars' }}
            >
              Resend Email
            </Button>
            <Button
              loaderProps={{ type: 'bars' }}
              loading={resendLoading}
              onClick={handleVerificationComplete}
            >
              Continue
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}

export default SignUp;
