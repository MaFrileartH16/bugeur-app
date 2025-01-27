import { PasswordInput, TextInput } from '@/Components/index.jsx';
import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router, useForm } from '@inertiajs/react';
import {
  Avatar,
  Button,
  FileButton,
  Grid,
  Group,
  Select,
  Text,
  Title,
} from '@mantine/core';
import {
  IconCornerDownLeft,
  IconKey,
  IconMail,
  IconPassword,
  IconUpload,
  IconUser,
} from '@tabler/icons-react';

const Create = ({ auth }) => {
  const { user } = auth;

  const form = useForm({
    profile_photo: '',
    full_name: '',
    email: '',
    role: '',
    password: '', // Auto-generated, but still kept for form state.
  });

  console.log(form.data);

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

  const validateProfilePhoto = (file) => {
    if (file && !['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      return 'Only PNG, JPEG, and JPG formats are allowed.';
    }
    if (file && file.size > 2 * 1024 * 1024) {
      return 'File size must not exceed 2 MB.';
    }
    return null;
  };

  const handleProfilePhotoChange = (file) => {
    const error = validateProfilePhoto(file);
    if (error) {
      form.setError('profile_photo', error);
      return;
    }
    form.setData('profile_photo', file);
    form.clearErrors('profile_photo');
  };

  const hasErrors = Object.keys(form.errors).length > 0;
  const isFormEmpty =
    !form.data.full_name || !form.data.email || !form.data.role;

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout title="Create New User" user={user}>
        <PageHeadings
          title="Create a New User"
          description="Fill in the details below to create a new user account."
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
          {/* Full Name Input */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={8} align="start">
              {/* Hapus gutter di sini */}
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Profile Photo</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <Group align="flex-start" spacing="sm">
                  <Avatar
                    src={
                      form.data.profile_photo instanceof File
                        ? URL.createObjectURL(form.data.profile_photo)
                        : form.data.profile_photo
                    }
                    alt="Profile Photo"
                    size={80}
                  />

                  <FileButton
                    onChange={handleProfilePhotoChange}
                    accept="image/png,image/jpeg,image/jpg"
                  >
                    {(props) => (
                      <Button
                        variant="subtle"
                        {...props}
                        leftSection={<IconUpload />}
                      >
                        {form.data.profile_photo ? 'Change' : 'Upload'} Profile
                        Photo
                      </Button>
                    )}
                  </FileButton>
                </Group>
                {form.errors.profile_photo && (
                  <Text color="red" size="sm">
                    {form.errors.profile_photo}
                  </Text>
                )}
              </Grid.Col>
            </Grid>
          </Grid.Col>

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
                  description="The user's full name as it will appear in the system."
                />
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
                  description="  Use a valid email address ending with @bugeur.id."
                />
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
                  description="Choose the role that best fits the user's responsibilities."
                  data={[
                    { value: 'Project Manager', label: 'Project Manager' },
                    { value: 'Developer', label: 'Developer' },
                    {
                      value: 'Quality Assurance',
                      label: 'Quality Assurance',
                    },
                  ]}
                />
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
                  placeholder="Auto-generated"
                  leftSection={<IconPassword />}
                  readOnly
                  disabled
                  description="The password will be automatically generated from the email."
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
              Create User
            </Button>
          </Grid.Col>
        </Grid>
      </AppLayout>
    </form>
  );
};

export default Create;
