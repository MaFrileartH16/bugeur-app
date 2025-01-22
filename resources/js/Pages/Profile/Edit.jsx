import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { useForm } from '@inertiajs/react';
import {
  Avatar,
  Button,
  FileButton,
  Grid,
  Group,
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
  IconPhotoUp,
  IconUser,
} from '@tabler/icons-react';

const Edit = (props) => {
  const { user } = props.auth;
  const form = useForm({
    _method: 'put',
    avatar: user.avatar || '',
    full_name: user.full_name || '',
    email: user.email || '',
    password: '',
  });

  console.log(form.data);

  const validateAvatar = (file) => {
    if (file && !['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      return 'Only PNG, JPEG, and JPG formats are allowed.';
    }
    if (file && file.size > 2 * 1024 * 1024) {
      // 2 MB limit
      return 'File size must not exceed 2 MB.';
    }
    return null;
  };

  const handleAvatarChange = (file) => {
    const error = validateAvatar(file);
    if (error) {
      form.setError('avatar', error);
      return;
    }

    form.setData('avatar', file);
    form.clearErrors('avatar');
  };

  const validateEmail = (value) => {
    if (!value) return 'Email Address is required.';
    if (!value.endsWith('@bugeur.id')) return 'Email must use @bugeur.id.';
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
        title={props.title}
        user={user}
        notification={props.notification}
      >
        <PageHeadings
          title="Profile"
          description="Access and update your account details, including personal information and preferences."
        />

        <Grid gutter={16} justify="flex-end">
          {/* Avatar Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={8} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Avatar</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <Group align="flex-start" spacing="sm">
                  <Avatar
                    src={
                      form.data.avatar instanceof File
                        ? URL.createObjectURL(form.data.avatar)
                        : form.data.avatar
                    }
                    alt={form.data.full_name}
                    size={80}
                  />

                  <FileButton
                    onChange={handleAvatarChange}
                    accept="image/png,image/jpeg,image/jpg"
                  >
                    {(props) => (
                      <Button
                        variant="subtle"
                        {...props}
                        leftSection={<IconPhotoUp />}
                      >
                        Upload Photo
                      </Button>
                    )}
                  </FileButton>
                </Group>

                {form.errors.avatar && (
                  <Text color="red" size="sm">
                    {form.errors.avatar}
                  </Text>
                )}
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Full Name Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={8} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Full Name</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <TextInput
                  value={form.data.full_name}
                  placeholder="e.g., John Doe"
                  description="This is your full name as it appears on your profile. It cannot be edited."
                  leftSection={<IconUser />}
                  readOnly
                  disabled
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Role Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={8} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Role</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <TextInput
                  value={user.role}
                  placeholder="e.g., Project Manager"
                  description="Your assigned role within the system. This field is not editable."
                  leftSection={<IconKey />}
                  readOnly
                  disabled
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Email Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={8} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>Email Address</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <TextInput
                  value={form.data.email}
                  onChange={handleChangeEmail}
                  error={form.errors.email}
                  placeholder="e.g., johndoe@bugeur.id"
                  description="Your email address used for login and communication. It cannot be changed."
                  leftSection={<IconMail />}
                  readOnly
                  disabled
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Password Field */}
          <Grid.Col span={{ base: 12 }}>
            <Grid gutter={8} align="start">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Title order={5}>New Password</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <PasswordInput
                  value={form.data.password}
                  onChange={handleChangePassword}
                  error={form.errors.password}
                  placeholder="Leave this blank to keep your current password"
                  description="Enter a new password if you wish to update it. Otherwise, leave it blank."
                  leftSection={<IconPassword />}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Submit Button */}
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
      </AppLayout>
    </form>
  );
};

export default Edit;
