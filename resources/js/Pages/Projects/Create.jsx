import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout';
import { router, useForm } from '@inertiajs/react';
import { Button, Group, Select, Stack, TextInput, Title } from '@mantine/core';

const Create = ({ managers }) => {
  console.log(managers);
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    manager_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('projects.store'), {
      onSuccess: () => reset(), // Reset form setelah sukses
    });
  };

  return (
    <AuthenticatedLayout title="Add Project">
      <Title order={2} mb="md">
        Add New Project
      </Title>
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <TextInput
            label="Title"
            placeholder="Enter project title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            error={errors.title}
          />

          <Select
            label="Manager"
            placeholder="Select a manager"
            data={managers.map((manager) => ({
              value: manager.id.toString(),
              label: manager.username,
            }))}
            value={data.manager_id}
            onChange={(value) => setData('manager_id', value)}
            error={errors.manager_id}
          />

          <Group position="right">
            <Button type="submit" color="blue" loading={processing}>
              Save
            </Button>
            <Button
              variant="default"
              onClick={() => router.get(route('projects.index'))} // Kembali ke halaman index
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </AuthenticatedLayout>
  );
};

export default Create;
