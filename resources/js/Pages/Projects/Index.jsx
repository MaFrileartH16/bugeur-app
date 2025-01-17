import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router } from '@inertiajs/react';
import {
  ActionIcon,
  Badge,
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
  IconPencil,
  IconPlus,
  IconSearch,
  IconSearchOff,
  IconTrash,
  IconUsers,
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
      <IconUsers size={48} color="gray" />
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

  return (
    <AppLayout
      title={props.title}
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
        <Group justify="space-between" mb={32}>
          <Title order={2}>{props.title}</Title>

          <Group spacing="xs">
            <Tooltip label="Add Project">
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
              Add Project
            </Button>
          </Group>
        </Group>

        <Card withBorder>
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
                    base: 12, // Full width for extra small screens
                    sm: 6, // Two columns for small screens
                    md: 4, // Three columns for medium and above
                  }}
                >
                  <Card
                    shadow="sm"
                    radius="md"
                    withBorder
                    sx={{ position: 'relative' }}
                  >
                    <Flex align="center">
                      <Title order={3} lineClamp={1}>
                        {project.title}
                      </Title>

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
                            onClick={() => handleEdit(project)}
                            color="yellow"
                            h={48}
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconTrash />}
                            onClick={() => confirmDelete(project)}
                            color="red"
                            h={48}
                          >
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Flex>

                    <Text color="dimmed" size="sm" mt={8} lineClamp={2}>
                      {project.description || 'No description available'}
                    </Text>

                    <Text align="center" color="dimmed" size="sm" mt={16}>
                      <strong>Working On:</strong>
                    </Text>
                    <Group position="center" spacing="xs" mt={8}>
                      {project.working_on.length > 0 ? (
                        project.working_on.map((user) => (
                          <Badge key={user.id} color="blue" size="sm">
                            {user.full_name}
                          </Badge>
                        ))
                      ) : (
                        <Text size="xs" color="dimmed">
                          No users assigned
                        </Text>
                      )}
                    </Group>
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
