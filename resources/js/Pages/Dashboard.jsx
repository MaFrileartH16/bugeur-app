import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router } from '@inertiajs/react';
import { Blockquote, Container, Grid, Title } from '@mantine/core';
import { IconBug, IconFolder, IconUser } from '@tabler/icons-react';

const Dashboard = ({
  total_users: totalUsers = 0,
  total_projects: totalProjects = 0,
  total_bugs: totalBugs = 0,
  auth,
}) => {
  const authUser = auth.user;

  const data = [
    {
      label: 'Total Projects',
      value: totalProjects,
      icon: <IconFolder size={24} />,
      onClick: () => router.get(route('projects.index')),
    },
    {
      label: 'Total Bugs',
      value: totalBugs,
      icon: <IconBug size={24} />,
    },
  ];

  if (authUser.role === 'Admin') {
    data.unshift({
      label: 'Total Users',
      value: totalUsers,
      icon: <IconUser size={24} />,
      onClick: () => router.get(route('users.index')),
    });
  }

  return (
    <AppLayout title="Dashboard" user={authUser}>
      <Container flex={1} size="xl" w="100%" my={32}>
        <PageHeadings
          title="Dashboard"
          description="Overview of your projects and team activities."
        />
        <Grid gutter="lg" grow px={20} py={24}>
          {data.map(({ label, value, ...params }, index) => (
            <Grid.Col
              key={index}
              span={{
                base: 12,
                sm: 6,
                md: 4,
                lg: authUser.role === 'Admin' ? 3 : 6,
              }}
            >
              <Blockquote
                {...params}
                p={32}
                style={{
                  cursor: params.onClick ? 'pointer' : 'default',
                  borderRadius: 16,
                }}
              >
                <Title order={5}>{label}</Title>
                <Title order={3}>{value}</Title>
              </Blockquote>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default Dashboard;
