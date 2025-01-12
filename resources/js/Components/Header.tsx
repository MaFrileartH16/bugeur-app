import { NavigationDrawer } from '@/Components/NavigationDrawer';
import { UserMenu } from '@/Components/UserMenu';
import { Container, Flex } from '@mantine/core';

export const Header = () => {
  return (
    <Container py={16} size="lg" w="100%">
      <Flex justify="space-between">
        <NavigationDrawer />

        <UserMenu />
      </Flex>
    </Container>
  );
};
