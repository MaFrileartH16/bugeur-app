import { Center, Divider, Text } from '@mantine/core';

export const Footer = () => {
  return (
    <>
      <Divider />

      <Center h={80} px={16}>
        <Text fw={500} align="center">
          © {new Date().getFullYear()} Bugeur. All rights reserved.
        </Text>
      </Center>
    </>
  );
};
