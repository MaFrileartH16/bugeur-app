import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router, useForm } from '@inertiajs/react';
import {
  Button,
  Container,
  Grid,
  MultiSelect,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconAlignJustified,
  IconCornerDownLeft,
  IconFolder,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';

const Create = (props) => {
  const { user } = props.auth;

  const form = useForm({
    title: '',
    description: '',
    manager_id: '',
    team_members: [],
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

    form.post(route('projects.store'), {
      onFinish: () => form.reset(),
    });
  };

  const fields = [
    {
      label: 'Title',
      value: form.data.title,
      onChange: handleTitleChange,
      error: form.errors.title,
      placeholder: "Enter the project's title, e.g., Website Redesign",
      description: 'Provide a concise and descriptive title for the project.',
      leftSection: <IconFolder />,
      component: TextInput,
    },
    {
      label: 'Description',
      value: form.data.description,
      onChange: handleDescriptionChange,
      error: form.errors.description,
      placeholder: "Describe the project's objectives and scope",
      description:
        'Include key details and objectives to help the team understand the project.',
      component: Textarea,
      leftSection: <IconAlignJustified />,
      minRows: 4,
    },
    {
      label: 'Manager',
      defaultValue: form.data.manager_id,
      onChange: handleManagerChange,
      error: form.errors.manager_id,
      placeholder: 'Select a project manager',
      description: 'Assign a manager who will oversee the project.',
      leftSection: <IconUser />,
      component: Select,
      data: props.managers.map((manager) => ({
        value: manager.id,
        label: manager.full_name,
      })),
    },
    {
      label: 'Team Members',
      value: form.data.team_members,
      onChange: handleTeamMembersChange,
      error: form.errors.team_members,
      placeholder: 'Select team members',
      description:
        'Include at least one Developer and one Quality Assurance member.',
      leftSection: <IconUsers />,
      component: MultiSelect,
      data: props.users.map((user) => ({
        value: user.id,
        label: `${user.full_name} (${user.role})`,
      })),
    },
  ];

  const hasErrors = Object.keys(form.errors).length > 0;
  const isFormEmpty =
    !form.data.title ||
    !form.data.description ||
    !form.data.manager_id ||
    form.data.team_members.length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout title="Create Project" user={user}>
        <Container flex={1} size="xl" w="100%" py={32}>
          <PageHeadings
            title="Create New Project"
            description="Provide the necessary details to start and define a new project within the system."
            breadcrumbs={[
              {
                label: 'Projects',
                onClick: () => router.get(route('projects.index')),
              },
              {
                label: 'Create',
                onClick: () => router.get(route('projects.create')),
              },
            ]}
          />

          <Grid gutter={32} justify="flex-end">
            {fields.map(
              (
                { component: Component, label, description, ...restField },
                index,
              ) => (
                <Grid.Col key={index} span={{ base: 12 }}>
                  <Grid gutter={{ base: 8, sm: 0 }} align="start">
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <Title order={5}>{label}</Title>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 8 }}>
                      <Component {...restField} />
                      {description && (
                        <Text size="xs" color="dimmed" mt={8}>
                          {description}
                        </Text>
                      )}
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              ),
            )}

            <Grid.Col span={{ base: 12, sm: 8, smOffset: 4 }}>
              <Button
                type="submit"
                fullWidth
                leftSection={<IconCornerDownLeft />}
                disabled={form.processing || hasErrors || isFormEmpty}
                loading={form.processing}
              >
                Create Project
              </Button>
            </Grid.Col>
          </Grid>
        </Container>
      </AppLayout>
    </form>
  );
};

export default Create;
