import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Modal,
  Group,
  Text,
  Stack,
  ActionIcon,
} from '@mantine/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';
import { extractFriendlyFirebaseError } from '~/utils/helper';
import { notifications } from '@mantine/notifications';
import { fetchUser } from '~/services/axios';
import { auth } from '~/config/firebase';
import { sendEmailVerification } from 'firebase/auth';
import { motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react';

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

      {/* Primary Blur Orb - Top Left */}
      <motion.div
        className="absolute rounded-full opacity-40"
        style={{
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0.3) 40%, transparent 70%)',
          filter: 'blur(80px)',
          top: '-15%',
          left: '-10%',
        }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary Blur Orb - Bottom Right */}
      <motion.div
        className="absolute rounded-full opacity-35"
        style={{
          width: '550px',
          height: '550px',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.7) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)',
          filter: 'blur(80px)',
          bottom: '-8%',
          right: '-8%',
        }}
        animate={{ x: [-60, 0, -60], y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Tertiary Orb - Top Right */}
      <motion.div
        className="absolute rounded-full opacity-25"
        style={{
          width: '400px',
          height: '400px',
          background:
            'radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)',
          filter: 'blur(70px)',
          top: '5%',
          right: '-5%',
        }}
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Bottom Left Accent */}
      <motion.div
        className="absolute rounded-full opacity-20"
        style={{
          width: '350px',
          height: '350px',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)',
          filter: 'blur(70px)',
          bottom: '10%',
          left: '5%',
        }}
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
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
        className="relative z-10 w-full max-w-md px-4"
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
          whileHover={{ boxShadow: '0 20px 60px rgba(59, 130, 246, 0.2)' }}
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
                  '0 0 20px rgba(59, 130, 246, 0.3)';
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
              Welcome Back
            </h1>
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
              Enter your credentials to access your account
            </p>
          </motion.div>

          <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-5"
            >
              <TextInput
                placeholder="Enter your email"
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
                    transition: 'all 0.3s ease',
                    '&:focus': {
                      borderColor: 'rgba(59, 130, 246, 0.6)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                      background: 'rgba(59, 130, 246, 0.05)',
                    },
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.4)',
                    },
                  },
                  label: {
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: 500,
                    marginBottom: '6px',
                  },
                }}
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6"
            >
              <PasswordInput
                placeholder="Enter your password"
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
                    transition: 'all 0.3s ease',
                    '&:focus': {
                      borderColor: 'rgba(59, 130, 246, 0.6)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                      background: 'rgba(59, 130, 246, 0.05)',
                    },
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.4)',
                    },
                  },
                  label: {
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: 500,
                    marginBottom: '6px',
                  },
                }}
              />
            </motion.div>

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                loading={loading}
                type="submit"
                fullWidth
                className="h-12 font-semibold text-base rounded-xl relative overflow-hidden group"
                style={{
                  background:
                    'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 20px 60px rgba(59, 130, 246, 0.6)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 10px 30px rgba(59, 130, 246, 0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Sign In
              </Button>
            </motion.div>
          </form>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 text-center"
          >
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold transition-colors hover:text-blue-400"
                style={{ color: '#60a5fa' }}
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Email Verification Modal */}
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
