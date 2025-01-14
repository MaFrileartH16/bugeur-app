import { Container } from '@mantine/core';

export const Footer = () => {
  return (
    <Container py={16} align="center">
      © {new Date().getFullYear()} Bugeur. All rights reserved.
    </Container>
  );
};
