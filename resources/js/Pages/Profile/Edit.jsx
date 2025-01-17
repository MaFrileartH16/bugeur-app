import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { useForm } from '@inertiajs/react';
import {
  Button,
  Container,
  Grid,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { IconKey, IconMail, IconPassword, IconUser } from '@tabler/icons-react';

const Edit = (props) => {
  const { user } = props.auth;

  const form = useForm({
    full_name: user.full_name || '',
    email: user.email || '',
    password: '',
  });

  const validateField = (field, value) => {
    if (field === 'password' && !value) {
      return null; // Tidak ada validasi untuk password jika kosong
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

  const fields = [
    {
      label: 'Full Name',
      value: form.data.full_name,
      onChange: handleChange('full_name'),
      error: form.errors.full_name,
      placeholder: 'Your Full Name',
      icon: <IconUser />,
      component: TextInput,
      readOnly: true, // Tidak bisa diubah
      disabled: true, // Tidak bisa diubah
    },
    {
      label: 'Role',
      value: user.role,
      placeholder: 'Your Role',
      icon: <IconKey />,
      component: TextInput,
      readOnly: true, // Tidak bisa diubah
      disabled: true, // Tidak bisa diubah
    },
    {
      label: 'Email Address',
      value: form.data.email,
      onChange: handleChange('email'),
      error: form.errors.email,
      placeholder: 'Enter your email address (e.g., username@bugeur.id)',
      icon: <IconMail />,
      component: TextInput,
      readOnly: true, // Tidak bisa diubah
      disabled: true, // Tidak bisa diubah
    },
    {
      label: 'New Password',
      value: form.data.password,
      onChange: handleChange('password'),
      error: form.errors.password,
      placeholder: 'Leave blank to keep current password',
      icon: <IconPassword />,
      component: PasswordInput,
    },
  ];

  const hasErrors = Object.keys(form.errors).length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout title={props.title} user={user}>
        <Container flex={1} size="xl" w="100%" py={32}>
          <Title mb={32}>{props.title}</Title>

          <Grid gutter={16} justify="flex-end">
            {fields.map((field, index) => (
              <Grid.Col key={index} span={{ base: 12 }}>
                <Grid gutter={8} align="center">
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Title order={5}>{field.label}</Title>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 8 }}>
                    <field.component
                      leftSection={field.icon}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={field.onChange}
                      error={field.error}
                      readOnly={field.readOnly || false}
                      disabled={field.disabled || false}
                    />
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            ))}

            <Grid.Col span={{ base: 12, sm: 8, smOffset: 4 }}>
              <Button
                type="submit"
                fullWidth
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
