import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout';
import { router, useForm } from '@inertiajs/react';
import {
  Button,
  FileInput,
  Group,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

const Create = ({ project, users }) => {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    assignee_id: '',
    status: 'open',
    bug_type: 'minor',
    screenshots: null, // Untuk menyimpan file screenshots
    project_id: project.id, // Pastikan project_id dikirim
  });

  const [deadline, setDeadline] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData('deadline', deadline); // Set deadline ke form data
    post(route('projects.bugs.store', project.id), {
      onSuccess: () => {
        console.log('Bug created successfully!');
        setData('screenshots', null); // Reset screenshots
      },
    });
  };

  return (
    <AuthenticatedLayout title={`Add Bug to ${project.title}`}>
      <Title order={2} mb="md">
        Add Bug to {project.title}
      </Title>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Stack spacing="md">
          <TextInput
            label="Title"
            placeholder="Enter bug title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            error={errors.title}
          />

          <Textarea
            label="Description"
            placeholder="Describe the bug"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            error={errors.description}
          />

          <Select
            label="Assignee"
            placeholder="Select a user"
            data={users.map((user) => ({
              value: user.id.toString(),
              label: user.username,
            }))}
            value={data.assignee_id}
            onChange={(value) => setData('assignee_id', value)}
            error={errors.assignee_id}
          />

          <Select
            label="Status"
            placeholder="Select bug status"
            data={[
              { value: 'open', label: 'Open' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'resolved', label: 'Resolved' },
              { value: 'closed', label: 'Closed' },
            ]}
            value={data.status}
            onChange={(value) => setData('status', value)}
            error={errors.status}
          />

          <Select
            label="Bug Type"
            placeholder="Select bug type"
            data={[
              { value: 'critical', label: 'Critical' },
              { value: 'major', label: 'Major' },
              { value: 'minor', label: 'Minor' },
            ]}
            value={data.bug_type}
            onChange={(value) => setData('bug_type', value)}
            error={errors.bug_type}
          />

          <DatePickerInput
            label="Deadline"
            placeholder="Pick a deadline"
            value={deadline}
            onChange={setDeadline}
            error={errors.deadline}
          />

          <FileInput
            label="Screenshots"
            placeholder="Upload screenshots"
            multiple
            onChange={(files) => setData('screenshots', files)}
            error={errors.screenshots}
          />

          <Group position="right">
            <Button type="submit" color="blue" loading={processing}>
              Save
            </Button>
            <Button
              variant="default"
              onClick={() =>
                router.get(route('projects.bugs.index', project.id))
              }
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
