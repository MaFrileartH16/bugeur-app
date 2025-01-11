import { GuestLayout } from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';
import {
  Button,
  Center,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';

const Login = (props) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  console.log(data);

  return (
    <form onSubmit={submit}>
      <GuestLayout title={props.title}>
        <Center flex={1}>
          <Stack>
            <Title order={1}>Login</Title>

            <TextInput
              label="Email Address"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={errors.email}
            />

            {/* Password Field */}
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              error={errors.password}
            />

            <Button type="submit" color="blue" loading={processing}>
              Login
            </Button>
          </Stack>
        </Center>
      </GuestLayout>
    </form>
  );
};

export default Login;
