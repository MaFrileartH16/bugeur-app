import { Container, Divider } from '@mantine/core';

export const Footer = () => {
  return (
    <>
      <Divider />

      <Container py={16} align="center">
        © {new Date().getFullYear()} Bugeur. All rights reserved.
      </Container>
    </>
  );
};
