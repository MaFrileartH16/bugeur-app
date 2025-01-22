import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { router } from '@inertiajs/react';
import {
  Accordion,
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const Show = (props) => {
  console.log(props);
  const { project, auth } = props;

  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    return `${parts[0][0]}${parts.at(-1)[0]}`.toUpperCase();
  };

  const teamMembers = [
    { ...project.manager, role: 'Manager', color: 'blue' },
    ...project.working_on.map((member) => ({
      ...member,
      color:
        member.role === 'Developer'
          ? 'teal'
          : member.role === 'Quality Assurance'
            ? 'orange'
            : 'gray',
    })),
  ];

  const statusColors = {
    in_review: 'yellow',
    open: 'blue',
    in_progress: 'teal',
    resolved: 'green',
    closed: 'gray',
  };

  return (
    <AppLayout title="Project Details" user={auth.user}>
      <Container size="xl" py={32} w="100%">
        <Box>
          <PageHeadings
            title={project.title}
            description={`Created on ${new Date(
              project.created_at,
            ).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })}`}
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
        </Box>

        <Stack gap={24}>
          {/* Description */}
          <Box>
            <Title order={3}>Description</Title>
            <Divider my={16} />
            <Text>{project.description}</Text>
          </Box>

          {/* Teams Section */}
          <Box>
            <Title order={3}>Team Members</Title>
            <Divider my={16} />
            <SimpleGrid
              cols={{
                base: 1,
                sm: 2,
                md: 3,
                lg: 4,
              }}
              spacing="lg"
            >
              {teamMembers.map((member, index) => (
                <Card key={index} shadow="xs" radius="md" withBorder>
                  <Avatar mx="auto" size={64} color={member.color}>
                    {getInitials(member.full_name)}
                  </Avatar>
                  <Box mt={8} align="center">
                    <Title order={3} align="center" mt={16} lineClamp={1}>
                      {member.full_name}
                    </Title>
                    <Text align="center" c="ghost" size="sm" mb={16}>
                      {member.email}
                    </Text>
                    <Badge color={member.color} variant="light" align="center">
                      {member.role}
                    </Badge>
                  </Box>
                </Card>
              ))}
            </SimpleGrid>
          </Box>

          {/* Bugs Section */}
          <Box>
            <Group justify="space-between">
              <Title order={3}>Bugs</Title>

              {props.auth.user.role === 'Quality Assurance' && (
                <>
                  <Tooltip label="Create Bug">
                    <ActionIcon
                      display={{
                        base: 'block',
                        xs: 'none',
                      }}
                      onClick={() =>
                        router.get(route('projects.bugs.create', project))
                      }
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
                    onClick={() =>
                      router.get(route('projects.bugs.create', project))
                    }
                  >
                    Create Bug
                  </Button>
                </>
              )}
            </Group>
            <Divider my={16} />
            <Accordion>
              {(project.bugs || []).map((bug, id) => (
                <Accordion.Item key={id} value={bug.title}>
                  <Accordion.Control>{bug.title}</Accordion.Control>
                  <Accordion.Panel>
                    <Card shadow="xs" radius="md" withBorder>
                      <Stack spacing="md">
                        {/* Deskripsi */}
                        <Box>
                          <Text size="sm" color="dimmed" mb={8}>
                            {bug.description}
                          </Text>
                        </Box>

                        {/* Assignee */}
                        {bug.assignee && (
                          <Box>
                            <Text size="sm" weight={500}>
                              Assigned to: {bug.assignee.full_name}
                            </Text>
                          </Box>
                        )}

                        {/* Evidence Image */}
                        {bug.evidence_image && (
                          <Box>
                            <img
                              src={bug.evidence_image}
                              alt="Evidence"
                              style={{
                                width: '100%',
                                maxWidth: '300px',
                                borderRadius: '8px',
                                objectFit: 'cover',
                                marginBottom: '8px',
                              }}
                            />
                          </Box>
                        )}
                      </Stack>
                    </Card>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}

              {/* Empty State */}
              {!project.bugs.length && (
                <Text align="center" mt={16} color="dimmed">
                  No bugs found.
                </Text>
              )}
            </Accordion>
          </Box>
        </Stack>
      </Container>
    </AppLayout>
  );
};

export default Show;
