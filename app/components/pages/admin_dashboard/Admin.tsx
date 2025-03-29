import { useListUsers } from '~/services/users.service';
import { AdminLayout } from './components/AdminLayout';
import { UsersTable } from './components/UsersTable';
import { Card } from '@mantine/core';
function Admin() {
  const { data: users, isLoading } = useListUsers();

  return (
    <AdminLayout>
      <div className="space-y-6 bg-white min-h-screen">
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <div className="">
            <h1 className="font-semibold pb-1 border-b text-center">Users</h1>
          </div>
        </Card>
        <UsersTable users={users} isLoading={isLoading} />
      </div>
    </AdminLayout>
  );
}

export default Admin;
