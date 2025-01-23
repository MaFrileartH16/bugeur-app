import { PageHeadings, Select, TextInput } from '@/Components';
import { AppLayout } from '@/Layouts';
import { getInitialName } from '@/utils';
import { router } from '@inertiajs/react';
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Indicator,
  Pagination,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import {
  IconArrowsUpDown,
  IconBolt,
  IconFilter,
  IconHierarchy3,
  IconNumber,
  IconPlus,
  IconSearch,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
  IconUsers,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const Index = (props) => {
  const [searchQuery, setSearchQuery] = useState(props.search || '');
  const [sortQuery, setSortQuery] = useState({
    key: props.sort_key || '',
    direction: props.sort_direction || 'asc',
  });
  const [filterType, setFilterType] = useState(props.filter_type || '');
  const [filterValue, setFilterValue] = useState(props.filter_value || '');
  const [perPage, setPerPage] = useState(String(props.per_page) || '10');

  useEffect(() => {
    setSearchQuery(props.search || '');
    setSortQuery({
      key: props.sort_key || '',
      direction: props.sort_direction || 'asc',
    });
    setFilterType(props.filter_type || '');
    setFilterValue(props.filter_value || '');
    setPerPage(String(props.per_page) || '10');
  }, [
    props.search,
    props.sort_key,
    props.sort_direction,
    props.filter_type,
    props.filter_value,
    props.per_page,
  ]);

  const updateQuery = (params) => {
    router.get(route('users.index'), {
      page: 1,
      search: searchQuery,
      sort_key: sortQuery.key,
      sort_direction: sortQuery.direction,
      filter_type: filterType,
      filter_value: filterValue,
      per_page: Number(perPage),
      ...params,
    });
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    updateQuery({ search: value });
  };

  const handleSort = (key, direction) => {
    setSortQuery({ key, direction });
    updateQuery({ sort_key: key, sort_direction: direction });
  };

  const handleFilterTypeChange = (value) => {
    setFilterType(value);
    setFilterValue('');
    updateQuery({ filter_type: value, filter_value: '' });
  };

  const handleFilterValueChange = (value) => {
    setFilterValue(value);
    updateQuery({ filter_value: value });
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
    updateQuery({ per_page: Number(value) });
  };

  const handlePageChange = (page) => {
    updateQuery({ page });
  };

  return (
    <AppLayout
      title={props.title}
      user={props.auth.user}
      notification={props.notification}
    >
      <Flex justify="space-between" align="start" gap={16}>
        <PageHeadings
          title="Users"
          description="Manage users with search, sort, filter, and customizable pagination."
        />

        {props.auth.user.role === 'Admin' && (
          <>
            <Tooltip label="Create Users">
              <ActionIcon
                display={{
                  base: 'block',
                  xs: 'none',
                }}
                onClick={() => router.get(route('users.create'))}
              >
                <IconPlus />
              </ActionIcon>
            </Tooltip>
            <Button
              leftSection={<IconPlus />}
              display={{
                base: 'none',
                xs: 'block',
              }}
              onClick={() => router.get(route('users.create'))}
            >
              Create User
            </Button>
          </>
        )}
      </Flex>

      <Grid gutter={32}>
        <Grid.Col span={{ base: 0, lg: 3 }}>
          <Card p={16} withBorder pos="sticky" top={112}>
            <Stack gap={32}>
              <Box>
                <Text fw={500}>Search</Text>
                <TextInput
                  leftSection={<IconSearch />}
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Box>

              <Box>
                <Text fw={500}>Sort</Text>
                <Select
                  clearable
                  leftSection={<IconArrowsUpDown />}
                  placeholder="Sort by..."
                  value={sortQuery.key}
                  data={[
                    { label: 'Full Name', value: 'full_name' },
                    { label: 'Email', value: 'email' },
                    { label: 'Role', value: 'role' },
                  ]}
                  onChange={(value) => handleSort(value, sortQuery.direction)}
                />
                {sortQuery.key && (
                  <Select
                    leftSection={
                      sortQuery.direction === 'asc' ? (
                        <IconSortAscendingLetters />
                      ) : (
                        <IconSortDescendingLetters />
                      )
                    }
                    placeholder="Direction..."
                    value={sortQuery.direction}
                    data={[
                      { label: 'Ascending', value: 'asc' },
                      { label: 'Descending', value: 'desc' },
                    ]}
                    onChange={(value) => handleSort(sortQuery.key, value)}
                  />
                )}
              </Box>

              <Box>
                <Text fw={500}>Filter</Text>
                <Select
                  clearable
                  leftSection={<IconFilter />}
                  placeholder="Filter by..."
                  value={filterType}
                  data={[
                    { label: 'Role', value: 'role' },
                    { label: 'Status', value: 'status' },
                  ]}
                  onChange={handleFilterTypeChange}
                />
                <Select
                  clearable
                  leftSection={
                    filterType === 'role' ? <IconHierarchy3 /> : <IconBolt />
                  }
                  placeholder={
                    filterType === 'role'
                      ? 'Select role...'
                      : 'Select status...'
                  }
                  value={filterValue}
                  data={
                    filterType === 'role'
                      ? [
                          {
                            label: 'Project Manager',
                            value: 'Project Manager',
                          },
                          { label: 'Developer', value: 'Developer' },
                          {
                            label: 'Quality Assurance',
                            value: 'Quality Assurance',
                          },
                        ]
                      : [
                          { label: 'Active', value: 'active' },
                          { label: 'Inactive', value: 'inactive' },
                        ]
                  }
                  onChange={handleFilterValueChange}
                  mt="sm"
                />
              </Box>

              <Box>
                <Text fw={500}>Items per page</Text>
                <Select
                  clearable={false}
                  leftSection={<IconNumber />}
                  placeholder="Select items per page..."
                  value={perPage}
                  data={[
                    { label: '10', value: '10' },
                    { label: '20', value: '20' },
                    { label: '30', value: '30' },
                    { label: '40', value: '40' },
                    { label: '50', value: '50' },
                  ]}
                  onChange={handlePerPageChange}
                />
              </Box>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 9 }}>
          <Group justify="space-between" align="center" mb={16}>
            <Text size="sm">
              Showing {props.users.from} – {props.users.to} of{' '}
              {props.users.total}
            </Text>
            <Pagination
              value={props.users.current_page}
              onChange={handlePageChange}
              total={props.users.last_page}
              radius="xs"
            />
          </Group>

          {props.users.data.length === 0 ? (
            <Stack align="center" py={32} spacing="xs">
              <IconUsers size={48} color="gray" />
              <Title order={3} c="gray">
                No users available yet.
              </Title>
            </Stack>
          ) : (
            <Grid gutter="lg">
              {props.users.data.map((user) => (
                <Grid.Col key={user.id} span={{ base: 6, sm: 4, md: 3 }}>
                  <Card shadow="xs" radius="md" withBorder>
                    {/*{user.deleted_at && (*/}
                    {/*  <Badge color="red" variant="light" mb="sm">*/}
                    {/*    Deleted*/}
                    {/*  </Badge>*/}
                    {/*)}*/}

                    <Center>
                      <Indicator
                        radius={16}
                        color={user.deleted_at ? 'red' : 'green'}
                        inline
                        size={16}
                        offset={7}
                        position="bottom-end"
                      >
                        <Avatar
                          size={48}
                          src={user.profile_photo_path || undefined}
                        >
                          {!user.profile_photo_path &&
                            getInitialName(user.full_name)}
                        </Avatar>
                      </Indicator>
                    </Center>

                    <Text fw={500} align="center" mt={16} lineClamp={1}>
                      {user.full_name}
                    </Text>

                    <Text
                      align="center"
                      c="ghost"
                      size="sm"
                      mb={16}
                      lineClamp={1}
                    >
                      {user.email}
                    </Text>

                    <Badge
                      mx="auto"
                      color={
                        user.role === 'Project Manager'
                          ? 'magic'
                          : user.role === 'Developer'
                            ? 'peach'
                            : user.role === 'Quality Assurance'
                              ? 'soap'
                              : 'default'
                      }
                      variant="light"
                    >
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}

          <Group justify="space-between" align="center" mt={16}>
            <Text size="sm">
              Showing {props.users.from} – {props.users.to} of{' '}
              {props.users.total}
            </Text>
            <Pagination
              value={props.users.current_page}
              onChange={handlePageChange}
              total={props.users.last_page}
              radius="xs"
            />
          </Group>
        </Grid.Col>
      </Grid>
    </AppLayout>
  );
};

export default Index;
