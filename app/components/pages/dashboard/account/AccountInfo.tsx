import { Button, TextInput, Modal, FileInput, Avatar } from '@mantine/core';
import { IconUser, IconArrowLeft, IconUpload } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { NavLink } from 'react-router';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';

function AccountInfo() {
  const { user } = useAuth();
  const [opened, setOpened] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const form = useForm({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      email: user?.email || '',
    },
    validate: {
      firstName: (value) => (value.trim() ? null : 'First name is required'),
      lastName: (value) => (value.trim() ? null : 'Last name is required'),
      phone: (value) =>
        /^\+?\d{10,}$/.test(value) ? null : 'Invalid phone number',
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email',
    },
  });

  const handleProfileImageUpload = (file: any) => {
    setProfileImage(file);
  };

  const handleSubmit = (values: any) => {
    console.log('Updated values:', values);
    console.log('Profile image:', profileImage);
    setOpened(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <NavLink to={'/dashboard/accounts'} className="flex items-center gap-2">
          <IconArrowLeft />
          <p>Account</p>
        </NavLink>

        <Frame>
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 rounded-full p-2">
              <Avatar
                src={profileImage ? URL.createObjectURL(profileImage) : null}
                alt="Profile"
                size={50}
                color="gray"
              >
                <IconUser size={50} />
              </Avatar>
            </div>
            <p className="font-semibold">Name: {user?.firstName}</p>
          </div>
        </Frame>

        <Frame>
          <p className="text-lg pb-2 border-b">User Information</p>
          <div className="space-y-4">
            <TextInput label="First Name" value={user?.firstName} disabled />
            <TextInput label="Last Name" value={user?.lastName} disabled />
            <TextInput label="Phone Number" value={user?.phone} disabled />
            <TextInput label="Email" value={user?.email} disabled />
          </div>
        </Frame>

        <Button w={'100%'} onClick={() => setOpened(true)}>
          Update Information
        </Button>

        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Update Information"
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar
                  src={profileImage ? URL.createObjectURL(profileImage) : null}
                  alt="Profile Preview"
                  size={80}
                  radius="50%"
                  className="border-2 border-gray-200"
                >
                  {!profileImage && <IconUser size={60} />}
                </Avatar>
                <FileInput
                  label="Profile Image"
                  placeholder="Upload a profile image"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  rightSection={<IconUpload size={16} />}
                  className="w-full"
                />
              </div>

              <TextInput
                label="First Name"
                placeholder="Enter your first name"
                {...form.getInputProps('firstName')}
              />
              <TextInput
                label="Last Name"
                placeholder="Enter your last name"
                {...form.getInputProps('lastName')}
              />
              <TextInput
                label="Phone Number"
                placeholder="Enter your phone number"
                {...form.getInputProps('phone')}
              />
              <TextInput
                label="Email"
                placeholder="Enter your email"
                {...form.getInputProps('email')}
              />

              <Button fullWidth type="submit">
                Update
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default AccountInfo;
