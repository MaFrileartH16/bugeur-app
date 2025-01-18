import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router } from '@inertiajs/react';
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Container,
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [activePage, setPage] = useState(props.users.current_page);

  const { data: users, last_page, total, per_page } = props.users;

  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    return `${parts[0][0]}${parts.at(-1)[0]}`.toUpperCase();
  };

  const handleEdit = (user) => {
    router.get(route('users.edit', user.id));
  };

  const handleDelete = () => {
    if (selectedUser) {
      router.delete(route('users.destroy', selectedUser.id), {
        onSuccess: close,
      });
    }
  };

  const confirmDelete = (user) => {
    setSelectedUser(user);
    open();
  };

  const menuItems = [
    {
      label: 'Edit',
      action: handleEdit,
      leftSection: <IconPencil />,
      color: 'yellow',
    },
    {
      label: 'Delete',
      action: confirmDelete,
      leftSection: <IconTrash />,
      color: 'red',
    },
  ];

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.full_name.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const handlePageChange = (page) => {
    setPage(page);
    router.get(route('users.index'), { page });
  };

  const message = `Showing ${per_page * (activePage - 1) + 1} – ${Math.min(
    total,
    per_page * activePage,
  )} of ${total}`;

  const renderEmptyState = () => (
    <Stack align="center" py={32} spacing="xs">
      <IconUsers size={48} color="gray" />

      <Title order={3} c="gray">
        No users available yet.
      </Title>
    </Stack>
  );

  const renderNotFound = () => (
    <Stack align="center" py={32} spacing="xs">
      <IconSearchOff size={48} color="gray" />

      <Title order={3} c="gray">
        User Not Found
      </Title>
    </Stack>
  );

  return (
    <AppLayout
      title={props.title}
      user={props.auth.user}
      notification={props.notification}
    >
      <Modal opened={opened} onClose={close} title="Confirm Deletion" centered>
        <Text>
          Are you sure you want to delete{' '}
          <strong>{selectedUser?.full_name}</strong>? This action cannot be
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
        <Group justify="space-between" align="start">
          <PageHeadings
            title="Users"
            description="View, manage, and assign roles to user accounts within the system."
          />

          <Tooltip label="Craete User">
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
        </Group>

        <Card withBorder shadow="xs">
          <Card.Section withBorder p={16}>
            <TextInput
              leftSection={<IconSearch />}
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </Card.Section>

          {users.length === 0 ? (
            renderEmptyState()
          ) : filteredUsers.length === 0 ? (
            renderNotFound()
          ) : (
            <Grid pt={16} gutter="lg">
              {filteredUsers.map((user) => (
                <Grid.Col
                  key={user.id}
                  span={{
                    base: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                  }}
                >
                  <Card shadow="xs" radius="md" withBorder>
                    <Menu
                      shadow="xl"
                      position="bottom-end"
                      withArrow
                      arrowPosition="center"
                    >
                      <Menu.Target>
                        <ActionIcon
                          pos="absolute"
                          variant="subtle"
                          color="ghost"
                          right={16}
                        >
                          <IconDotsVertical />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown p={0}>
                        {menuItems.map((item, index) => (
                          <Menu.Item
                            key={index}
                            leftSection={item.leftSection}
                            onClick={() => item.action(user)}
                            color={item.color || undefined}
                            h={48}
                          >
                            {item.label}
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>

                    <Avatar
                      mx="auto"
                      size={64}
                      color={
                        user.role === 'Project Manager'
                          ? 'magic'
                          : user.role === 'Developer'
                            ? 'peach'
                            : user.role === 'Quality Assurance'
                              ? 'soap'
                              : 'default'
                      }
                    >
                      {getInitials(user.full_name)}
                    </Avatar>
                    <Title order={3} align="center" mt={16} lineClamp={1}>
                      {user.full_name}
                    </Title>
                    <Text align="center" c="ghost" size="sm" mb={16}>
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
                      {user.role}
                    </Badge>
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
