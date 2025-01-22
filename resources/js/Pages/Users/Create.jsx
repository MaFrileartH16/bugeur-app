import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router, useForm } from '@inertiajs/react';
import {
  Button,
  Container,
  Grid,
  PasswordInput,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconCornerDownLeft,
  IconKey,
  IconMail,
  IconPassword,
  IconUser,
} from '@tabler/icons-react';

const Create = ({ auth }) => {
  const { user } = auth;

  const form = useForm({
    full_name: '',
    email: '',
    role: '',
    password: '', // Auto-generated, but still kept for form state.
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

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    form.setData('full_name', value);

    const error = validateField('full_name', value);
    if (error) {
      form.setError('full_name', error);
    } else {
      form.clearErrors('full_name');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    form.setData('email', value);
    form.setData('password', value); // Automatically set password to match email.

    const error = validateField('email', value);
    if (error) {
      form.setError('email', error);
    } else {
      form.clearErrors('email');
    }
  };

  const handleRoleChange = (value) => {
    form.setData('role', value);

    const error = validateField('role', value);
    if (error) {
      form.setError('role', error);
    } else {
      form.clearErrors('role');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.post(route('users.store'), {
      onFinish: () => form.reset(),
    });
  };

  const fields = [
    {
      label: 'Full Name',
      value: form.data.full_name,
      onChange: handleFullNameChange,
      error: form.errors.full_name,
      placeholder: 'e.g., John Doe',
      description: 'Enter the user’s full name (e.g., first and last name).',
      leftSection: <IconUser />,
      component: TextInput,
    },
    {
      label: 'Email Address',
      value: form.data.email,
      onChange: handleEmailChange,
      error: form.errors.email,
      placeholder: 'e.g., johndoe@bugeur.id',
      description: 'Provide a valid email address ending with @bugeur.id.',
      leftSection: <IconMail />,
      component: TextInput,
    },
    {
      label: 'Role',
      value: form.data.role,
      onChange: handleRoleChange,
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
    {
      label: 'Password',
      value: form.data.password,
      error: form.errors.password,
      placeholder: 'Auto-generated based on email',
      description:
        'Password will be automatically generated from the email address.',
      leftSection: <IconPassword />,
      component: PasswordInput,
      readOnly: true,
      disabled: true,
    },
  ];

  const hasErrors = Object.keys(form.errors).length > 0;
  const isFormEmpty =
    !form.data.full_name || !form.data.email || !form.data.role;

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout title="Create User" user={user}>
        <Container flex={1} size="xl" w="100%" py={32}>
          <PageHeadings
            title="Create New User"
            description="Provide the necessary information to create a new user account and assign a role."
            breadcrumbs={[
              {
                label: 'Users',
                onClick: () => router.get(route('users.index', { page: 1 })),
              },
              {
                label: 'Create',
                onClick: () => router.get(route('users.create')),
              },
            ]}
          />

          <Grid gutter={32} justify="flex-end">
            {fields.map(
              (
                { component: Component, label, description, ...fieldProps },
                index,
              ) => (
                <Grid.Col span={{ base: 12 }} key={index}>
                  <Grid gutter={{ base: 8, sm: 0 }} align="start">
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
                Create User
              </Button>
            </Grid.Col>
          </Grid>
        </Container>
      </AppLayout>
    </form>
  );
};

export default Create;
