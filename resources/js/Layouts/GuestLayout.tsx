import { AppLayout } from '@/Layouts/AppLayout';
import { Stack } from '@mantine/core';

export const GuestLayout = (props) => {
  return (
    <AppLayout title={props.title}>
      <Stack flex={1}>{props.children}</Stack>
    </AppLayout>
  );
};
