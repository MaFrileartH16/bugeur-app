import { getInitialName } from '@/utils/getInitialName.js';
import { router } from '@inertiajs/react';
import { Avatar, Badge, Box, Menu } from '@mantine/core';
import { IconId, IconLogout2 } from '@tabler/icons-react';

export const UserMenu = ({ user }) => {
  return (
    <Menu shadow="xs" position="bottom-end" withArrow arrowPosition="center">
      <Menu.Target style={{ cursor: 'pointer' }}>
        <Box pos="relative">
          <Avatar color="crystal" size={48} src={user.avatar || undefined}>
            {!user.avatar && getInitialName(user.full_name)}
          </Avatar>

          <Badge
            w={80}
            style={{
              position: 'absolute',
              right: 0,
              bottom: -20,
            }}
          >
            {(() => {
              switch (user.role) {
                case 'Project Manager':
                  return 'PM';
                case 'Quality Assurance':
                  return 'QA';
                case 'Developer':
                  return 'Dev';
                default:
                  return user.role;
              }
            })()}
          </Badge>
        </Box>
      </Menu.Target>
      <Menu.Dropdown p={0}>
        <Menu.Item
          h={48}
          leftSection={<IconId />}
          onClick={() => router.get(route('profile.edit', user))}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          h={48}
          leftSection={<IconLogout2 />}
          onClick={() => router.post(route('logout'))}
          color="red"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
