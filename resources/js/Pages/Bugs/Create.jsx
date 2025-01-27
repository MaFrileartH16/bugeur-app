import { Select, Textarea, TextInput } from '@/Components/index.jsx';
import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router, useForm } from '@inertiajs/react';
import { Button, Grid, Group, Text, Title } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {
  IconAlignJustified,
  IconBug,
  IconCornerDownLeft,
  IconPhoto,
  IconUpload,
  IconUser,
  IconX,
} from '@tabler/icons-react';

const Create = ({ project, users, auth }) => {
  const form = useForm({
    title: '',
    description: '',
    assignee_id: '',
    evidence_image: null,
  });
  console.log(form.data);
  // Handle change for "Title" field
  const handleTitleChange = (e) => {
    const value = e.target.value;
    form.setData('title', value);

    if (!value) {
      form.setError('title', 'Title is required.');
    } else {
      form.clearErrors('title');
    }
  };

  // Handle change for "Description" field
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    form.setData('description', value);

    if (!value) {
      form.setError('description', 'Description is required.');
    } else {
      form.clearErrors('description');
    }
  };

  // Handle change for "Assign To" field
  const handleAssigneeChange = (value) => {
    form.setData('assignee_id', value);

    if (!value) {
      form.setError('assignee_id', 'Assignee is required.');
    } else {
      form.clearErrors('assignee_id');
    }
  };

  // Handle change for Dropzone
  const handleDropzoneChange = (files) => {
    const file = files[0];
    form.setData('evidence_image', file);

    if (!file) {
      form.setError('evidence_image', 'Evidence image is required.');
    } else {
      form.clearErrors('evidence_image');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    form.post(route('projects.bugs.store', { project: project.id }));
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <AppLayout title="Create Bug" user={auth.user}>
        <PageHeadings
          title="Create New Bug"
          description="Provide the details to log a new bug in this project."
          breadcrumbs={[
            {
              label: 'Projects',
              onClick: () => router.get(route('projects.index')),
            },
            {
              label: project.title,
              onClick: () => router.get(route('projects.show', project.id)),
            },
            {
              label: 'Bugs',
              onClick: () => router.get(route('projects.bugs', project)),
            },
            {
              label: 'Create',
              onClick: () => router.get(route('projects.bugs.create', project)),
            },
          ]}
        />

        <Grid gutter={32} justify="flex-end">
          {/* Title Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={8} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Bug Title</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <TextInput
                  placeholder="Enter the bug title"
                  value={form.data.title}
                  onChange={handleTitleChange}
                  error={form.errors.title}
                  withAsterisk
                  leftSection={<IconBug />}
                  description="Provide a concise and clear title for the bug."
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Description Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={8} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Description</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <Textarea
                  placeholder="Describe the bug in detail"
                  value={form.data.description}
                  onChange={handleDescriptionChange}
                  error={form.errors.description}
                  minRows={4}
                  description="Include steps to reproduce, expected behavior, and any
                  relevant details."
                  leftSection={<IconAlignJustified />}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Assign To Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={8} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Assign To</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <Select
                  placeholder="Select a user to assign this bug"
                  value={form.data.assignee_id}
                  onChange={handleAssigneeChange}
                  data={users.map((user) => ({
                    value: user.id,
                    label: user.full_name,
                  }))}
                  error={form.errors.assignee_id}
                  leftSection={<IconUser />}
                  description="Choose a user responsible for addressing this bug."
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Evidence Image Dropzone */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={8} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Evidence Image</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <Dropzone
                  onDrop={handleDropzoneChange}
                  maxSize={5 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                >
                  <Group
                    justify="center"
                    gap="xl"
                    mih={220}
                    style={{ pointerEvents: 'none' }}
                  >
                    <Dropzone.Accept>
                      <IconUpload
                        size={52}
                        color="var(--mantine-color-blue-6)"
                        stroke={1.5}
                      />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX
                        size={52}
                        color="var(--mantine-color-red-6)"
                        stroke={1.5}
                      />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto
                        size={52}
                        color="var(--mantine-color-dimmed)"
                        stroke={1.5}
                      />
                    </Dropzone.Idle>

                    <div>
                      <Text size="xl" inline>
                        Drag images here or click to select files
                      </Text>
                      <Text size="sm" color="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not
                        exceed 5MB
                      </Text>
                    </div>
                  </Group>
                </Dropzone>
                {form.errors.evidence_image && (
                  <Text size="sm" color="red" mt={8}>
                    {form.errors.evidence_image}
                  </Text>
                )}
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Submit Button */}
          <Grid.Col span={{ base: 12, sm: 8 }} align="end">
            <Button
              type="submit"
              leftSection={<IconCornerDownLeft />}
              disabled={
                form.processing || !form.data.title || !form.data.description
              }
              loading={form.processing}
            >
              Create Bug
            </Button>
          </Grid.Col>
        </Grid>
      </AppLayout>
    </form>
  );
};

export default Create;
