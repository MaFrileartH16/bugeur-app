import { AppLayout } from '@/Layouts/AppLayout';
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

const Create = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: '',
    email: '',
    user_type: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('users.store'), {
      onSuccess: () => reset(), // Reset form setelah sukses
    });
  };

  return (
    <AppLayout title="Add User">
      <Title order={2} mb="md">
        Add New User
      </Title>
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <TextInput
            label="Username"
            placeholder="Enter username"
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
            error={errors.username}
          />

          <TextInput
            label="Email"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            error={errors.email}
          />

          <Select
            label="User Type"
            placeholder="Select user type"
            data={[
              { value: 'project_manager', label: 'Project Manager' },
              { value: 'developer', label: 'Developer' },
              { value: 'tester', label: 'Tester' },
            ]}
            value={data.user_type}
            onChange={(value) => setData('user_type', value)}
            error={errors.user_type}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            error={errors.password}
          />

          <Group position="right">
            <Button type="submit" color="blue" loading={processing}>
              Save
            </Button>
            <Button
              variant="default"
              onClick={() => router.get(route('users.index'))} // Kembali ke halaman index
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </AppLayout>
  );
};

export default Create;
