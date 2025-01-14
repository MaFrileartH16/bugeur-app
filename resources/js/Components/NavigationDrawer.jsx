import { router } from '@inertiajs/react';
import { ActionIcon, Button, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu4 } from '@tabler/icons-react';

export const NavigationDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {/* Drawer */}
      <Drawer opened={opened} onClose={close} size="xs">
        <Stack spacing="md">
          <Button
            color="macaroni"
            variant="filled"
            fullWidth
            onClick={() => router.get(route('dashboard'))}
          >
            Dashboard
          </Button>
          <Button
            variant="light"
            fullWidth
            onClick={() => router.get(route('users.index'))}
          >
            Users
          </Button>
          <Button
            variant="light"
            fullWidth
            onClick={() => router.get(route('projects.index'))}
          >
            Projects
          </Button>
        </Stack>
      </Drawer>

      {/* Open Drawer Button */}
      <ActionIcon onClick={open} variant="light" size={48}>
        <IconMenu4 size={24} />
      </ActionIcon>
    </>
  );
};
