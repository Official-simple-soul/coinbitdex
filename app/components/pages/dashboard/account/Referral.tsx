import { Button, CopyButton } from '@mantine/core';
import { IconArrowLeft, IconFolders } from '@tabler/icons-react';
import { NavLink } from 'react-router';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';

function Referral() {
  const { user } = useAuth();
  return (
    <DashboardLayout>
      <div className="space-y-5">
        <NavLink to={'/dashboard/accounts'} className="flex items-center">
          <IconArrowLeft />
          <p>Account</p>
        </NavLink>
        <Frame>
          <div className="flex items-center w-full">
            <div className="w-full border rounded-l h-8 bg-gray-100 flex items-center justify-center pl-2 overflow-hidden">
              <p className="text-gray-700">
                https://coinbitdex/{user?.referral_id}
              </p>
            </div>
            <CopyButton value={'referal_link'}>
              {({ copied, copy }) => (
                <div className="size-8 bg-blue-500 flex items-center justify-center rounded-r">
                  <IconFolders color="white" onClick={copy} />
                </div>
              )}
            </CopyButton>
          </div>
        </Frame>
        <Frame>
          <div className="grid grid-cols-2 gap-3">
            <Button size="xs" radius={'md'}>
              Total Team: {'0'}
            </Button>
            <Button size="xs" radius={'md'}>
              Earned: {'$0.00'}
            </Button>
            <Button size="xs" radius={'md'} className="col-span-2">
              Work Team: {'0'}
            </Button>
          </div>
        </Frame>
        <Frame>
          <p className="text-sm">Your current referral level</p>
          <div className="grid grid-cols-3 gap-2">
            <Button size="xs" radius={'md'} className="">
              Level 1: {'0'}
            </Button>
            <Button size="xs" radius={'md'} className="">
              Level 2: {'0'}
            </Button>
            <Button size="xs" radius={'md'} className="">
              Level 3: {'0'}
            </Button>
          </div>
        </Frame>
      </div>
    </DashboardLayout>
  );
}

export default Referral;
