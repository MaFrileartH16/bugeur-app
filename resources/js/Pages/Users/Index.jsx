import { AppLayout } from '@/Layouts/AppLayout.jsx';
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const Index = (props) => {
  return (
    <AppLayout title={props.title} user={props.auth.user}>
      <Container flex={1} size="xl" w="100%">
        <Group my={32} justify="space-between">
          <Title>{props.title}</Title>

          <>
            <Tooltip label="Add User">
              <ActionIcon
                display={{
                  base: 'block',
                  xs: 'none',
                }}
              >
                <IconPlus />
              </ActionIcon>
            </Tooltip>

            <Button
              leftSection={<IconPlus />}
              display={{
                base: 'none',
                xs: 'block',
              }}
            >
              Add User
            </Button>
          </>
        </Group>
      </Container>
    </AppLayout>
  );
};

export default Index;
