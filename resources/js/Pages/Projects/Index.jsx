import { AppLayout } from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import { ActionIcon, Button, Group, Table, Title } from '@mantine/core';
import { IconBug, IconEdit, IconTrash } from '@tabler/icons-react';

const Index = (props) => {
  const handleAddProject = () => {
    router.get(route('projects.create')); // Navigasi ke halaman create project
  };

  const handleEditProject = (id) => {
    router.get(route('projects.edit', id)); // Navigasi ke halaman edit project
  };

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      router.delete(route('projects.destroy', id), {
        onSuccess: () => {
          alert('Project deleted successfully.');
        },
      });
    }
  };

  const handleViewBugs = (projectId) => {
    router.get(route('projects.bugs.index', projectId)); // Navigasi ke halaman bugs
  };

  return (
    <AppLayout title="Projects">
      <Group position="apart" mb="md">
        <Title order={2}>Projects List</Title>
        <Button onClick={handleAddProject} color="blue">
          Add Project
        </Button>
      </Group>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Manager</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {props.projects.map((project) => (
            <Table.Tr key={project.id}>
              <Table.Td>{project.id}</Table.Td>
              <Table.Td>{project.title}</Table.Td>
              <Table.Td>{project.manager.username}</Table.Td>
              <Table.Td>
                <Group spacing="sm">
                  <ActionIcon
                    color="green"
                    onClick={() => handleViewBugs(project.id)}
                  >
                    <IconBug size={16} />
                  </ActionIcon>
                  <ActionIcon
                    color="blue"
                    onClick={() => handleEditProject(project.id)}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </AppLayout>
  );
};

export default Index;
