import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router } from '@inertiajs/react';
import { BarChart, LineChart } from '@mantine/charts';
import {
  Blockquote,
  Box,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import {
  IconBug,
  IconCalendarTime,
  IconFolder,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';

const Dashboard = (props) => {
  const authUser = props.auth.user;
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString(),
  );

  console.log(props);
  const data = [
    {
      label: 'Total Projects',
      value: props.projects.total,
      icon: <IconFolder size={24} />,
      onClick: () => router.get(route('projects.index')),
    },
    {
      label: 'Total Bugs',
      value: 0,
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
      value: props.users.total,
      icon: <IconUser size={24} />,
      onClick: () => router.get(route('users.index')),
    });
  }

  return (
    <AppLayout
      title="Dashboard"
      user={authUser}
      notification={props.notification}
    >
      <PageHeadings
        title="Dashboard"
        description="Overview of your projects and team activities."
      />

      <Grid gutter={16} grow>
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
              py={0}
              px={0}
              style={{
                cursor: params.onClick ? 'pointer' : 'default',
                borderRadius: 16,
                backgroundColor: '#fff',
              }}
              styles={{
                icon: {
                  left: 16,
                  top: 16,
                  borderRadius: 16,
                },
              }}
            >
              <Box px={80} pt={16} pb={16}>
                <Text fw={500}>{label}</Text>
                <Text fz={26} fw={600}>
                  {value}
                </Text>
              </Box>
            </Blockquote>
          </Grid.Col>
        ))}
      </Grid>

      <Grid mt={32}>
        {/* Bagian kiri dengan dua chart */}
        <Grid.Col
          span={{
            base: 12,
            sm: 8,
          }}
        >
          <Stack>
            {/* Chart 1: Project */}
            <Paper shadow={0} h="100%" bg="#fff" p={16}>
              <Group justify="space-between" mb={16}>
                <Text fw={500} fz={20}>
                  Projects
                </Text>

                <Select
                  leftSection={<IconCalendarTime />}
                  onChange={(value) => {
                    if (value === null) {
                      setSelectedYear(new Date().getFullYear().toString()); // Set ke tahun sekarang jika null
                    } else {
                      setSelectedYear(value); // Set ke tahun yang dipilih
                    }
                  }}
                  placeholder="Select a year"
                  defaultValue={selectedYear}
                  data={Object.entries(props.projects.details)
                    .sort(([yearA], [yearB]) => yearB - yearA) // Sorting descending berdasarkan tahun
                    .map(([year, data]) => ({
                      value: year, // Gunakan tahun sebagai value
                      label: `${year} (${data.total} projects)`, // Tampilkan tahun dan total proyek di label
                    }))}
                />
              </Group>

              <LineChart
                h={500}
                data={Object.entries(props.projects.details)
                  .filter(([year]) => year === selectedYear.toString()) // Filter hanya tahun yang dipilih
                  .flatMap(([, data]) =>
                    Object.entries(data.months).map(
                      ([month, { Total, Active, Inactive }]) => ({
                        month: `${month} (${Total})`, // Format nama bulan dengan total
                        active: Active,
                        inactive: Inactive,
                      }),
                    ),
                  )}
                dataKey="month"
                series={[
                  {
                    name: 'active',
                    label: 'Active',
                    color: '#77DD77',
                  },
                  {
                    name: 'inactive',
                    label: 'Inactive',
                    color: '#FF6961',
                  },
                ]}
                curveType="natural"
                tickLine="xy"
                gridAxis="xy"
                withLegend
                withPointLabels
                xAxisLabel="Month (Total projects)"
                yAxisLabel="Total"
                valueFormatter={(value) =>
                  new Intl.NumberFormat('id-ID').format(value)
                }
                tooltipAnimationDuration={160}
              />
            </Paper>

            {/* Chart 2: Bugs */}
            <Paper shadow="sm" style={{ height: 200 }}>
              Chart: Bugs
            </Paper>
          </Stack>
        </Grid.Col>

        {/* Chart: Users menggunakan colSpan */}
        <Grid.Col
          span={{
            base: 12,
            sm: 4,
          }}
        >
          <Paper shadow={0} h="100%" bg="#fff" px={16} pt={16}>
            <Text fw={500} fz={20} mb={16}>
              User Role
            </Text>

            <BarChart
              h={500}
              data={Object.entries(props.users.details).map(
                ([role, { Total, Active, Inactive }]) => ({
                  role: `${role} (${Total})`,
                  active: Active,
                  inactive: Inactive,
                }),
              )}
              dataKey="role"
              type="stacked"
              withLegend
              xAxisLabel="Role (Total users)"
              yAxisLabel="Total"
              tooltipAnimationDuration={160}
              withBarValueLabel
              series={[
                {
                  name: 'active',
                  label: 'Active',
                  color: '#77DD77',
                },
                {
                  name: 'inactive',
                  label: 'Inactive',
                  color: '#FF6961',
                },
              ]}
              tickLine="xy"
              gridAxis="xy"
              barProps={{ radius: 16 }}
              valueFormatter={(value) =>
                new Intl.NumberFormat('id-ID').format(value)
              }
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </AppLayout>
  );
};

export default Dashboard;
