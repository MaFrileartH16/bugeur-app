import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router, useForm } from '@inertiajs/react';
import {
  Button,
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

const Edit = (props) => {
  const { user: authUser } = props.auth;
  const user = props.user;

  const form = useForm({
    full_name: user.full_name || '',
    email: user.email || '',
    role: user.role.toLowerCase().replace(/\s+/g, '_') || '',
    password: '', // Password dapat diisi manual
  });

  const validateField = (field, value) => {
    if (field === 'email' && value && !value.endsWith('@bugeur.id')) {
      return 'Email must use @bugeur.id.';
    }
    return null;
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    form.setData('full_name', value);
    form.clearErrors('full_name');
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    form.setData('email', value);

    const error = validateField('email', value);
    if (error) {
      form.setError('email', error);
    } else {
      form.clearErrors('email');
    }
  };

  const handleRoleChange = (value) => {
    form.setData('role', value);
    form.clearErrors('role');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    form.setData('password', value);
    form.clearErrors('password');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hanya kirim data yang diisi
    const dataToUpdate = {};
    if (form.data.full_name) dataToUpdate.full_name = form.data.full_name;
    if (form.data.email) dataToUpdate.email = form.data.email;
    if (form.data.role) dataToUpdate.role = form.data.role;
    if (form.data.password) dataToUpdate.password = form.data.password;

    form.patch(route('users.update', user));
  };

  const hasErrors = Object.keys(form.errors).length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout
        title="Edit User"
        user={authUser}
        notification={props.notification}
      >
        <PageHeadings
          title="Edit User"
          description="Make changes to the user's details, including their role, email address, and password."
          breadcrumbs={[
            {
              label: 'Users',
              onClick: () => router.get(route('users.index', { page: 1 })),
            },
            {
              label: 'Edit',
              onClick: () => router.get(route('users.edit', user.id)),
            },
          ]}
        />

        <Grid gutter={32} justify="flex-end">
          {/* Full Name Input */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={{ base: 8, sm: 0 }} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Full Name</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <TextInput
                  value={form.data.full_name}
                  onChange={handleFullNameChange}
                  error={form.errors.full_name}
                  placeholder="Enter full name"
                  leftSection={<IconUser />}
                />
                <Text size="xs" color="dimmed" mt={8}>
                  The user's full name as it will appear in the system.
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Email Input */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={{ base: 8, sm: 0 }} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Email Address</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <TextInput
                  value={form.data.email}
                  onChange={handleEmailChange}
                  error={form.errors.email}
                  placeholder="Enter email address"
                  leftSection={<IconMail />}
                />
                <Text size="xs" color="dimmed" mt={8}>
                  Use a valid email address ending with @bugeur.id.
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Role Input */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={{ base: 8, sm: 0 }} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Role</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <Select
                  value={form.data.role}
                  onChange={handleRoleChange}
                  error={form.errors.role}
                  placeholder="Select a role"
                  leftSection={<IconKey />}
                  data={[
                    { value: 'project_manager', label: 'Project Manager' },
                    { value: 'developer', label: 'Developer' },
                    {
                      value: 'quality_assurance',
                      label: 'Quality Assurance',
                    },
                  ]}
                />
                <Text size="xs" color="dimmed" mt={8}>
                  Choose the role that best fits the user's responsibilities.
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Password Input */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={{ base: 8, sm: 0 }} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Password</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <PasswordInput
                  value={form.data.password}
                  onChange={handlePasswordChange}
                  error={form.errors.password}
                  placeholder="Enter new password"
                  leftSection={<IconPassword />}
                />
                <Text size="xs" color="dimmed" mt={8}>
                  Set a new password for the user.
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Submit Button */}
          <Grid.Col span={{ base: 12, sm: 8 }} align="end">
            <Button
              type="submit"
              leftSection={<IconCornerDownLeft />}
              disabled={form.processing || hasErrors}
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
