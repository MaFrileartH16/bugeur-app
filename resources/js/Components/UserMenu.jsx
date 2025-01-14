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
      icon: <IconId />,
    },
    {
      label: 'Logout',
      action: () => router.post(route('logout')),
      icon: <IconLogout2 />,
      color: 'red',
    },
  ];

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target style={{ cursor: 'pointer' }}>
        <Avatar color="crystal" size={48} radius={16}>
          {getInitials(user.full_name)}
        </Avatar>
      </Menu.Target>
      <Menu.Dropdown>
        {menuItems.map((item, index) => (
          <Menu.Item
            key={index}
            h={48}
            leftSection={item.icon}
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
