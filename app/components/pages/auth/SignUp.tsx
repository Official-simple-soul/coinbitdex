import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Select,
  Checkbox,
  Button,
  Group,
  Modal,
} from '@mantine/core';
import { useState } from 'react';
import { CountryCode } from './countryCode';
import { Link, useNavigate } from 'react-router';

function SignUp() {
  const [opened, setOpened] = useState(true);

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
    // navigate to home page
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-auth-bg bg-no-repeat bg-cover bg-center">
      <Modal opened={opened} onClose={close} title="Register" centered>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
              onChange={(value) => {
                const prefix =
                  CountryCode.find((c) => c.code === value)?.prefix || '';
                form.setFieldValue('phonePrefix', prefix);
              }}
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
            <Button type="submit">Sign up</Button>
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
