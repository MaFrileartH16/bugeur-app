import {
  MultiSelect,
  Select,
  Textarea,
  TextInput,
} from '@/Components/index.jsx';
import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router, useForm } from '@inertiajs/react';
import { Button, Grid, Title } from '@mantine/core';
import {
  IconAlignJustified,
  IconCornerDownLeft,
  IconFolder,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';

const Edit = (props) => {
  console.log(props);
  const { user } = props.auth;
  const { project, managers, users } = props;

  const form = useForm({
    title: project.title || '',
    description: project.description || '',
    manager_id: project.manager_id || '',
    team_members: project.working_on.map((member) => member.id) || [],
  });

  const validateField = (field, value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return `${field
        .replace('_id', '')
        .replace('_', ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())} is required.`;
    }
    return null;
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    form.setData('title', value);

    const error = validateField('title', value);
    if (error) {
      form.setError('title', error);
    } else {
      form.clearErrors('title');
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    form.setData('description', value);

    const error = validateField('description', value);
    if (error) {
      form.setError('description', error);
    } else {
      form.clearErrors('description');
    }
  };

  const handleManagerChange = (value) => {
    form.setData('manager_id', value);

    const error = validateField('manager_id', value);
    if (error) {
      form.setError('manager_id', error);
    } else {
      form.clearErrors('manager_id');
    }
  };

  const handleTeamMembersChange = (value) => {
    form.setData('team_members', value);

    const error = validateField('team_members', value);
    if (error) {
      form.setError('team_members', error);
    } else {
      form.clearErrors('team_members');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const teamError = validateField('team_members', form.data.team_members);
    if (teamError) {
      form.setError('team_members', teamError);
      return;
    }

    form.put(
      route('projects.update', {
        project,
      }),
      {
        onFinish: () => form.reset(),
      },
    );
  };

  const validateCoverPhoto = (file) => {
    if (file && !['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      return 'Only PNG, JPEG, and JPG formats are allowed.';
    }
    if (file && file.size > 2 * 1024 * 1024) {
      return 'File size must not exceed 2 MB.';
    }
    return null;
  };

  const handleCoverPhotoChange = (file) => {
    const error = validateCoverPhoto(file);
    if (error) {
      form.setError('cover_photo', error);
      return;
    }
    form.setData('cover_photo', file);
    form.clearErrors('cover_photo');
  };

  const hasErrors = Object.keys(form.errors).length > 0;
  const isFormEmpty =
    !form.data.title ||
    !form.data.description ||
    !form.data.manager_id ||
    form.data.team_members.length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout title="Edit Project" user={user}>
        <PageHeadings
          title="Edit Project"
          description="Modify the details of the project to ensure it reflects the latest requirements."
          breadcrumbs={[
            {
              label: 'Projects',
              onClick: () => router.get(route('projects.index')),
            },
            {
              label: 'Edit',
              onClick: () => router.get(route('projects.edit', project.id)),
            },
          ]}
        />

        <Grid gutter={32} justify="flex-end">
          {/* Title Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={{ base: 8, sm: 0 }} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Title</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <TextInput
                  value={form.data.title}
                  onChange={handleTitleChange}
                  error={form.errors.title}
                  placeholder="Enter the project's title, e.g., Website Redesign"
                  leftSection={<IconFolder />}
                  description="Provide a concise and descriptive title for the project."
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Description Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={{ base: 8, sm: 0 }} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Description</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <Textarea
                  value={form.data.description}
                  onChange={handleDescriptionChange}
                  error={form.errors.description}
                  placeholder="Describe the project's objectives and scope"
                  leftSection={<IconAlignJustified />}
                  minRows={4}
                  description="Include key details and objectives to help the team understand
                  the project."
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Manager Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={{ base: 8, sm: 0 }} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Manager</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <Select
                  value={form.data.manager_id}
                  onChange={handleManagerChange}
                  error={form.errors.manager_id}
                  placeholder="Select a project manager"
                  leftSection={<IconUser />}
                  data={managers.map((manager) => ({
                    value: manager.id,
                    label: manager.full_name,
                  }))}
                  description="Assign a manager who will oversee the project."
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Team Members Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={{ base: 8, sm: 0 }} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Team Members</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <MultiSelect
                  value={form.data.team_members}
                  onChange={handleTeamMembersChange}
                  error={form.errors.team_members}
                  placeholder="Select team members"
                  leftSection={<IconUsers />}
                  data={users.map((member) => ({
                    value: member.id,
                    label: `${member.full_name} (${member.role})`,
                  }))}
                  description="Include at least one Developer and one Quality Assurance
                  member."
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Submit Button */}
          <Grid.Col span={{ base: 12, sm: 8 }} align="end">
            <Button
              type="submit"
              leftSection={<IconCornerDownLeft />}
              disabled={form.processing || hasErrors || isFormEmpty}
              loading={form.processing}
            >
              Save Changes
            </Button>
          </Grid.Col>
        </Grid>
      </AppLayout>
    </form>
  );
};

export default Edit;
