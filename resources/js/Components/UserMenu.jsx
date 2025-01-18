import { router } from '@inertiajs/react';
import { Avatar, Menu } from '@mantine/core';
import { IconId, IconLogout2 } from '@tabler/icons-react';

export const UserMenu = ({ user }) => {
  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0][0].toUpperCase(); // Take the first letter if there's only one word
    }
    return `${parts[0][0]}${parts.at(-1)[0]}`.toUpperCase(); // Take the first letter of the first and last word
  };

  const menuItems = [
    {
      label: 'Profile',
      action: () => router.get(route('profile.edit', user)),
      leftSection: <IconId />,
      color: 'ghost',
    },
    {
      label: 'Logout',
      action: () => router.post(route('logout')),
      leftSection: <IconLogout2 />,
      color: 'red',
    },
  ];

  return (
    <Menu shadow="xs" position="bottom-end" withArrow arrowPosition="center">
      <Menu.Target style={{ cursor: 'pointer' }}>
        <Avatar color="crystal" size={48}>
          {getInitials(user.full_name)}
        </Avatar>
      </Menu.Target>
      <Menu.Dropdown p={0}>
        {menuItems.map((item, index) => (
          <Menu.Item
            key={index}
            h={48}
            leftSection={item.leftSection}
            onClick={item.action}
            color={item.color || undefined}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
