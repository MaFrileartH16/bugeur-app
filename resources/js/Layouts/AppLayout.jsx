import { Footer } from '@/Components/Footer';
import { Header } from '@/Components/Header.jsx';
import { ScrollToTop } from '@/Components/ScrollToTop.jsx';
import { Head } from '@inertiajs/react';
import { Flex, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

export const AppLayout = (props) => {
  useEffect(() => {
    if (props.notification) {
      notifications.show({
        withBorder: true,
        title: props.notification.title,
        message: props.notification.message,
        color: props.notification.status === 'success' ? 'green' : 'red',
      });
    }

    notifications.cleanQueue();
  }, [props.notification]);

  return (
    <>
      <Head title={props.title} />

      <Stack gap={0} mih="100vh">
        <Header user={props.user} />

        <Flex flex={1} direction="column" py={32} px={16}>
          {props.children}
        </Flex>

        {/*<FloatingBottomNavigationBar />*/}

        <Footer />
      </Stack>

      <ScrollToTop />
    </>
  );
};
