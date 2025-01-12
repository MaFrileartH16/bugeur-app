import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout';
import { router, useForm } from '@inertiajs/react';
import {
  Button,
  Group,
  PasswordInput,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';

const Edit = ({ user }) => {
  const { data, setData, put, processing, errors } = useForm({
    username: user.username || '',
    email: user.email || '',
    user_type: user.user_type || '',
    password: '', // Password kosong untuk tidak diubah kecuali diisi
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('users.update', user.id), {
      onSuccess: () => {
        alert('User updated successfully.');
      },
    });
  };

  return (
    <AuthenticatedLayout title="Edit User">
      <Title order={2} mb="md">
        Edit User
      </Title>
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          {/* Username Input */}
          <TextInput
            label="Username"
            placeholder="Enter username"
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
            error={errors.username}
          />

          {/* Email Input */}
          <TextInput
            label="Email"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            error={errors.email}
          />

          {/* User Type Dropdown */}
          <Select
            label="User Type"
            placeholder="Select user type"
            data={[
              { value: 'project_manager', label: 'Project Manager' },
              { value: 'developer', label: 'Developer' },
              { value: 'tester', label: 'Tester' },
            ]}
            defaultValue={data.user_type} // Selected value
            onChange={(value) => setData('user_type', value)}
            error={errors.user_type}
          />

          {/* Password Input */}
          <PasswordInput
            label="Password"
            placeholder="Enter new password (optional)"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            error={errors.password}
          />

          {/* Buttons */}
          <Group position="right">
            <Button type="submit" color="blue" loading={processing}>
              Save Changes
            </Button>
            <Button
              variant="default"
              onClick={() => router.get(route('users.index'))} // Navigate back to user index
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </AuthenticatedLayout>
  );
};

export default Edit;
