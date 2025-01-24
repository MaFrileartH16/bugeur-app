import { PageHeadings, Select, TextInput } from '@/Components';
import { AppLayout } from '@/Layouts';
import { getInitialName } from '@/utils';
import { router } from '@inertiajs/react';
import {
  ActionIcon,
  Affix,
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
  Menu,
  Modal,
  Pagination,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArrowsUpDown,
  IconBolt,
  IconCheck,
  IconDots,
  IconEdit,
  IconFilter,
  IconHierarchy3,
  IconNumber,
  IconPlus,
  IconSearch,
  IconSettingsSearch,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const Index = (props) => {
  // State untuk pencarian
  const [searchQuery, setSearchQuery] = useState(props.search || '');

  // State untuk sorting
  const [sortQuery, setSortQuery] = useState({
    key: props.sort_key || '',
    direction: props.sort_direction || 'asc',
  });

  // State untuk filter (dipisah menjadi filterKey dan filterValue)
  const [filterKey, setFilterKey] = useState(props.filter_key || '');
  const [filterValue, setFilterValue] = useState(props.filter_value || '');

  // State untuk items per page
  const [perPage, setPerPage] = useState(String(props.per_page) || '10');

  // State untuk modal
  const [opened, { open, close }] = useDisclosure(false);

  // Effect untuk update state saat props berubah
  useEffect(() => {
    setSearchQuery(props.search || '');
    setSortQuery({
      key: props.sort_key || '',
      direction: props.sort_direction || 'asc',
    });
    setFilterKey(props.filter_key || '');
    setFilterValue(props.filter_value || '');
    setPerPage(String(props.per_page) || '10');
  }, [
    props.search,
    props.sort_key,
    props.sort_direction,
    props.filter_key,
    props.filter_value,
    props.per_page,
  ]);

  // Fungsi untuk update query parameters
  const updateQuery = (params) => {
    router.get(route('users.index'), {
      page: 1,
      search: searchQuery,
      sort_key: sortQuery.key,
      sort_direction: sortQuery.direction,
      filter_key: filterKey, // Kirim filter_key
      filter_value: filterValue, // Kirim filter_value
      per_page: Number(perPage),
      ...params,
    });
  };

  // Handler untuk pencarian
  const handleSearch = (value) => {
    setSearchQuery(value);
    updateQuery({ search: value });
  };

  // Handler untuk sorting
  const handleSort = (key, direction) => {
    setSortQuery({ key, direction });
    updateQuery({ sort_key: key, sort_direction: direction });
  };

  // Handler untuk filter
  const handleFilterChange = (key, value) => {
    setFilterKey(key);
    setFilterValue(value);
    updateQuery({ filter_key: key, filter_value: value });
  };

  // Handler untuk items per page
  const handlePerPageChange = (value) => {
    setPerPage(value);
    updateQuery({ per_page: Number(value) });
  };

  // Handler untuk pagination
  const handlePageChange = (page) => {
    updateQuery({ page });
  };

  // Handler untuk edit user
  const handleEditUser = (userId) => {
    router.get(route('users.edit', userId));
  };

  // Handler untuk delete user
  const handleDeleteUser = (userId) => {
    console.log('Delete user:', userId);
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(route('users.destroy', userId));
    }
  };

  return (
    <AppLayout
      title={props.title}
      user={props.auth.user}
      notification={props.notification}
    >
      {/* Tombol untuk membuka modal */}
      <Affix
        position={{ bottom: 16, left: 16 }}
        style={{ zIndex: 2 }}
        display={{
          base: 'block',
          lg: 'none',
        }}
      >
        <Tooltip label="Settings Search">
          <ActionIcon bg="white" onClick={open} variant="outline">
            <IconSettingsSearch />
          </ActionIcon>
        </Tooltip>
      </Affix>

      {/* Modal untuk Search, Sort, Filter, dan Pagination */}
      <Modal
        opened={opened}
        onClose={close}
        size="xs"
        centered
        withCloseButton={false}
      >
        <Stack gap={32}>
          {/* Search Input */}
          <Box>
            <Text fw={500}>Search</Text>
            <TextInput
              leftSection={<IconSearch />}
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Box>

          {/* Sort Input */}
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

          {/* Filter Input */}
          <Box>
            <Text fw={500}>Filter</Text>
            <Select
              clearable
              leftSection={<IconFilter />}
              placeholder="Filter by..."
              value={filterKey}
              data={[
                { label: 'Role', value: 'role' },
                { label: 'Status', value: 'status' },
              ]}
              onChange={(value) => handleFilterChange(value, '')}
            />
            {filterKey && (
              <Select
                clearable
                leftSection={
                  filterKey === 'role' ? <IconHierarchy3 /> : <IconBolt />
                }
                placeholder={
                  filterKey === 'role' ? 'Select role...' : 'Select status...'
                }
                value={filterValue}
                data={
                  filterKey === 'role'
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
                onChange={(value) => handleFilterChange(filterKey, value)}
                mt="sm"
              />
            )}
          </Box>

          {/* Items per Page Input */}
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
      </Modal>

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
        {/* Sidebar untuk Search, Sort, Filter, dan Pagination */}
        <Grid.Col span={{ base: 0, lg: 3 }}>
          <Card
            shadow="xs"
            p={16}
            withBorder
            pos="sticky"
            top={112}
            display={{
              base: 'none',
              lg: opened ? 'none' : 'block', // Sembunyikan saat modal terbuka
            }}
          >
            <Stack gap={32}>
              {/* Search Input */}
              <Box>
                <Text fw={500}>Search</Text>
                <TextInput
                  leftSection={<IconSearch />}
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Box>

              {/* Sort Input */}
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

              {/* Filter Input */}
              <Box>
                <Text fw={500}>Filter</Text>
                <Select
                  clearable
                  leftSection={<IconFilter />}
                  placeholder="Filter by..."
                  value={filterKey}
                  data={[
                    { label: 'Role', value: 'role' },
                    { label: 'Status', value: 'status' },
                  ]}
                  onChange={(value) => handleFilterChange(value, '')}
                />
                {filterKey && (
                  <Select
                    clearable
                    leftSection={
                      filterKey === 'role' ? <IconHierarchy3 /> : <IconBolt />
                    }
                    placeholder={
                      filterKey === 'role'
                        ? 'Select role...'
                        : 'Select status...'
                    }
                    value={filterValue}
                    data={
                      filterKey === 'role'
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
                    onChange={(value) => handleFilterChange(filterKey, value)}
                    mt="sm"
                  />
                )}
              </Box>

              {/* Items per Page Input */}
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

        {/* Main Content */}
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

          {/* User List */}
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
                    <Center>
                      <Indicator
                        radius={16}
                        style={{ zIndex: 1 }}
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
                          ? 'orange'
                          : user.role === 'Developer'
                            ? 'lime'
                            : user.role === 'Quality Assurance'
                              ? 'cyan'
                              : 'gray'
                      }
                      variant="light"
                    >
                      {user.role.replace('_', ' ')}
                    </Badge>

                    {/* Menu untuk Edit dan Delete */}
                    <Menu shadow="xs" withArrow arrowPosition="center">
                      <Menu.Target>
                        <ActionIcon
                          w="100%"
                          mt={16}
                          variant="subtle"
                          color="gray"
                        >
                          <IconDots />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown p={0}>
                        <Menu.Item
                          h={48}
                          color="yellow"
                          leftSection={<IconEdit />}
                          onClick={() => handleEditUser(user.id)}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          h={48}
                          color={user.deleted_at ? 'green' : 'red'}
                          leftSection={
                            user.deleted_at ? <IconCheck /> : <IconX />
                          }
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          {user.deleted_at ? 'Active' : 'Deactivate'}
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}

          {/* Pagination Footer */}
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
