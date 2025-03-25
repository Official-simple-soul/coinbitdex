import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';
import {
  IconArrowLeft,
  IconCheck,
  IconClock,
  IconId,
  IconShield,
} from '@tabler/icons-react';
import { Button, Modal, Select, FileInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { cardTypes, countries } from './data';
import { NavLink } from 'react-router';
import { useFunctions } from '~/providers/FunctionsProvider';
import { notifications } from '@mantine/notifications';
import { convertToBase64 } from '~/utils/helper';

function KYC() {
  const { user, updateUser } = useAuth();
  const { storeKYC } = useFunctions();
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const kycStatus = user?.kyc_level;

  const tiers = [
    {
      tier: 'Tier 1',
      key: 1,
      status: kycStatus === 1 ? 'active' : 'completed',
      description: 'Basic account access. No document upload required.',
      icon: <IconId size={30} className="text-blue-500" />,
    },
    {
      tier: 'Tier 2',
      key: 2,
      status:
        kycStatus === 2 ? 'active' : kycStatus === 1 ? 'pending' : 'completed',
      description: 'Upload a valid ID to unlock higher limits and features.',
      icon: <IconShield size={30} className="text-green-500" />,
    },
    {
      tier: 'Tier 3',
      key: 3,
      status: kycStatus === 3 ? 'active' : 'locked',
      description: 'Contact support to achieve tier 3 features.',
      icon: <IconShield size={30} className="text-purple-500" />,
    },
  ];

  const form = useForm({
    initialValues: {
      cardType: '',
      country: '',
      documentFile: null,
    },
    validate: {
      cardType: (value) => (value ? null : 'Card type is required'),
      country: (value) => (value ? null : 'Country is required'),
      documentFile: (value) => (value ? null : 'Document is required'),
    },
  });

  const handleSubmit = async (values: any) => {
    if (!user?.uid) {
      throw new Error('User ID is required to store the record');
    }

    setLoading(true);
    const document = await convertToBase64(values.documentFile);

    try {
      await storeKYC(user.uid, {
        card_type: values.cardType,
        country: values.country,
        document: document as string,
      });

      await updateUser(user.uid, {
        kyc_status: 'in-progress',
      });

      setOpened(false);
      notifications.show({
        title: 'Success',
        message:
          'Document uploaded successfully. Your status will change when the document is verified',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
        color: 'red',
      });
    } finally {
      setLoading(false);
      setOpened(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <NavLink to={'/dashboard/accounts'} className="flex items-center">
          <IconArrowLeft />
          <p>Account</p>
        </NavLink>
        <Frame>
          <p className="text-center pb-1 border-b font-semibold">KYC Status</p>
        </Frame>

        {tiers.map((tier, index) => (
          <Frame key={index}>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">{tier.icon}</div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{tier.tier}</p>
                  {tier.status === 'active' && (
                    <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                      Active
                    </span>
                  )}
                  {tier.status === 'completed' && (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                      <IconCheck size={16} /> Completed
                    </span>
                  )}
                  {tier.status === 'pending' && (
                    <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1">
                      <IconClock size={16} /> Pending
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-1 text-xs">{tier.description}</p>

                {tier.status === 'pending' && (
                  <Button
                    mt={5}
                    size="xs"
                    onClick={() => setOpened(true)}
                    disabled={user?.kyc_status === 'in-progress'}
                  >
                    {user?.kyc_status === 'in-progress'
                      ? 'Validating Documents'
                      : 'Upload Document'}
                  </Button>
                )}
                {tier.status === 'locked' && (
                  <Button mt={5} size="xs">
                    Contact Support
                  </Button>
                )}
              </div>
            </div>
          </Frame>
        ))}
      </div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Upload Document"
        size="lg"
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="space-y-4">
            <Select
              label="Card Type"
              placeholder="Select card type"
              data={cardTypes}
              {...form.getInputProps('cardType')}
              required
            />

            <Select
              label="Country"
              placeholder="Select country"
              data={countries}
              {...form.getInputProps('country')}
              required
            />

            <FileInput
              label="Upload Document"
              placeholder="Choose a file"
              accept=".jpg,.jpeg,.png"
              {...form.getInputProps('documentFile')}
              required
            />

            <Button
              fullWidth
              loading={loading}
              loaderProps={{ type: 'bars' }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

export default KYC;
