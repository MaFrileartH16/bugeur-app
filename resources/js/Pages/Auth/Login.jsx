import { PasswordInput } from '@/Components/PasswordInput.jsx';
import { TextInput } from '@/Components/TextInput.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { useForm } from '@inertiajs/react';
import {
  Box,
  Button,
  Center,
  Container,
  Stack,
  Text,
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

  const validateEmail = (value) => {
    if (!value) return 'Please enter your email address.';
    const pattern = /@bugeur\.id$/;
    if (!pattern.test(value)) return 'Email must end with @bugeur.id.';
    return null;
  };

  const validatePassword = (value) => {
    if (!value) return 'Please enter your password.';
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

  const submit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(form.data.email);
    const passwordError = validatePassword(form.data.password);

    if (emailError || passwordError) {
      form.setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    form.post(route('login'), {
      onFinish: () => form.clearErrors('password'),
    });
  };

  const areFieldsFilled = Object.values(form.data).every(
    (value) => value.trim() !== '',
  );

  const hasErrors = Object.keys(form.errors).length > 0;

  return (
    <form onSubmit={submit} aria-label="Login Form">
      <AppLayout title="Login" notification={props.notification}>
        <Center flex={1}>
          <Container flex={1} size="xs" px={16} py={16}>
            <Title order={2} component="h2" mb={8}>
              Login to Your Account
            </Title>
            <Text mb={32}>
              Access your account by logging in with your registered email and
              password.
            </Text>

            <Stack gap={16} component="section" aria-labelledby="login-fields">
              <Box>
                <Text fw={500}>Email Address</Text>

                <TextInput
                  value={form.data.email}
                  onChange={handleChangeEmail}
                  error={form.errors.email}
                  placeholder="Enter your email address" // Placeholder best practice
                  description="Use a valid email address ending with @bugeur.id."
                  leftSection={<IconMail />}
                  autoFocus
                  autoComplete="email"
                />
              </Box>

              <Box>
                <Text fw={500}>Password</Text>

                <PasswordInput
                  id="password"
                  value={form.data.password}
                  onChange={handleChangePassword}
                  error={form.errors.password}
                  placeholder="Enter your password"
                  leftSection={<IconPassword />}
                />
              </Box>
            </Stack>

            <Button
              fullWidth
              type="submit"
              leftSection={
                !areFieldsFilled || hasErrors ? <IconLock /> : <IconLockOpen2 />
              }
              loading={form.processing}
              disabled={!areFieldsFilled || hasErrors}
              aria-label="Submit Login"
              mt={16}
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
