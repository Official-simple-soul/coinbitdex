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
  ActionIcon,
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
import { motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react';

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
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
        }}
      />

      {/* Primary Blur Orb - Top Right */}
      <motion.div
        className="absolute rounded-full opacity-40"
        style={{
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(139,92,246,0.3) 40%, transparent 70%)',
          filter: 'blur(80px)',
          top: '-15%',
          right: '-10%',
        }}
        animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary Blur Orb - Bottom Left */}
      <motion.div
        className="absolute rounded-full opacity-35"
        style={{
          width: '550px',
          height: '550px',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.7) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)',
          filter: 'blur(80px)',
          bottom: '-8%',
          left: '-8%',
        }}
        animate={{ x: [60, 0, 60], y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Tertiary Orb - Top Left */}
      <motion.div
        className="absolute rounded-full opacity-25"
        style={{
          width: '400px',
          height: '400px',
          background:
            'radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)',
          filter: 'blur(70px)',
          top: '5%',
          left: '-5%',
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Bottom Right Accent */}
      <motion.div
        className="absolute rounded-full opacity-20"
        style={{
          width: '350px',
          height: '350px',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)',
          filter: 'blur(70px)',
          bottom: '10%',
          right: '5%',
        }}
        animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Floating Geometric Shapes */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: `${20 + i * 10}%`,
            left: `${15 + i * 20}%`,
            top: `${10 + i * 15}%`,
          }}
          animate={{
            x: [0, Math.cos(i) * 100, 0],
            y: [0, Math.sin(i) * 100, 0],
            rotate: [0, 180 + i * 90, 360],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Floating Particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${4 + Math.random() * 4}px`,
            height: `${4 + Math.random() * 4}px`,
            background: `rgba(${59 + i * 30}, ${130 + i * 20}, ${246 + i * 5}, ${0.4 + Math.random() * 0.3})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${8 + Math.random() * 4}px rgba(59, 130, 246, 0.6)`,
          }}
          animate={{
            y: [-20, 300],
            opacity: [0, 0.8, 0],
            x: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 w-full max-w-md px-4 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Card Container */}
        <motion.div
          className="rounded-3xl p-8 backdrop-blur-xl border relative"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
          whileHover={{ boxShadow: '0 20px 60px rgba(139, 92, 246, 0.2)' }}
        >
          {/* Close Button */}
          <motion.div
            className="absolute top-6 right-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <ActionIcon
              onClick={close}
              variant="subtle"
              size="lg"
              className="rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.boxShadow =
                  '0 0 20px rgba(139, 92, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <IconX size={20} stroke={2} />
            </ActionIcon>
          </motion.div>

          {/* Header */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
              Join thousands of traders today
            </p>
          </motion.div>

          <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
            {/* First Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-4"
            >
              <TextInput
                placeholder="First Name"
                {...form.getInputProps('firstName')}
                required
                styles={{
                  input: {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    '&:focus': {
                      borderColor: 'rgba(59, 130, 246, 0.6)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                      background: 'rgba(59, 130, 246, 0.05)',
                    },
                    '&::placeholder': { color: 'rgba(255, 255, 255, 0.4)' },
                  },
                }}
              />
            </motion.div>

            {/* Last Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mb-4"
            >
              <TextInput
                placeholder="Last Name"
                {...form.getInputProps('lastName')}
                required
                styles={{
                  input: {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    '&:focus': {
                      borderColor: 'rgba(59, 130, 246, 0.6)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                      background: 'rgba(59, 130, 246, 0.05)',
                    },
                    '&::placeholder': { color: 'rgba(255, 255, 255, 0.4)' },
                  },
                }}
              />
            </motion.div>

            {/* Country Select */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-4"
            >
              <Select
                placeholder="Select country"
                data={countryData}
                {...form.getInputProps('country')}
                required
                styles={{
                  input: {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    '&:focus': {
                      borderColor: 'rgba(59, 130, 246, 0.6)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                      background: 'rgba(59, 130, 246, 0.05)',
                    },
                  },
                }}
              />
            </motion.div>

            {/* Phone Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex gap-2 mb-4"
            >
              <TextInput
                placeholder="+1"
                {...form.getInputProps('phonePrefix')}
                required
                style={{ width: '20%' }}
                readOnly
                styles={{
                  input: {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '12px 8px',
                    fontSize: '14px',
                  },
                }}
              />
              <TextInput
                placeholder="Phone Number"
                {...form.getInputProps('phone')}
                required
                style={{ flex: '1' }}
                styles={{
                  input: {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    '&:focus': {
                      borderColor: 'rgba(59, 130, 246, 0.6)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                      background: 'rgba(59, 130, 246, 0.05)',
                    },
                    '&::placeholder': { color: 'rgba(255, 255, 255, 0.4)' },
                  },
                }}
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-4"
            >
              <TextInput
                placeholder="example@email.com"
                {...form.getInputProps('email')}
                required
                styles={{
                  input: {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    '&:focus': {
                      borderColor: 'rgba(59, 130, 246, 0.6)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                      background: 'rgba(59, 130, 246, 0.05)',
                    },
                    '&::placeholder': { color: 'rgba(255, 255, 255, 0.4)' },
                  },
                }}
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mb-4"
            >
              <PasswordInput
                placeholder="Your password"
                {...form.getInputProps('password')}
                required
                styles={{
                  input: {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    '&:focus': {
                      borderColor: 'rgba(59, 130, 246, 0.6)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                      background: 'rgba(59, 130, 246, 0.05)',
                    },
                    '&::placeholder': { color: 'rgba(255, 255, 255, 0.4)' },
                  },
                }}
              />
            </motion.div>

            {/* Terms Checkbox */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-6"
            >
              <Checkbox
                label={
                  <span
                    style={{ color: 'var(--text-secondary)', fontSize: '13px' }}
                  >
                    I agree to the{' '}
                    <a href="#" style={{ color: '#60a5fa' }}>
                      privacy policy
                    </a>
                  </span>
                }
                {...form.getInputProps('terms', { type: 'checkbox' })}
                required
                styles={{
                  input: {
                    borderRadius: '6px',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    '&:checked': {
                      background:
                        'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      borderColor: '#8b5cf6',
                    },
                  },
                }}
              />
            </motion.div>

            {/* Sign Up Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              <Button
                loading={loading}
                type="submit"
                fullWidth
                className="h-12 font-semibold text-base rounded-xl relative overflow-hidden group"
                style={{
                  background:
                    'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 20px 60px rgba(139, 92, 246, 0.6)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 10px 30px rgba(139, 92, 246, 0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Create Account
              </Button>
            </motion.div>
          </form>

          {/* Sign In Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold transition-colors hover:text-purple-400"
                style={{ color: '#a78bfa' }}
              >
                Sign In
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Email Verification Modal */}
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
            click the link to verify your email address. Check your mail spam if
            link did not appear in inbox
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
