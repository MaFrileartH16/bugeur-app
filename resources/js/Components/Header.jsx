import { NavigationDrawer } from '@/Components/NavigationDrawer';
import { UserMenu } from '@/Components/UserMenu';
import { ActionIcon, Container, Flex } from '@mantine/core';
import { IconBug } from '@tabler/icons-react';

export const Header = (props) => {
  return (
    <Container w="100%" size="xl">
      <Flex justify={props.user ? 'space-between' : 'center'} py={16}>
        {props.user && <NavigationDrawer />}

        <ActionIcon size={48} variant="transparent">
          <IconBug size={48} />
        </ActionIcon>

        {props.user && <UserMenu user={props.user} />}
      </Flex>
    </Container>
  );
};
