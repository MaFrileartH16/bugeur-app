import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router } from '@inertiajs/react';
import { LineChart } from '@mantine/charts';
import {
  Blockquote,
  Card,
  Container,
  Grid,
  Select,
  Stack,
  Title,
} from '@mantine/core';
import { IconBug, IconFolder, IconUser } from '@tabler/icons-react';
import { useMemo, useState } from 'react';

const Dashboard = ({
  total_users: totalUsers = 0,
  total_projects: totalProjects = 0,
  total_bugs: totalBugs = 0,
  rawProjectData = [], // Data mentah proyek
  ...props
}) => {
  console.log(props.projectData);
  const authUser = props.auth.user;
  const [selectedPeriod, setSelectedPeriod] = useState('Year'); // Default: Year

  // Proses data untuk mengisi rentang yang kosong
  const processProjectData = (data) => {
    const years = [];
    const months = [];
    const days = [];

    data.forEach(({ date, Projects }) => {
      const [year, month, day] = date.split('-');
      if (year && !years.includes(year)) years.push(year);
      if (month && !months.includes(`${year}-${month}`))
        months.push(`${year}-${month}`);
      if (day && !days.includes(date)) days.push(date);
    });

    // Sorting ascending
    years.sort();
    months.sort();
    days.sort();

    // Fill data for all ranges
    const fillRange = (range, unit) =>
      range.map((item) => ({
        date: item,
        Projects: data.find((d) => d.date === item)?.Projects || 0, // Default ke 0 jika tidak ada data
      }));

    return {
      Year: fillRange(years, 'year'),
      Month: fillRange(months, 'month'),
      Day: fillRange(days, 'day'),
    };
  };

  const projectData = useMemo(
    () => processProjectData(rawProjectData),
    [rawProjectData],
  );

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
      onClick:
        authUser.role !== 'Admin'
          ? null
          : () => router.get(route('bugs.index')),
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

  const chartData = projectData[selectedPeriod] || [];

  return (
    <AppLayout
      title="Dashboard"
      user={authUser}
      notification={props.notification}
    >
      <Container flex={1} size="xl" w="100%" my={32}>
        <PageHeadings
          title="Dashboard"
          description="Overview of your projects and team activities."
        />
        <Grid gutter="lg" grow px={20} py={24}>
          {/* Dashboard Data */}
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
                  backgroundColor: '#f9fafb',
                }}
              >
                <Title order={5}>{label}</Title>
                <Title order={3}>{value}</Title>
              </Blockquote>
            </Grid.Col>
          ))}

          {/* Chart Section */}
          {authUser.role === 'Admin' && (
            <>
              {/* Card for Projects Chart */}
              <Grid.Col
                span={{
                  base: 12,
                  lg: 12,
                }}
              >
                <Card shadow="sm" p="lg" radius="md" withBorder bg="white">
                  <Stack spacing="md">
                    <Title order={4}>Total Projects</Title>
                    <Select
                      label="Select Period"
                      placeholder="Choose period"
                      value={selectedPeriod}
                      onChange={setSelectedPeriod}
                      data={['Year', 'Month', 'Day']}
                    />
                    <LineChart
                      h={300}
                      data={chartData}
                      dataKey="date"
                      series={[{ name: 'Projects', color: 'indigo.6' }]}
                      curveType="linear"
                    />
                  </Stack>
                </Card>
              </Grid.Col>
            </>
          )}
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default Dashboard;
