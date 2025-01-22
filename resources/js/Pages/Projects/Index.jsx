import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router } from '@inertiajs/react';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Menu,
  Modal,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDotsVertical,
  IconFolders,
  IconPencil,
  IconPlus,
  IconSearch,
  IconSearchOff,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';

const Index = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePage, setPage] = useState(props.projects.current_page);

  const { data: projects, last_page, total, per_page } = props.projects;

  const handleEdit = (project) => {
    router.get(route('projects.edit', project.id));
  };

  const handleDelete = () => {
    if (selectedProject) {
      router.delete(route('projects.destroy', selectedProject.id), {
        onSuccess: close,
      });
    }
  };

  const confirmDelete = (project) => {
    setSelectedProject(project);
    open();
  };

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return project.title.toLowerCase().includes(query);
  });

  const handlePageChange = (page) => {
    setPage(page);
    router.get(route('projects.index'), { page });
  };

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

  const message = `Showing ${per_page * (activePage - 1) + 1} – ${Math.min(
    total,
    per_page * activePage,
  )} of ${total}`;

  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    return `${parts[0][0]}${parts.at(-1)[0]}`.toUpperCase();
  };

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
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </SimpleGrid>
      </Modal>

      <Container flex={1} size="xl" w="100%" my={32}>
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

        <Card withBorder shadow="xs">
          <Card.Section withBorder p={16}>
            <TextInput
              leftSection={<IconSearch />}
              placeholder="Search by project title..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </Card.Section>

          {projects.length === 0 ? (
            renderEmptyState()
          ) : filteredProjects.length === 0 ? (
            renderNotFound()
          ) : (
            <Grid pt={16} gutter="lg">
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
                    onClick={() =>
                      router.get(route('projects.show', project.id))
                    }
                  >
                    <Flex align="center">
                      <Box>
                        <Title order={3} lineClamp={1}>
                          {project.title}
                        </Title>
                        <Text c="ghost" size="sm">
                          Created on{' '}
                          {new Date(project.created_at).toLocaleString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              hour12: true,
                            },
                          )}{' '}
                          • Total Bugs: {project.bugs.length}
                        </Text>
                      </Box>

                      {props.auth.user.role === 'Admin' && (
                        <Menu
                          shadow="xl"
                          position="bottom-end"
                          withArrow
                          arrowPosition="center"
                        >
                          <Menu.Target>
                            <ActionIcon
                              ml="auto"
                              variant="subtle"
                              color="ghost"
                              onClick={(e) => e.stopPropagation()}
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                zIndex: 2,
                              }}
                            >
                              <IconDotsVertical />
                            </ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown p={0}>
                            <Menu.Item
                              leftSection={<IconPencil />}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(project);
                              }}
                              color="yellow"
                              h={48}
                            >
                              Edit
                            </Menu.Item>
                            <Menu.Item
                              leftSection={<IconTrash />}
                              onClick={(e) => {
                                e.stopPropagation();
                                confirmDelete(project);
                              }}
                              color="red"
                              h={48}
                            >
                              Delete
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      )}
                    </Flex>

                    <Text color="dimmed" size="sm" my={16} lineClamp={2}>
                      {project.description || 'No description available'}
                    </Text>

                    <SimpleGrid cols={2}>
                      <Stack gap={8}>
                        <Title order={5}>Manager</Title>
                        <Tooltip label={project.manager.full_name} withArrow>
                          <Avatar color="magic" size={48}>
                            {getInitials(project.manager.full_name)}
                          </Avatar>
                        </Tooltip>
                      </Stack>

                      <Flex justify="flex-end">
                        <Stack gap={16}>
                          <Title order={5} align="end">
                            Members
                          </Title>
                          <Avatar.Group>
                            {project.working_on.slice(0, 3).map((member) => (
                              <Tooltip
                                key={member.id}
                                label={`${member.full_name} (${member.role})`}
                              >
                                <Avatar
                                  color={
                                    member.role === 'Project Manager'
                                      ? 'magic'
                                      : member.role === 'Developer'
                                        ? 'peach'
                                        : member.role === 'Quality Assurance'
                                          ? 'soap'
                                          : 'default'
                                  }
                                  size={48}
                                >
                                  {getInitials(member.full_name)}
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
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}

          <Group justify="space-between" align="center" mt={16}>
            <Text size="sm">{message}</Text>
            <Pagination
              value={activePage}
              onChange={handlePageChange}
              total={last_page}
              radius="xs"
            />
          </Group>
        </Card>
      </Container>
    </AppLayout>
  );
};

export default Index;
