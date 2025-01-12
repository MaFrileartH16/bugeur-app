import { Header } from '@/Components/Header';
import { AppLayout } from '@/Layouts/AppLayout';
import { Container, Stack } from '@mantine/core';

export const AuthenticatedLayout = (props) => {
  return (
    <AppLayout title={props.title}>
      <Header />

      <Stack flex={1}>
        <Container w="100%">{props.children}</Container>
      </Stack>
    </AppLayout>
  );
};
