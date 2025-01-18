import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router } from '@inertiajs/react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Show = (props) => {
  const { project, auth } = props;

  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    return `${parts[0][0]}${parts.at(-1)[0]}`.toUpperCase();
  };

  const handleEdit = () => {
    router.get(route('projects.edit', project.id));
  };

  const handleDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete the project "${project.title}"? This action cannot be undone.`,
      )
    ) {
      router.delete(route('projects.destroy', project.id));
    }
  };

  return (
    <AppLayout title={`Project Details - ${project.title}`} user={auth.user}>
      <Container size="xl" py={32}>
        <Group justify="space-between" align="start">
          <PageHeadings
            title={project.title}
            description={`Created on ${new Date(
              project.created_at,
            ).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })}.`}
            breadcrumbs={[
              {
                label: 'Projects',
                onClick: () => router.get(route('projects.index')),
              },
              {
                label: 'Details',
                onClick: () => router.get(route('projects.show', project.id)),
              },
            ]}
          />

          {auth.user.role === 'Admin' && (
            <Group>
              <Button leftSection={<IconEdit />} onClick={handleEdit}>
                Edit Project
              </Button>
              <Button
                color="red"
                leftSection={<IconTrash />}
                onClick={handleDelete}
              >
                Delete Project
              </Button>
            </Group>
          )}
        </Group>

        <Card withBorder shadow="xs" p="lg">
          <Stack spacing="lg">
            {/* Project Information */}
            <Box>
              <Title order={4}>Project Information</Title>
              <Divider my="sm" />
              <Text>
                <strong>Title:</strong>
              </Text>
              <Text>
                <strong>Description:</strong>{' '}
                {project.description || 'No description provided.'}
              </Text>
              <Text>
                <strong>Created At:</strong>{' '}
                {new Date(project.created_at).toLocaleString('en-US')}
              </Text>
            </Box>

            {/* Manager Information */}
            <Box>
              <Title order={4}>Project Manager</Title>
              <Divider my="sm" />
              <Flex align="center" gap="md">
                <Avatar color="blue" radius="xl" size={64}>
                  {getInitials(project.manager.full_name)}
                </Avatar>
                <Stack spacing={0}>
                  <Text>{project.manager.full_name}</Text>
                  <Text size="sm" color="dimmed">
                    {project.manager.email}
                  </Text>
                  <Text size="sm" color="dimmed">
                    {project.manager.role}
                  </Text>
                </Stack>
              </Flex>
            </Box>

            {/* Team Members */}
            <Box>
              <Title order={4}>Team Members</Title>
              <Divider my="sm" />
              <SimpleGrid cols={3} spacing="lg">
                {project.working_on.map((member) => (
                  <Card key={member.id} withBorder shadow="xs" p="sm">
                    <Flex align="center" gap="md">
                      <Avatar color="green" radius="xl">
                        {getInitials(member.full_name)}
                      </Avatar>
                      <Stack spacing={0}>
                        <Text>{member.full_name}</Text>
                        <Text size="sm" color="dimmed">
                          {member.email}
                        </Text>
                        <Text size="sm" color="dimmed">
                          {member.role}
                        </Text>
                      </Stack>
                    </Flex>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </Card>
      </Container>
    </AppLayout>
  );
};

export default Show;
