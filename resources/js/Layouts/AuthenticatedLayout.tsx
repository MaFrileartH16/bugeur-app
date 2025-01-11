import { Header } from '@/Components/Header';
import { AppLayout } from '@/Layouts/AppLayout';
import { Stack } from '@mantine/core';

export const AuthenticatedLayout = (props) => {
  return (
    <AppLayout title={props.title}>
      <Header />

      <Stack flex={1}>{props.children}</Stack>
    </AppLayout>
  );
};
