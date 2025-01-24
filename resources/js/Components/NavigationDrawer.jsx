import { router, usePage } from '@inertiajs/react';
import { ActionIcon, Button, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDashboard,
  IconFolder,
  IconMenu4,
  IconUser,
  IconX,
} from '@tabler/icons-react';

export const NavigationDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { url, props } = usePage();
  const { auth } = props;

  // Extract base path from the URL
  const basePath = url.split('?')[0].split('/')[1]; // Only take the first segment after "/"

  const menuItems = [
    { label: 'Dashboard', route: 'dashboard', leftSection: <IconDashboard /> },
    ...(auth.user.role === 'Admin'
      ? [{ label: 'Users', route: 'users.index', leftSection: <IconUser /> }]
      : []),
    { label: 'Projects', route: 'projects.index', leftSection: <IconFolder /> },
  ];

  return (
    <>
      <Drawer.Root
        opened={opened}
        onClose={close}
        size="xs"
        style={{
          zIndex: 202,
        }}
      >
        <Drawer.Overlay />

        <Drawer.Content>
          <Drawer.Header p={16}>
            <ActionIcon onClick={close} variant="subtle" color="gray">
              <IconX />
            </ActionIcon>
          </Drawer.Header>

          <Drawer.Body>
            <Stack gap={16}>
              {menuItems.map((item, index) => {
                const routeBase = item.route.split('.')[0];

                return (
                  <Button
                    key={index}
                    leftSection={item.leftSection}
                    variant={basePath === routeBase ? 'filled' : 'subtle'} // Compare base path
                    fullWidth
                    display="flex"
                    onClick={() => {
                      // Append `page=1` for users.index
                      if (item.route === 'users.index') {
                        router.get(route(item.route), { page: 1 });
                      } else {
                        router.get(route(item.route));
                      }
                      close(); // Close drawer after navigation
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <ActionIcon onClick={open} variant="subtle" color="gray">
        <IconMenu4 />
      </ActionIcon>
    </>
  );
};
