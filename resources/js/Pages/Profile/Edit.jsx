import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router, useForm } from '@inertiajs/react';
import {
  Button,
  Container,
  Grid,
  PasswordInput,
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

const Edit = (props) => {
  const { user } = props.auth;

  const form = useForm({
    full_name: user.full_name || '',
    email: user.email || '',
    password: '',
  });

  const validateField = (field, value) => {
    if (field === 'password' && !value) {
      return null; // Skip validation if password is empty
    }

    if (!value) {
      const formattedField = field
        .replace('_', ' ')
        .replace(/^\w/, (c) => c.toUpperCase());
      return `${formattedField} is required.`;
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
    form.put(route('profile.update', user), {
      onFinish: () => form.reset('password'),
    });
  };

  const fields = [
    {
      label: 'Full Name',
      value: form.data.full_name,
      onChange: handleChange('full_name'),
      error: form.errors.full_name,
      placeholder: 'e.g., John Doe',
      description:
        'This is your full name as it appears on your profile. It cannot be edited.',
      icon: <IconUser />,
      component: TextInput,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Role',
      value: user.role,
      placeholder: 'e.g., Project Manager',
      description:
        'Your assigned role within the system. This field is not editable.',
      icon: <IconKey />,
      component: TextInput,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Email Address',
      value: form.data.email,
      onChange: handleChange('email'),
      error: form.errors.email,
      placeholder: 'e.g., johndoe@bugeur.id',
      description:
        'Your email address used for login and communication. It cannot be changed.',
      icon: <IconMail />,
      component: TextInput,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'New Password',
      value: form.data.password,
      onChange: handleChange('password'),
      error: form.errors.password,
      placeholder: 'Leave this blank to keep your current password',
      description:
        'Enter a new password if you wish to update it. Otherwise, leave it blank.',
      icon: <IconPassword />,
      component: PasswordInput,
    },
  ];

  const hasErrors = Object.keys(form.errors).length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout title={props.title} user={user}>
        <Container flex={1} size="xl" w="100%" py={32}>
          <PageHeadings
            title="Profile"
            description="Access and update your account details, including personal information and preferences."
            breadcrumbs={[
              {
                label: 'Dashboard',
                onClick: () => router.get(route('dashboard')),
              },
              {
                label: 'Profile',
                onClick: () => router.get(route('profile.edit')),
              },
            ]}
          />

          <Grid gutter={16} justify="flex-end">
            {fields.map((field, index) => {
              const Component = field.component;
              return (
                <Grid.Col key={index} span={{ base: 12 }}>
                  <Grid gutter={8} align="center">
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <Title order={5}>{field.label}</Title>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 8 }}>
                      <Component
                        leftSection={field.icon}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        error={field.error}
                        readOnly={field.readOnly || false}
                        disabled={field.disabled || false}
                      />
                      {field.description && (
                        <Text size="sm" c="ghost" mt={8}>
                          {field.description}
                        </Text>
                      )}
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              );
            })}

            <Grid.Col span={{ base: 12, sm: 8, smOffset: 4 }}>
              <Button
                type="submit"
                fullWidth
                leftSection={<IconCornerDownLeft />}
                disabled={form.processing || hasErrors}
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
