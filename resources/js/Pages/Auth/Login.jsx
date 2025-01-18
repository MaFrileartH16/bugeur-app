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
import { useState } from 'react';

const Login = (props) => {
  const form = useForm({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateField = (field, value) => {
    const validators = {
      email: {
        required: 'Email is required.',
        pattern: /^[a-zA-Z0-9._%+-]+@bugeur\.id$/,
        patternError: 'Email must use @bugeur.id.',
      },
      password: {
        required: 'Password is required.',
      },
    };

    const rules = validators[field];
    if (!rules) return null;

    if (!value) return rules.required;
    if (rules.pattern && !rules.pattern.test(value)) return rules.patternError;

    return null;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    form.setData(field, value);

    const error = validateField(field, value);
    error ? form.setError(field, error) : form.clearErrors(field);
  };

  const submit = (e) => {
    e.preventDefault();

    const errors = {};
    Object.keys(form.data).forEach((field) => {
      const error = validateField(field, form.data[field]);
      if (error) errors[field] = error;
    });

    if (Object.keys(errors).length > 0) {
      form.setErrors(errors);
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

  const fields = [
    {
      label: 'Email Address',
      value: form.data.email,
      onChange: handleChange('email'),
      error: form.errors.email,
      placeholder: 'username@bugeur.id',
      leftSection: <IconMail />,
      component: TextInput,
    },
    {
      label: 'Password',
      type: showPassword ? 'text' : 'password',
      value: form.data.password,
      onChange: handleChange('password'),
      error: form.errors.password,
      placeholder: '********',
      leftSection: <IconPassword />,
      component: PasswordInput,
    },
  ];

  return (
    <form onSubmit={submit}>
      <AppLayout title={props.title} notification={props.notification}>
        <Center flex={1}>
          <Container flex={1} size="xs">
            <Title order={1}>Login to account</Title>

            <Stack my={16}>
              {fields.map(({ component: Component, ...restField }, index) => (
                <Component key={index} {...restField} />
              ))}
            </Stack>

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
