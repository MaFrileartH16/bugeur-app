import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { useForm } from '@inertiajs/react';
import {
  Button,
  Container,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { IconKey, IconMail, IconPassword, IconUser } from '@tabler/icons-react';

const EditProfile = (props) => {
  const { user } = props.auth;

  const form = useForm({
    full_name: user.full_name || '',
    email: user.email || '',
    password: '',
  });

  // Validation logic
  const validateField = (field, value) => {
    switch (field) {
      case 'full_name':
        if (!value) return 'Full name is required.';
        if (value.split(' ').length < 2)
          return 'Please enter at least two words.';
        return null;

      case 'email':
        if (!value) return 'Email is required.';
        if (!/\S+@\S+\.\S+/.test(value))
          return 'Please enter a valid email address.';
        return null;

      case 'password':
        if (value && value.length < 8)
          return 'Password must be at least 8 characters.';
        return null;

      default:
        return null;
    }
  };

  const handleChange = (field) => (e) => {
    let value = e.target.value;

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

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout title={props.title} user={user}>
        <Container flex={1} size="xl" w="100%">
          <Title my={32}>{props.title || 'Edit Profile'}</Title>

          <Stack my={32}>
            <TextInput
              leftSection={<IconUser />}
              label="Full Name"
              placeholder="Your Full Name"
              value={form.data.full_name}
              onChange={handleChange('full_name')}
              error={form.errors.full_name}
            />

            <TextInput
              label="Role"
              leftSection={<IconKey />}
              placeholder="Your Role"
              value={user.role}
              readOnly
              disabled
            />

            <TextInput
              leftSection={<IconMail />}
              label="Email Address"
              placeholder="username@bugeur.id"
              value={form.data.email}
              onChange={handleChange('email')}
              error={form.errors.email}
            />

            <PasswordInput
              leftSection={<IconPassword />}
              label="New Password"
              placeholder="Leave blank to keep current password"
              value={form.data.password}
              onChange={handleChange('password')}
              error={form.errors.password}
            />
          </Stack>

          <Stack>
            <Button type="submit" disabled={form.processing}>
              Save Changes
            </Button>
          </Stack>
        </Container>
      </AppLayout>
    </form>
  );
};

export default EditProfile;
