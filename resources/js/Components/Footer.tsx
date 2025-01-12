import { Container } from '@mantine/core';

export const Footer = () => {
  return (
    <Container py={16}>
      © {new Date().getFullYear()} Bugeur by Muhammad Fauzul Hanif. All rights
      reserved.
    </Container>
  );
};
