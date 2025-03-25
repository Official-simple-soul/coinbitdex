import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Select,
  Checkbox,
  Button,
  Group,
  Modal,
  type ComboboxItem,
} from '@mantine/core';
import { useState } from 'react';
import { CountryCode } from './countryCode';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';
import { extractFriendlyFirebaseError } from '~/utils/helper';
import { notifications } from '@mantine/notifications';

function SignUp() {
  const [opened, setOpened] = useState(true);
  const [prefixValue, setPrefixValue] = useState<ComboboxItem | null>(null);
  const { register, storeUser, loading } = useAuth();
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
      console.log('user', user);

      await storeUser({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        country: values.country,
        phone,
        uid: user.uid,
        password: values.password,
      });
      navigate('/dashboard', { replace: true });
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

          <TextInput
            placeholder="Enter your country"
            {...form.getInputProps('country')}
            required
            mt={14}
          />

          <div className="flex items-center gap-1 mt-4">
            <Select
              placeholder="+1"
              data={CountryCode.map((country) => ({
                value: country.code,
                label: country.prefix,
              }))}
              {...form.getInputProps('phonePrefix')}
              onChange={(_value, option) => {
                form.setFieldValue('phonePrefix', option.label);
                setPrefixValue(option);
              }}
              value={prefixValue ? prefixValue.value : null}
              required
              style={{ width: '20%' }}
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
    </div>
  );
}

export default SignUp;
