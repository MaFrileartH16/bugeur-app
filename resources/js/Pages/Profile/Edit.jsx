import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { PasswordInput } from '@/Components/PasswordInput.jsx';
import { TextInput } from '@/Components/TextInput.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { useForm } from '@inertiajs/react';
import {
  Avatar,
  Button,
  FileButton,
  Grid,
  Group,
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

const Edit = (props) => {
  const { user } = props.auth;
  const form = useForm({
    _method: 'put',
    profile_photo: user.profile_photo_path || '',
    full_name: user.full_name || '',
    email: user.email || '',
    password: '',
  });

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

  const validateEmail = (value) => {
    if (!value) return 'Email is required.';
    if (!value.endsWith('@bugeur.id')) return 'Email must end with @bugeur.id.';
    return null;
  };

  const validatePassword = (value) => {
    if (value && value.length < 8)
      return 'Password must be at least 8 characters.';
    return null;
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    form.setData('email', value);
    const error = validateEmail(value);
    error ? form.setError('email', error) : form.clearErrors('email');
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;
    form.setData('password', value);
    const error = validatePassword(value);
    error ? form.setError('password', error) : form.clearErrors('password');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.post(route('profile.update', user), {
      onFinish: () => form.reset('password'),
    });
  };

  const hasErrors = Object.keys(form.errors).length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout
        title="Edit Profile"
        user={user}
        notification={props.notification}
      >
        <PageHeadings
          title="Edit Profile"
          description="Update your profile details."
        />

        <Grid gutter={32} justify="flex-end">
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
                  <Text c="red" size="sm">
                    {form.errors.profile_photo}
                  </Text>
                )}
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={{ base: 12 }}>
            <Grid align="start" gutter={0}>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Full Name</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <TextInput
                  value={form.data.full_name}
                  placeholder="Enter your full name"
                  description="Your name cannot be changed. Contact support if you need to update it."
                  leftSection={<IconUser />}
                  readOnly
                  disabled
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={{ base: 12 }}>
            <Grid align="start" gutter={0}>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Role</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <TextInput
                  value={user.role}
                  placeholder="Your role"
                  description="This is your system role and cannot be changed."
                  leftSection={<IconKey />}
                  readOnly
                  disabled
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={{ base: 12 }}>
            <Grid align="start" gutter={0}>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Email</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <TextInput
                  value={form.data.email}
                  onChange={handleChangeEmail}
                  error={form.errors.email}
                  placeholder="example@bugeur.id"
                  description="Your email address is tied to your account and cannot be changed."
                  leftSection={<IconMail />}
                  readOnly
                  disabled
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={{ base: 12 }}>
            <Grid align="start" gutter={0}>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>New Password</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <PasswordInput
                  value={form.data.password}
                  onChange={handleChangePassword}
                  error={form.errors.password}
                  placeholder="Enter a new password"
                  description="Password must be at least 8 characters long."
                  leftSection={<IconPassword />}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

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
