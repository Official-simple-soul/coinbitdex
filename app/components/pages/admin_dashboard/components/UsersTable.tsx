import { useMantineTheme } from '@mantine/core';
import {} from '@tabler/icons-react';
import { NavLink } from 'react-router';
import Frame from '~/components/common/Frame';
import type { UserData } from '~/providers/types';

interface UsersTableProps {
  users: UserData[];
  onBlock: (userId: string) => void;
  onCredit: (userId: string) => void;
}

export function UsersTable({ users, onBlock, onCredit }: UsersTableProps) {
  const theme = useMantineTheme();

  return (
    <div className="space-y-2">
      {users?.map((user, index) => (
        <Frame key={index}>
          <NavLink to={`/admin/dashboard/user/${user.uid}`}>
            <div className="text-xs space-y-1">
              <p className="text-xs">
                Email: <span className="font-semibold">{user?.email}</span>
              </p>
              <div className="flex justify-between items-center">
                <p>
                  Status:{' '}
                  <span className="font-semibold">
                    {user?.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </p>
                <p>
                  Balance:{' '}
                  <span className="font-semibold">
                    ${user?.balance?.toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p>
                  Profit:{' '}
                  <span className="font-semibold">
                    ${user?.total_profit?.toFixed(2)}
                  </span>
                </p>
                <p className="text-end">
                  Copy Profit:{' '}
                  <span className="font-semibold">
                    ${user?.copy_trading_profit?.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </NavLink>
        </Frame>
      ))}
    </div>
  );
}
