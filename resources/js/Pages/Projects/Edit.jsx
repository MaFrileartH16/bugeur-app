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

const Edit = (props) => {
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

  const handleChange = (field) => (e) => {
    const value = Array.isArray(e) ? e : e.target.value;
    form.setData(field, value);

    const error = validateField(field, value);
    if (error) {
      form.setError(field, error);
    } else {
      form.clearErrors(field);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const teamError = validateField('team_members', form.data.team_members);
    if (teamError) {
      form.setError('team_members', teamError);
      return;
    }

    form.put(route('projects.update', project.id), {
      onFinish: () => form.reset(),
    });
  };

  const fields = [
    {
      label: 'Title',
      value: form.data.title,
      onChange: handleChange('title'),
      error: form.errors.title,
      placeholder: "Enter the project's title, e.g., Website Redesign",
      description: 'Provide a concise and descriptive title for the project.',
      leftSection: <IconFolder />,
      component: TextInput,
    },
    {
      label: 'Description',
      value: form.data.description,
      onChange: handleChange('description'),
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
      value: form.data.manager_id,
      onChange: handleChange('manager_id'),
      error: form.errors.manager_id,
      placeholder: 'Select a project manager',
      description: 'Assign a manager who will oversee the project.',
      leftSection: <IconUser />,
      component: Select,
      data: managers.map((manager) => ({
        value: manager.id,
        label: manager.full_name,
      })),
    },
    {
      label: 'Team Members',
      value: form.data.team_members,
      onChange: handleChange('team_members'),
      error: form.errors.team_members,
      placeholder: 'Select team members',
      description:
        'Include at least one Developer and one Quality Assurance member.',
      leftSection: <IconUsers />,
      component: MultiSelect,
      data: users.map((user) => ({
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
      <AppLayout title="Edit Project" user={user}>
        <Container flex={1} size="xl" w="100%" py={32}>
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

          <Grid gutter={16} justify="flex-end">
            {fields.map(
              (
                { component: Component, label, description, ...restField },
                index,
              ) => (
                <Grid.Col key={index} span={{ base: 12 }}>
                  <Grid gutter={{ base: 8, sm: 0 }} align="center">
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
                Save Changes
              </Button>
            </Grid.Col>
          </Grid>
        </Container>
      </AppLayout>
    </form>
  );
};

export default Edit;
