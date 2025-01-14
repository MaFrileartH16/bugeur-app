import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { useForm } from '@inertiajs/react';
import {
  Button,
  Center,
  Container,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconLock,
  IconLockOpen2,
  IconMail,
  IconPassword,
} from '@tabler/icons-react';

const Login = (props) => {
  const form = useForm({
    email: '',
    password: '',
  });

  // Client-side validation
  const validateField = (field, value) => {
    switch (field) {
      case 'email':
        if (!value) return 'Email is required.';
        if (!/\S+@\S+\.\S+/.test(value))
          return 'Please enter a valid email address.';
        return null;

      case 'password':
        if (!value) return 'Password is required.';
        if (value.length < 6) return 'Password must be at least 6 characters.';
        return null;

      default:
        return null;
    }
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

  const submit = (e) => {
    e.preventDefault();

    form.post(route('login'), {
      onFinish: () => form.clearErrors('password'),
    });
  };

  const areFieldsFilled = Object.values(form.data).every(
    (value) => value.trim() !== '',
  );

  const hasErrors = Object.keys(form.errors).length > 0;

  return (
    <form onSubmit={submit}>
      <AppLayout title={props.title}>
        <Center flex={1}>
          <Container flex={1} size="xs">
            <Title order={1}>Login to account</Title>

            <Stack my={32}>
              <TextInput
                leftSection={<IconMail />}
                label="Email Address"
                placeholder="username@bugeur.id"
                value={form.data.email}
                onChange={handleChange('email')}
                error={form.errors.email}
              />

              {/* Password Field */}
              <PasswordInput
                leftSection={<IconPassword />}
                label="Password"
                placeholder="********"
                value={form.data.password}
                onChange={handleChange('password')}
                error={form.errors.password}
              />
            </Stack>
            {/* Button is disabled if fields are empty or there are errors */}
            <Button
              fullWidth
              type="submit"
              leftSection={
                !areFieldsFilled || hasErrors ? <IconLock /> : <IconLockOpen2 />
              }
              loading={form.processing}
              disabled={!areFieldsFilled || hasErrors}
            >
              Login
            </Button>
          </Container>
        </Center>
      </AppLayout>
    </form>
  );
};

export default Login;
