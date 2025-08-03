import { useListUsers } from '~/services/users.service';
import { AdminLayout } from './components/AdminLayout';
import { UsersTable } from './components/UsersTable';
import { Card, TextInput } from '@mantine/core';
import { useState } from 'react';
import { IconSearch, IconX } from '@tabler/icons-react';

function Admin() {
  const [emailQuery, setEmailQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users, isLoading } = useListUsers(emailQuery);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      return;
    }

    setEmailQuery(searchTerm.trim());
  };

  const clearSearch = () => {
    setSearchTerm('');
    setEmailQuery('');
  };

  return (
    <AdminLayout>
      <div className="space-y-6 bg-white min-h-screen">
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <div className="">
            <h1 className="font-semibold pb-1 border-b text-center">Users</h1>
          </div>
        </Card>
        <div className="flex justify-end items-center">
          <TextInput
            rightSection={
              <div className="bg-blue-500 h-full w-24 flex items-center justify-center cursor-pointer rounded-r-md">
                <IconSearch size={16} color="white" onClick={handleSearch} />
              </div>
            }
            leftSection={<IconX size={16} onClick={clearSearch} color="red" />}
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md"
            size="sm"
            radius={'md'}
          />
        </div>
        <UsersTable users={users} isLoading={isLoading} />
      </div>
    </AdminLayout>
  );
}

export default Admin;
