import { useForm } from '@inertiajs/react';
import { Avatar, Menu } from '@mantine/core';

export const UserMenu = () => {
  const { post } = useForm();

  const handleLogout = () => {
    post(route('logout')); // Mengarahkan ke route logout
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar radius="xl" size="md" />
      </Menu.Target>

      {/* Menu Items */}
      <Menu.Dropdown>
        <Menu.Item color="red" onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
