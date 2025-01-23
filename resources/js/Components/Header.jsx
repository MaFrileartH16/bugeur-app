import { NavigationDrawer } from '@/Components/NavigationDrawer';
import { UserMenu } from '@/Components/UserMenu';
import { ActionIcon, Box, Divider, Flex } from '@mantine/core';
import { IconBug } from '@tabler/icons-react';

export const Header = (props) => {
  return (
    <Box
      pos="sticky"
      top={0}
      style={{
        zIndex: 201,
      }}
      bg="white"
    >
      <Flex justify={props.user ? 'space-between' : 'center'} p={16}>
        {props.user && <NavigationDrawer />}

        <ActionIcon size={48} variant="transparent">
          <IconBug size={48} />
        </ActionIcon>

        {props.user && <UserMenu user={props.user} />}
      </Flex>

      <Divider />
    </Box>
  );
};
