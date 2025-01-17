import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { useForm } from '@inertiajs/react';
import {
  Button,
  Container,
  Grid,
  MultiSelect,
  Select,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconAlignJustified,
  IconFolder,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';

const Edit = (props) => {
  console.log(props);
  const { user } = props.auth;
  const { project, managers, users } = props;

  const form = useForm({
    title: project.title,
    description: project.description,
    manager_id: project.manager_id,
    team_members: project.working_on.map((member) => member.id), // Isi awal dengan anggota tim yang sudah ada
  });

  const validateTeamMembers = (selectedMembers) => {
    const selectedRoles = users.filter((user) =>
      selectedMembers.includes(user.id),
    );

    const hasDeveloper = selectedRoles.some(
      (user) => user.role === 'Developer',
    );
    const hasQualityAssurance = selectedRoles.some(
      (user) => user.role === 'Quality Assurance',
    );

    if (!hasDeveloper && !hasQualityAssurance) {
      return 'At least one Developer and one Quality Assurance are required.';
    }

    if (!hasDeveloper) {
      return 'At least one Developer is required.';
    }

    if (!hasQualityAssurance) {
      return 'At least one Quality Assurance is required.';
    }

    return null;
  };

  const validateField = (field, value) => {
    if (field === 'team_members') {
      return validateTeamMembers(value);
    }

    if (!value || (Array.isArray(value) && value.length === 0)) {
      const formattedField = field
        .replace('_', ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return `${formattedField} is required.`;
    }

    return null;
  };

  const handleChange = (field) => (e) => {
    const value = e.target ? e.target.value : e;
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

  const isFormEmpty =
    !form.data.title ||
    !form.data.description ||
    !form.data.manager_id ||
    form.data.team_members.length === 0;

  const fields = [
    {
      label: 'Title',
      value: form.data.title,
      onChange: handleChange('title'),
      error: form.errors.title,
      placeholder: "Enter the project's title",
      leftSection: <IconFolder />,
      component: TextInput,
    },
    {
      label: 'Description',
      value: form.data.description,
      onChange: handleChange('description'),
      error: form.errors.description,
      placeholder: "Enter the project's description",
      component: Textarea,
      leftSection: <IconAlignJustified />,
      minRows: 4,
    },
    {
      label: 'Manager',
      defaultValue: form.data.manager_id,
      onChange: handleChange('manager_id'),
      error: form.errors.manager_id,
      placeholder: 'Select a manager',
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
      leftSection: <IconUsers />,
      component: MultiSelect,
      data: users.map((user) => ({
        value: user.id,
        label: `${user.full_name} (${user.role})`,
      })),
      nothingFoundMessage: 'No team members found.',
    },
  ];

  const hasErrors = Object.keys(form.errors).length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout title={props.title} user={user}>
        <Container flex={1} size="xl" w="100%" py={32}>
          <Title mb={32}>{props.title}</Title>

          <Grid gutter={16} justify="flex-end">
            {fields.map(
              ({ component: Component, label, ...restField }, index) => (
                <Grid.Col key={index} span={{ base: 12 }}>
                  <Grid gutter={{ base: 8, sm: 0 }} align="center">
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <Title order={5}>{label}</Title>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 8 }}>
                      <Component {...restField} />
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              ),
            )}

            <Grid.Col span={{ base: 12, sm: 8, smOffset: 4 }}>
              <Button
                type="submit"
                fullWidth
                disabled={form.processing || hasErrors || isFormEmpty}
                loading={form.processing}
              >
                Update Project
              </Button>
            </Grid.Col>
          </Grid>
        </Container>
      </AppLayout>
    </form>
  );
};

export default Edit;
