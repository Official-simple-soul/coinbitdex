import { useListUsers } from '~/services/users.service';
import { AdminLayout } from './components/AdminLayout';
import { UsersTable } from './components/UsersTable';
import Frame from '~/components/common/Frame';

function Admin() {
  const { data: users } = useListUsers();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Frame>
          <div className="">
            <h1 className="font-semibold pb-1 border-b text-center">Users</h1>
          </div>
        </Frame>
        <UsersTable users={users} />
      </div>
    </AdminLayout>
  );
}

export default Admin;
