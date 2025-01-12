import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { ActionIcon, Button, Group, Image, Table, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const BugsIndex = ({ project, bugs }) => {
  console.log(bugs);

  const handleAddBug = () => {
    router.get(route('projects.bugs.create', project.id)); // Navigasi ke halaman create bug
  };

  const handleEditBug = (projectId, bugId) => {
    router.get(route('projects.bugs.edit', [projectId, bugId])); // Navigasi ke halaman edit bug dengan projectId dan bugId
  };

  const handleDeleteBug = (projectId, bugId) => {
    if (confirm('Are you sure you want to delete this bug?')) {
      router.delete(route('projects.bugs.destroy', [projectId, bugId]), {
        onSuccess: () => {
          alert('Bug deleted successfully.');
        },
      });
    }
  };

  return (
    <AuthenticatedLayout title={`Bugs for ${project.title}`}>
      <Group position="apart" mb="md">
        <Title order={2}>Bugs for {project.title}</Title>
        <Button onClick={handleAddBug} color="blue">
          Add Bug
        </Button>
      </Group>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Assignee</Table.Th>
            <Table.Th>Deadline</Table.Th>
            <Table.Th>Screenshots</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {bugs.map((bug) => (
            <Table.Tr key={bug.id}>
              <Table.Td>{bug.id}</Table.Td>
              <Table.Td>{bug.title}</Table.Td>
              <Table.Td>{bug.bug_type}</Table.Td>
              <Table.Td>{bug.status}</Table.Td>
              <Table.Td>
                {bug.assignee ? bug.assignee.username : 'Unassigned'}
              </Table.Td>
              <Table.Td>{bug.deadline}</Table.Td>
              <Table.Td>
                {bug.screenshots.length > 0 ? (
                  <Group spacing="xs">
                    {bug.screenshots.map((screenshot, index) => (
                      <Image
                        key={index}
                        src={screenshot.images}
                        alt={`Screenshot ${index + 1}`}
                        width={50}
                        height={50}
                        withPlaceholder
                      />
                    ))}
                  </Group>
                ) : (
                  'No screenshots'
                )}
              </Table.Td>
              <Table.Td>
                <Group spacing="sm">
                  <ActionIcon
                    color="blue"
                    onClick={() => handleEditBug(project.id, bug.id)}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    onClick={() => handleDeleteBug(project.id, bug.id)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </AuthenticatedLayout>
  );
};

export default BugsIndex;
