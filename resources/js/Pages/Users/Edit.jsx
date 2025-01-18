import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router, useForm } from '@inertiajs/react';
import {
  Button,
  Container,
  Grid,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconCornerDownLeft,
  IconKey,
  IconMail,
  IconUser,
} from '@tabler/icons-react';

const Edit = (props) => {
  const { user: authUser } = props.auth;
  const user = props.user;

  const form = useForm({
    full_name: user.full_name || '',
    email: user.email || '',
    role: user.role || '',
  });

  const validateField = (field, value) => {
    if (!value) {
      return `${field.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())} is required.`;
    }
    if (field === 'email' && !value.endsWith('@bugeur.id')) {
      return 'Email must use @bugeur.id.';
    }
    return null;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
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
    form.put(route('users.update', user.id));
  };

  const fields = [
    {
      label: 'Full Name',
      value: form.data.full_name,
      onChange: handleChange('full_name'),
      error: form.errors.full_name,
      placeholder: 'e.g., John Doe',
      description: 'Update the user’s full name (e.g., first and last name).',
      leftSection: <IconUser />,
      component: TextInput,
    },
    {
      label: 'Email Address',
      value: form.data.email,
      onChange: handleChange('email'),
      error: form.errors.email,
      placeholder: 'e.g., johndoe@bugeur.id',
      description: 'Provide a valid email address ending with @bugeur.id.',
      leftSection: <IconMail />,
      component: TextInput,
    },
    {
      label: 'Role',
      defaultValue: form.data.role.toLowerCase().replace(/\s+/g, '_'),
      onChange: handleChange('role'),
      error: form.errors.role,
      placeholder: 'Select user’s role',
      description: 'Assign the user a role: Project Manager, Developer, or QA.',
      leftSection: <IconKey />,
      component: Select,
      data: [
        { value: 'project_manager', label: 'Project Manager' },
        { value: 'developer', label: 'Developer' },
        { value: 'quality_assurance', label: 'Quality Assurance' },
      ],
    },
  ];

  const hasErrors = Object.keys(form.errors).length > 0;
  const isFormEmpty =
    !form.data.full_name || !form.data.email || !form.data.role;

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout title="Edit User" user={authUser}>
        <Container flex={1} size="xl" w="100%" py={32}>
          <PageHeadings
            title="Edit User"
            description="Make changes to the user's details, including their role and email address."
            breadcrumbs={[
              {
                label: 'Users',
                onClick: () => router.get(route('users.index')),
              },
              {
                label: 'Edit',
                onClick: () => router.get(route('users.edit', user.id)),
              },
            ]}
          />

          <Grid gutter={16} justify="flex-end">
            {fields.map(
              (
                { component: Component, label, description, ...fieldProps },
                index,
              ) => (
                <Grid.Col span={{ base: 12 }} key={index}>
                  <Grid gutter={{ base: 8, sm: 0 }} align="center">
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <Title order={5}>{label}</Title>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 8 }}>
                      <Component {...fieldProps} />
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
