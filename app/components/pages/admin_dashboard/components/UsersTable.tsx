import { useMantineTheme, Card } from '@mantine/core';
import {} from '@tabler/icons-react';
import { NavLink } from 'react-router';
import type { UserData } from '~/providers/types';

interface UsersTableProps {
  users: UserData[] | undefined;
  isLoading: boolean;
}

export function UsersTable({ users, isLoading }: UsersTableProps) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-3">
      {users?.map((user, index) => (
        <Card key={index} shadow="sm" padding="md" radius="md" withBorder>
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
              <p className="text-center mt-2 text-green-600">View User</p>
            </div>
          </NavLink>
        </Card>
      ))}
    </div>
  );
}
