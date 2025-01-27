import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { getInitialName } from '@/utils/index.js';
import { router } from '@inertiajs/react';
import {
  ActionIcon,
  Affix,
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Indicator,
  Menu,
  Modal,
  Pagination,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
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
  IconFolders,
  IconNumber,
  IconPlus,
  IconSearch,
  IconSearchOff,
  IconSettingsSearch,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
  IconX,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const Index = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePage, setPage] = useState(props.projects.current_page);
  const [searchQuery, setSearchQuery] = useState(props.search || '');
  const [sortQuery, setSortQuery] = useState({
    key: props.sort_key || '',
    direction: props.sort_direction || 'asc',
  });
  const [filterKey, setFilterKey] = useState(props.filter_key || '');
  const [filterValue, setFilterValue] = useState(props.filter_value || '');
  const [perPage, setPerPage] = useState(String(props.per_page) || '10');

  const { data: projects, last_page, total, per_page } = props.projects;

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

  const updateQuery = (params) => {
    router.get(route('projects.index'), {
      page: 1,
      search: searchQuery,
      sort_key: sortQuery.key,
      sort_direction: sortQuery.direction,
      filter_key: filterKey,
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

  const handleFilterChange = (key, value) => {
    setFilterKey(key);
    setFilterValue(value);
    updateQuery({ filter_key: key, filter_value: value });
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
    updateQuery({ per_page: Number(value) });
  };

  const handlePageChange = (page) => {
    setPage(page);
    updateQuery({ page });
  };

  const handleEditProject = (project) => {
    router.get(route('projects.edit', { project: project.id }));
  };

  const handleDeleteProject = (project) => {
    if (confirm('Are you sure you want to delete this project?')) {
      router.delete(route('projects.destroy', project.id));
    }
  };

  const handleRestoreProject = (project) => {
    if (confirm('Are you sure you want to restore this project?')) {
      router.patch(route('projects.restore', project.id));
    }
  };

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return project.title.toLowerCase().includes(query);
  });

  const renderEmptyState = () => (
    <Stack align="center" py={32} spacing="xs">
      <IconFolders size={48} color="gray" />
      <Title order={3} c="gray">
        No projects available yet.
      </Title>
    </Stack>
  );

  const renderNotFound = () => (
    <Stack align="center" py={32} spacing="xs">
      <IconSearchOff size={48} color="gray" />
      <Title order={3} c="gray">
        Project Not Found
      </Title>
    </Stack>
  );

  return (
    <AppLayout
      title="Projects"
      user={props.auth.user}
      notification={props.notification}
    >
      <Modal opened={opened} onClose={close} title="Confirm Deletion" centered>
        <Text>
          Are you sure you want to delete{' '}
          <strong>{selectedProject?.title}</strong>? This action cannot be
          undone.
        </Text>
        <SimpleGrid cols={2} mt="md">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              handleDeleteProject(selectedProject);
              close();
            }}
          >
            Delete
          </Button>
        </SimpleGrid>
      </Modal>

      <Affix
        position={{ bottom: 16, left: 16 }}
        style={{ zIndex: 2 }}
        display={{
          base: 'block',
          lg: 'none',
        }}
      >
        <Tooltip label="Settings Search">
          <ActionIcon
            bg="white"
            onClick={(e) => {
              e.stopPropagation();
              open();
            }}
            variant="outline"
          >
            <IconSettingsSearch />
          </ActionIcon>
        </Tooltip>
      </Affix>

      <Modal
        opened={opened}
        onClose={close}
        size="xs"
        centered
        withCloseButton={false}
      >
        <Stack gap={32}>
          <Box>
            <Text fw={500}>Search</Text>
            <TextInput
              leftSection={<IconSearch />}
              placeholder="Search by project title..."
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
                { label: 'Title', value: 'title' },
                { label: 'Created At', value: 'created_at' },
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
              value={filterKey}
              data={[{ label: 'Status', value: 'status' }]}
              onChange={(value) => handleFilterChange(value, '')}
            />
            {filterKey && (
              <Select
                clearable
                leftSection={<IconBolt />}
                placeholder="Select status..."
                value={filterValue}
                data={[
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                ]}
                onChange={(value) => handleFilterChange(filterKey, value)}
                mt="sm"
              />
            )}
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
      </Modal>

      <Flex justify="space-between" align="start" gap={16}>
        <PageHeadings
          title="Projects"
          description="Browse, manage, and track the progress of all projects within the system."
        />

        {props.auth.user.role === 'Admin' && (
          <>
            <Tooltip label="Create Project">
              <ActionIcon
                display={{
                  base: 'block',
                  xs: 'none',
                }}
                onClick={() => router.get(route('projects.create'))}
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
              onClick={() => router.get(route('projects.create'))}
            >
              Create Project
            </Button>
          </>
        )}
      </Flex>

      <Grid gutter={32}>
        <Grid.Col span={{ base: 0, lg: 3 }}>
          <Stack
            gap={32}
            pos="sticky"
            top={112}
            display={{
              base: 'none',
              lg: opened ? 'none' : 'flex',
            }}
          >
            <Box>
              <Text fw={500}>Search</Text>
              <TextInput
                leftSection={<IconSearch />}
                placeholder="Search by project name..."
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
                  { label: 'Title', value: 'title' },
                  { label: 'Created At', value: 'created_at' },
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
                value={filterKey}
                data={[{ label: 'Status', value: 'status' }]}
                onChange={(value) => handleFilterChange(value, '')}
              />
              {filterKey && (
                <Select
                  clearable
                  leftSection={<IconBolt />}
                  placeholder="Select status..."
                  value={filterValue}
                  data={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                  ]}
                  onChange={(value) => handleFilterChange(filterKey, value)}
                  mt="sm"
                />
              )}
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
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 9 }}>
          <Group justify="space-between" align="center" mb={16}>
            <Text size="sm">
              Showing {props.projects.from} – {props.projects.to} of{' '}
              {props.projects.total}
            </Text>
            <Pagination
              value={props.projects.current_page}
              onChange={handlePageChange}
              total={props.projects.last_page}
              radius="xs"
            />
          </Group>

          {projects.length === 0 ? (
            renderEmptyState()
          ) : filteredProjects.length === 0 ? (
            renderNotFound()
          ) : (
            <Grid gutter="lg">
              {filteredProjects.map((project) => (
                <Grid.Col
                  key={project.id}
                  span={{
                    base: 12,
                    sm: 6,
                  }}
                >
                  <Card
                    shadow="xs"
                    withBorder
                    sx={{ position: 'relative' }}
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.get(route('projects.show', project.id));
                    }}
                  >
                    <Flex direction="column">
                      <Indicator
                        radius={16}
                        style={{ zIndex: 1 }}
                        color={project.deleted_at ? 'red' : 'green'}
                        inline
                        flex={1}
                        size={16}
                        offset={7}
                        position="bottom-end"
                      >
                        {project.cover_photo_path ? (
                          <Image src={project.cover_photo_path} h={160} />
                        ) : (
                          <Avatar
                            h={160}
                            w="100%"
                            styles={{
                              placeholder: {
                                fontSize: 26,
                              },
                            }}
                          >
                            {getInitialName(project.title)}
                          </Avatar>
                        )}
                      </Indicator>

                      <Title order={3} lineClamp={1} mt={16}>
                        {project.title}
                      </Title>
                      <Text c="ghost" size="sm">
                        Created on{' '}
                        {new Date(project.created_at).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true,
                        })}{' '}
                        {/*• Total Bugs: {project.bugs.length}*/}
                      </Text>
                    </Flex>

                    <Text color="dimmed" size="sm" my={16} lineClamp={1}>
                      {project.description || 'No description available'}
                    </Text>

                    <SimpleGrid cols={2}>
                      <Stack gap={8}>
                        <Text fw={500}>Manager</Text>
                        <Tooltip label={project.manager.full_name} withArrow>
                          <Avatar
                            size={48}
                            color="orange"
                            src={
                              project.manager.profile_photo_path || undefined
                            }
                          >
                            {!project.manager.profile_photo_path &&
                              getInitialName(project.manager.full_name)}
                          </Avatar>
                        </Tooltip>
                      </Stack>

                      <Flex justify="flex-end">
                        <Stack gap={8}>
                          <Text fw={500} align="end">
                            Members
                          </Text>
                          <Avatar.Group>
                            {project.working_on.slice(0, 3).map((member) => (
                              <Tooltip
                                key={member.id}
                                label={`${member.full_name} (${member.role})`}
                              >
                                <Avatar
                                  size={48}
                                  color={
                                    member.role === 'Developer'
                                      ? 'lime'
                                      : member.role === 'Quality Assurance'
                                        ? 'cyan'
                                        : 'gray'
                                  }
                                  src={
                                    project.manager.profile_photo_path ||
                                    undefined
                                  }
                                >
                                  {!project.manager.profile_photo_path &&
                                    getInitialName(member.full_name)}
                                </Avatar>
                              </Tooltip>
                            ))}

                            {project.working_on.length > 3 && (
                              <Tooltip
                                label={project.working_on
                                  .slice(3)
                                  .map(
                                    (member) =>
                                      `${member.full_name} (${member.role})`,
                                  )
                                  .join(', ')}
                                multiline
                                width={200}
                              >
                                <Avatar color="ghost" size={48}>
                                  +{project.working_on.length - 3}
                                </Avatar>
                              </Tooltip>
                            )}
                          </Avatar.Group>
                        </Stack>
                      </Flex>
                    </SimpleGrid>

                    {props.auth.user.role === 'Admin' && (
                      <Menu shadow="xs" withArrow arrowPosition="center">
                        <Menu.Target>
                          <ActionIcon
                            w="100%"
                            mt={16}
                            variant="subtle"
                            color="gray"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <IconDots />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown p={0}>
                          {/* Tombol Edit */}
                          <Menu.Item
                            h={48}
                            color="yellow"
                            leftSection={<IconEdit />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProject(project);
                            }}
                          >
                            Edit
                          </Menu.Item>

                          {/* Tombol Restore atau Delete */}
                          {project.deleted_at ? (
                            // Jika deleted_at ada, tampilkan tombol Restore
                            <Menu.Item
                              h={48}
                              color="green"
                              leftSection={<IconCheck />}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRestoreProject(project);
                              }}
                            >
                              Activate
                            </Menu.Item>
                          ) : (
                            // Jika deleted_at null, tampilkan tombol Delete
                            <Menu.Item
                              h={48}
                              color="red"
                              leftSection={<IconX />}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProject(project);
                              }}
                            >
                              Deactivate
                            </Menu.Item>
                          )}
                        </Menu.Dropdown>
                      </Menu>
                    )}
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}

          <Group justify="space-between" align="center" mt={16}>
            <Text size="sm">
              Showing {props.projects.from} – {props.projects.to} of{' '}
              {props.projects.total}
            </Text>
            <Pagination
              value={props.projects.current_page}
              onChange={handlePageChange}
              total={props.projects.last_page}
              radius="xs"
            />
          </Group>
        </Grid.Col>
      </Grid>
    </AppLayout>
  );
};

export default Index;
