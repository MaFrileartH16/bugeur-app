import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { getInitialName } from '@/utils/index.js';
import { router } from '@inertiajs/react';
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Divider,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const Show = (props) => {
  const { project, auth } = props;
  console.log(project.bugs);

  // Render Accordion untuk setiap bug
  const bugItems = project.bugs.map((bug) => (
    <Accordion.Item key={bug.id} value={bug.id}>
      <Accordion.Control>
        <Group>
          <Text>{bug.title}</Text>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack gap="sm">
          <Text>{bug.description}</Text>
          <Text c="dimmed" size="sm">
            Assignee: {bug.assignee.full_name}
          </Text>
          <Text c="dimmed" size="sm">
            Created at: {new Date(bug.created_at).toLocaleString()}
          </Text>
          {bug.evidence_image && (
            <Image src={bug.evidence_image} alt="Evidence" width={200} />
          )}
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <AppLayout title="Project Details" user={auth.user}>
      <PageHeadings
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

      {project.cover_photo_path ? (
        <Image src={project.cover_photo_path} h={320} />
      ) : (
        <Avatar
          h={320}
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

      <Grid mt={64}>
        <Grid.Col span={9}>
          <Title order={3} lineClamp={1}>
            {project.title}
          </Title>

          <Text c="gray" mt={16}>
            {project.description}
          </Text>

          <Stack>
            <Group mt={32} justify="space-between" align="start">
              <Title order={4}>Bugs</Title>

              {props.auth.user.role === 'Quality Assurance' && (
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
              )}
            </Group>

            {/* Tambahkan Accordion untuk menampilkan bugs */}
            {project.bugs.length > 0 ? (
              <Accordion defaultValue={project.bugs[0]?.id}>
                {bugItems}
              </Accordion>
            ) : (
              <Stack align="center" justify="center" h={200}>
                <Text c="dimmed" size="lg">
                  No bugs found.
                </Text>
              </Stack>
            )}
          </Stack>
        </Grid.Col>

        <Divider orientation="vertical" mx={16} />

        <Grid.Col span={2}>
          <Stack gap={32} w={320}>
            <Stack gap={8}>
              <Text fw={500} size="sm">
                Created on
              </Text>

              <Text c="gray">
                {new Date(project.created_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}{' '}
              </Text>
            </Stack>

            <Stack gap={8}>
              <Text fw={500} size="sm">
                Status
              </Text>
              <Badge
                color={project.deleted_at ? 'red' : 'green'}
                variant="light"
              >
                {project.deleted_at ? 'Inactive' : 'Active'}
              </Badge>
            </Stack>

            <Stack gap={8}>
              <Text fw={500} size="sm">
                Manager
              </Text>
              <Tooltip label={project.manager.full_name} withArrow>
                <Avatar
                  size={48}
                  color="orange"
                  src={project.manager.profile_photo_path || undefined}
                >
                  {!project.manager.profile_photo_path &&
                    getInitialName(project.manager.full_name)}
                </Avatar>
              </Tooltip>
            </Stack>

            <Stack gap={8}>
              <Text fw={500} size="sm">
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
                      src={project.manager.profile_photo_path || undefined}
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
                      .map((member) => `${member.full_name} (${member.role})`)
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
          </Stack>
        </Grid.Col>
      </Grid>
    </AppLayout>
  );
};

export default Show;
