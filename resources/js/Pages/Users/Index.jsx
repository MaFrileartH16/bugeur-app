import { AppLayout } from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import { ActionIcon, Button, Group, Table, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Index = (props) => {
  const handleAddUser = () => {
    router.get(route('users.create')); // Navigasi ke halaman create user
  };

  const handleEditUser = (id) => {
    router.get(route('users.edit', id)); // Navigasi ke halaman edit user
  };

  const handleDeleteUser = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(route('users.destroy', id), {
        onSuccess: () => {
          alert('User deleted successfully.');
        },
      });
    }
  };

  return (
    <AppLayout title="Users">
      <Group position="apart" mb="md">
        <Title order={2}>Users List</Title>
        <Button onClick={handleAddUser} color="blue">
          Add User
        </Button>
      </Group>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>User Type</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {props.users.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.id}</Table.Td>
              <Table.Td>{user.username}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>{user.user_type}</Table.Td>
              <Table.Td>
                <Group spacing="sm">
                  <ActionIcon
                    color="blue"
                    onClick={() => handleEditUser(user.id)}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </AppLayout>
  );
};

export default Index;
