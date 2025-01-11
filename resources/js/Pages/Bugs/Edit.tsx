import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout';
import { router, useForm } from '@inertiajs/react';
import { Button, Group, Select, Stack, TextInput, Title } from '@mantine/core';

const Edit = ({ project, managers }) => {
  const { data, setData, put, processing, errors } = useForm({
    title: project.title || '',
    manager_id: project.manager_id ? project.manager_id.toString() : '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('projects.update', project.id), {
      onSuccess: () => {
        alert('Project updated successfully.');
      },
    });
  };

  return (
    <AuthenticatedLayout title="Edit Project">
      <Title order={2} mb="md">
        Edit Project
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
              Save Changes
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

export default Edit;
