import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { Blockquote, Container, Grid, Title } from '@mantine/core';
import { IconBug, IconFolder, IconUser } from '@tabler/icons-react';

const Dashboard = (props) => {
  // Data dari props
  const totalUsers = props.total_users || 0; // Hanya untuk admin
  const totalProjects = props.total_projects || 0;
  const totalBugs = props.total_bugs || 0;
  const authUser = props.auth.user;

  // Data untuk Blockquote
  const data = [
    {
      color: 'green',
      label: 'Total Projects',
      value: totalProjects,
      icon: <IconFolder size={24} />,
    },
    {
      color: 'orange',
      label: 'Total Bugs',
      value: totalBugs,
      icon: <IconBug size={24} />,
    },
  ];

  // Tambahkan data admin jika pengguna adalah admin
  if (authUser.role === 'Admin') {
    data.unshift({
      color: 'blue',
      label: 'Total Users',
      value: totalUsers,
      icon: <IconUser size={24} />,
    });
  }

  return (
    <AppLayout title="Dashboard" user={authUser}>
      <Container flex={1} size="xl" w="100%" my={32}>
        <Title mb={32}>Dashboard</Title>

        {/* Ringkasan dengan Blockquote menggunakan looping */}
        <Grid gutter="lg" grow px={20} py={24}>
          {data.map((item, index) => (
            <Grid.Col
              key={index}
              span={{
                base: 12, // Full width for extra small screens
                sm: 6, // Two columns for small screens
                md: 4, // Three columns for medium screens
                lg: authUser.role === 'Admin' ? 3 : 6, // Admin: 4 per row; Non-admin: 2 per row
              }}
            >
              <Blockquote color={item.color} icon={item.icon} p={32}>
                <Title order={5}>{item.label}</Title>
                <Title order={2}>{item.value}</Title>
              </Blockquote>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default Dashboard;
