import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { useForm } from '@inertiajs/react';
import {
  Button,
  Container,
  Grid,
  Select,
  TextInput,
  Title,
} from '@mantine/core';
import { IconKey, IconMail, IconUser } from '@tabler/icons-react';

const Edit = (props) => {
  const { user: authUser } = props.auth;

  // Data pengguna yang akan diedit
  const user = props.user;

  // Isi formulir dengan data pengguna
  const form = useForm({
    full_name: user.full_name || '',
    email: user.email || '',
    role: user.role || '',
    password: '', // Password tidak perlu diubah
  });

  const validateField = (field, value) => {
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
    let value = e.target ? e.target.value : e;

    // Transformasi untuk Full Name dan Email
    if (field === 'full_name') {
      value = value
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' ');
    } else if (field === 'email') {
      value = value.replace(/\s+/g, '').toLowerCase(); // Hapus spasi dan ubah ke lowercase
    }

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
    form.put(route('users.update', user.id), {
      onFinish: () => form.reset('password'),
    });
  };

  const isFormEmpty =
    !form.data.full_name || !form.data.email || !form.data.role;

  const fields = [
    {
      label: 'Full Name',
      value: form.data.full_name,
      onChange: handleChange('full_name'),
      error: form.errors.full_name,
      placeholder: "Enter the user's full name",
      leftSection: <IconUser />,
      component: TextInput,
    },
    {
      label: 'Email Address',
      value: form.data.email,
      onChange: handleChange('email'),
      error: form.errors.email,
      placeholder: "Enter the user's email address (e.g., username@bugeur.id)",
      leftSection: <IconMail />,
      component: TextInput,
    },
    {
      label: 'Role',
      defaultValue: form.data.role.toLowerCase().replace(/ /g, '_'),
      onChange: handleChange('role'),
      error: form.errors.role,
      placeholder: "Choose the user's role",
      leftSection: <IconKey />,
      component: Select,
      data: [
        { value: 'project_manager', label: 'Project Manager' },
        { value: 'developer', label: 'Developer' },
        { value: 'quality_assurance', label: 'Quality Assurance' },
      ],
    },
  ];

  const hasErrors = Object.keys(form.errors).length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <AppLayout title={props.title} user={authUser}>
        <Container flex={1} size="xl" w="100%" py={32}>
          <Title mb={32}>{props.title}</Title>

          <Grid gutter={16} justify="flex-end">
            {fields.map(
              ({ component: Component, label, ...restField }, index) => (
                <Grid.Col key={index} span={{ base: 12 }}>
                  <Grid gutter={{ base: 8, sm: 0 }} align="center">
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <Title order={5}>{label}</Title>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 8 }}>
                      <Component {...restField} />
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              ),
            )}

            <Grid.Col span={{ base: 12, sm: 8, smOffset: 4 }}>
              <Button
                type="submit"
                fullWidth
                disabled={form.processing || hasErrors || isFormEmpty}
                loading={form.processing}
              >
                Update User
              </Button>
            </Grid.Col>
          </Grid>
        </Container>
      </AppLayout>
    </form>
  );
};

export default Edit;
