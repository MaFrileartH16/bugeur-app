import { router, usePage } from '@inertiajs/react';
import { ActionIcon, Button, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDashboard,
  IconFolders,
  IconMenu4,
  IconUsers,
} from '@tabler/icons-react';

export const NavigationDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { url } = usePage();

  const basePath = url.split('/')[1];

  const menuItems = [
    { label: 'Dashboard', route: 'dashboard', icon: <IconDashboard /> },
    { label: 'Users', route: 'users.index', icon: <IconUsers /> },
    { label: 'Projects', route: 'projects.index', icon: <IconFolders /> },
  ];

  return (
    <>
      <Drawer opened={opened} onClose={close} size="xs">
        <Stack spacing="md">
          {menuItems.map((item, index) => {
            const routeBase = item.route.split('.')[0];

            return (
              <Button
                key={index}
                leftSection={item.icon} // Dynamically add the icon
                variant={basePath === routeBase ? 'filled' : 'subtle'}
                fullWidth
                display="flex"
                onClick={() => router.get(route(item.route))}
              >
                {item.label}
              </Button>
            );
          })}
        </Stack>
      </Drawer>

      <ActionIcon onClick={open} variant="light">
        <IconMenu4 size={24} />
      </ActionIcon>
    </>
  );
};
